use std::sync::{
    atomic::{AtomicBool, AtomicU64, Ordering},
    Arc, Mutex, RwLock,
};

use arc_swap::ArcSwap;
use arc_swap::ArcSwapOption;
use keyring::Entry;
use reqwest::header::{HeaderMap, HeaderName, HeaderValue};

use crate::{
    codex_oauth::CodexOAuthManager,
    models::{AppStatus, Provider, ProviderView, ProxySettings, RequestLog},
    network::{HttpClients, MAX_CONNECT_TIMEOUT_SECONDS, MIN_CONNECT_TIMEOUT_SECONDS},
    storage::{CaptureData, ContentCapture, Database},
};

const KEYRING_SERVICE: &str = "easyapi";
const ACTIVE_PROVIDER_SETTING: &str = "active_provider_id";
const LOCAL_TOKEN_SETTING: &str = "local_token";
const CONTENT_CAPTURE_ENABLED_SETTING: &str = "content_capture_enabled";
const UPSTREAM_CONNECT_TIMEOUT_SETTING: &str = "upstream_connect_timeout_seconds";
const PROXY_SETTINGS_SETTING: &str = "proxy_settings";

pub struct ProviderRuntime {
    pub provider: Provider,
    api_key: Option<String>,
    pub headers: HeaderMap,
}

impl ProviderRuntime {
    pub fn api_key(&self) -> &str {
        self.api_key.as_deref().unwrap_or_default()
    }

    pub fn uses_codex_oauth(&self) -> bool {
        self.provider.auth_type == crate::models::AUTH_TYPE_CODEX_OAUTH
    }

    pub fn responses_url(&self) -> String {
        self.upstream_url("responses")
    }

    pub fn responses_compact_url(&self) -> String {
        self.upstream_url("responses/compact")
    }

    pub fn models_url(&self) -> String {
        self.upstream_url("models")
    }

    pub fn images_generations_url(&self) -> String {
        self.upstream_url("images/generations")
    }

    pub fn images_edits_url(&self) -> String {
        self.upstream_url("images/edits")
    }

    fn upstream_url(&self, path: &str) -> String {
        let base = if self.uses_codex_oauth() {
            crate::codex_oauth::CODEX_BASE_URL
        } else {
            self.provider.base_url.trim_end_matches('/')
        };
        format!("{base}/{path}")
    }
}

pub struct ProviderManager {
    db: Arc<Database>,
    active: ArcSwapOption<ProviderRuntime>,
    active_id: RwLock<Option<String>>,
}

impl ProviderManager {
    pub fn new(db: Arc<Database>) -> Result<Self, String> {
        let active_id = db.get_setting(ACTIVE_PROVIDER_SETTING)?;
        let manager = Self {
            db,
            active: ArcSwapOption::empty(),
            active_id: RwLock::new(active_id.clone()),
        };
        if let Some(id) = active_id {
            match manager.load_runtime(&id) {
                Ok(runtime) => manager.active.store(Some(Arc::new(runtime))),
                Err(error) => {
                    tracing::warn!(%error, provider_id = %id, "active provider could not be restored");
                    *manager.active_id.write().map_err(|e| e.to_string())? = None;
                    manager.db.delete_setting(ACTIVE_PROVIDER_SETTING)?;
                }
            }
        }
        Ok(manager)
    }

    pub fn active(&self) -> Option<Arc<ProviderRuntime>> {
        self.active.load_full()
    }

    pub fn active_id(&self) -> Option<String> {
        self.active_id.read().ok().and_then(|id| id.clone())
    }

    pub fn list_views(&self) -> Result<Vec<ProviderView>, String> {
        let active_id = self.active_id();
        Ok(self
            .db
            .list_providers()?
            .into_iter()
            .map(|provider| {
                let has_api_key = credential_entry(&provider.id)
                    .and_then(|entry| entry.get_password().map_err(|e| e.to_string()))
                    .map(|value| !value.is_empty())
                    .unwrap_or(false);
                ProviderView {
                    active: active_id.as_deref() == Some(provider.id.as_str()),
                    has_api_key,
                    authenticated: has_api_key
                        || provider.auth_type == crate::models::AUTH_TYPE_CODEX_OAUTH,
                    provider,
                }
            })
            .collect())
    }

    pub fn switch(&self, id: &str) -> Result<(), String> {
        let runtime = self.load_runtime(id)?;
        self.active.store(Some(Arc::new(runtime)));
        *self.active_id.write().map_err(|e| e.to_string())? = Some(id.to_string());
        self.db.set_setting(ACTIVE_PROVIDER_SETTING, id)
    }

    pub fn deactivate(&self) -> Result<(), String> {
        self.active.store(None);
        *self.active_id.write().map_err(|e| e.to_string())? = None;
        self.db.delete_setting(ACTIVE_PROVIDER_SETTING)
    }

    pub fn refresh_if_active(&self, id: &str) -> Result<(), String> {
        if self.active_id().as_deref() == Some(id) {
            self.switch(id)?;
        }
        Ok(())
    }

    pub fn load_runtime(&self, id: &str) -> Result<ProviderRuntime, String> {
        let provider = self
            .db
            .get_provider(id)?
            .ok_or_else(|| "Provider 不存在".to_string())?;
        let api_key = if provider.auth_type == crate::models::AUTH_TYPE_CODEX_OAUTH {
            None
        } else {
            let value = credential_entry(id)?
                .get_password()
                .map_err(|e| format!("无法读取 API Key: {e}"))?;
            if value.trim().is_empty() {
                return Err("API Key 为空".to_string());
            }
            Some(value)
        };
        let mut headers = HeaderMap::new();
        for pair in &provider.extra_headers {
            let name = HeaderName::from_bytes(pair.name.trim().as_bytes())
                .map_err(|_| format!("无效请求头名称: {}", pair.name))?;
            let value = HeaderValue::from_str(&pair.value)
                .map_err(|_| format!("无效请求头值: {}", pair.name))?;
            headers.insert(name, value);
        }
        Ok(ProviderRuntime {
            provider,
            api_key,
            headers,
        })
    }
}

pub fn set_api_key(provider_id: &str, api_key: &str) -> Result<(), String> {
    credential_entry(provider_id)?
        .set_password(api_key)
        .map_err(|e| format!("无法保存 API Key: {e}"))
}

pub fn delete_api_key(provider_id: &str) -> Result<(), String> {
    let entry = credential_entry(provider_id)?;
    match entry.delete_credential() {
        Ok(()) => Ok(()),
        Err(keyring::Error::NoEntry) => Ok(()),
        Err(e) => Err(format!("无法删除 API Key: {e}")),
    }
}

fn credential_entry(provider_id: &str) -> Result<Entry, String> {
    Entry::new(KEYRING_SERVICE, &format!("provider:{provider_id}"))
        .map_err(|e| format!("无法访问系统凭据库: {e}"))
}

pub struct RuntimeStats {
    in_flight: AtomicU64,
    total: AtomicU64,
    last_error: RwLock<Option<String>>,
}

impl RuntimeStats {
    pub fn new() -> Self {
        Self {
            in_flight: AtomicU64::new(0),
            total: AtomicU64::new(0),
            last_error: RwLock::new(None),
        }
    }

    pub fn begin(&self) {
        self.in_flight.fetch_add(1, Ordering::Relaxed);
        self.total.fetch_add(1, Ordering::Relaxed);
    }

    pub fn finish(&self, error: Option<String>) {
        self.in_flight.fetch_sub(1, Ordering::Relaxed);
        if let Some(error) = error {
            if let Ok(mut last_error) = self.last_error.write() {
                *last_error = Some(error);
            }
        }
    }

    pub fn status(&self, manager: &ProviderManager, listen_address: &str) -> AppStatus {
        let active = manager.active();
        AppStatus {
            proxy_running: true,
            listen_address: listen_address.to_string(),
            active_provider_id: active.as_ref().map(|p| p.provider.id.clone()),
            active_provider_name: active.as_ref().map(|p| p.provider.name.clone()),
            in_flight_requests: self.in_flight.load(Ordering::Relaxed),
            total_requests: self.total.load(Ordering::Relaxed),
            last_error: self.last_error.read().ok().and_then(|v| v.clone()),
        }
    }
}

pub struct AppState {
    pub db: Arc<Database>,
    pub providers: Arc<ProviderManager>,
    pub stats: Arc<RuntimeStats>,
    http_clients: ArcSwap<HttpClients>,
    network_update_lock: Mutex<()>,
    pub local_token: String,
    pub oauth: Arc<CodexOAuthManager>,
    pub listen_address: String,
    content_capture_enabled: AtomicBool,
}

impl AppState {
    pub fn new(
        db: Arc<Database>,
        listen_address: String,
        oauth: Arc<CodexOAuthManager>,
    ) -> Result<Arc<Self>, String> {
        let providers = Arc::new(ProviderManager::new(db.clone())?);
        let local_token = match db.get_setting(LOCAL_TOKEN_SETTING)? {
            Some(token) if !token.is_empty() => token,
            _ => {
                let token = format!("easyapi-{}", uuid::Uuid::new_v4());
                db.set_setting(LOCAL_TOKEN_SETTING, &token)?;
                token
            }
        };
        let settings = match db.get_setting(PROXY_SETTINGS_SETTING)? {
            Some(value) => {
                serde_json::from_str(&value).map_err(|_| "网络代理设置格式无效".to_string())?
            }
            None => {
                let mut settings = ProxySettings::default();
                if let Some(seconds) = db
                    .get_setting(UPSTREAM_CONNECT_TIMEOUT_SETTING)?
                    .and_then(|value| value.parse::<u64>().ok())
                    .filter(|seconds| {
                        (MIN_CONNECT_TIMEOUT_SECONDS..=MAX_CONNECT_TIMEOUT_SECONDS)
                            .contains(seconds)
                    })
                {
                    settings.upstream_connect_timeout_seconds = seconds;
                }
                settings
            }
        };
        let http_clients = HttpClients::new(settings, &listen_address)?;
        oauth.set_http_client(http_clients.oauth.clone());
        let content_capture_enabled =
            db.get_setting(CONTENT_CAPTURE_ENABLED_SETTING)?.as_deref() == Some("true");
        Ok(Arc::new(Self {
            db,
            providers,
            stats: Arc::new(RuntimeStats::new()),
            http_clients: ArcSwap::from_pointee(http_clients),
            network_update_lock: Mutex::new(()),
            local_token,
            oauth,
            listen_address,
            content_capture_enabled: AtomicBool::new(content_capture_enabled),
        }))
    }

    pub fn record_log(&self, log: &RequestLog) {
        if let Err(error) = self.db.insert_request_log(log) {
            tracing::warn!(%error, "failed to persist request log");
        }
    }

    pub fn content_capture_enabled(&self) -> bool {
        self.content_capture_enabled.load(Ordering::Relaxed)
    }

    pub fn http_client(&self, url: &str) -> reqwest::Client {
        self.http_clients.load().client_for_url(url)
    }

    pub fn proxy_settings(&self) -> ProxySettings {
        self.http_clients.load().settings.clone()
    }

    pub fn set_upstream_connect_timeout_seconds(&self, seconds: u64) -> Result<(), String> {
        let mut settings = self.proxy_settings();
        settings.upstream_connect_timeout_seconds = seconds;
        self.set_proxy_settings(settings)
    }

    pub fn set_proxy_settings(&self, settings: ProxySettings) -> Result<(), String> {
        let _lock = self.network_update_lock.lock().map_err(|e| e.to_string())?;
        let clients = HttpClients::new(settings, &self.listen_address)?;
        let serialized = serde_json::to_string(&clients.settings).map_err(|e| e.to_string())?;
        self.db.set_setting(PROXY_SETTINGS_SETTING, &serialized)?;
        self.oauth.set_http_client(clients.oauth.clone());
        self.http_clients.store(Arc::new(clients));
        Ok(())
    }

    pub fn set_content_capture_enabled(&self, enabled: bool) -> Result<(), String> {
        self.db.set_setting(
            CONTENT_CAPTURE_ENABLED_SETTING,
            if enabled { "true" } else { "false" },
        )?;
        self.content_capture_enabled
            .store(enabled, Ordering::Relaxed);
        Ok(())
    }

    pub fn start_content_capture(
        &self,
        request_id: &str,
        request_content_type: Option<String>,
    ) -> Result<Arc<ContentCapture>, String> {
        self.db
            .start_content_capture(request_id, request_content_type)
            .map(Arc::new)
    }

    pub fn record_content_capture(&self, request_id: &str, data: &CaptureData) {
        if let Err(error) = self.db.insert_request_capture(request_id, data) {
            tracing::warn!(%error, request_id, "failed to persist request content capture");
        }
    }
}

#[cfg(test)]
impl ProviderRuntime {
    pub fn new_for_test(provider: Provider, api_key: String) -> Self {
        Self {
            provider,
            api_key: Some(api_key),
            headers: HeaderMap::new(),
        }
    }
}

#[cfg(test)]
impl ProviderManager {
    pub fn set_active_for_test(&self, runtime: ProviderRuntime) {
        let id = runtime.provider.id.clone();
        self.active.store(Some(Arc::new(runtime)));
        *self.active_id.write().expect("active id lock") = Some(id);
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn network_settings_migrate_persist_and_reject_invalid_updates() {
        let temp = tempfile::tempdir().unwrap();
        let db = Arc::new(Database::open(&temp.path().join("test.sqlite3")).unwrap());
        db.set_setting(UPSTREAM_CONNECT_TIMEOUT_SETTING, "42")
            .unwrap();
        let oauth = || CodexOAuthManager::new(temp.path().join("oauth.json")).unwrap();
        let state = AppState::new(db.clone(), "127.0.0.1:8787".to_string(), oauth()).unwrap();
        assert_eq!(state.proxy_settings().upstream_connect_timeout_seconds, 42);
        assert_eq!(
            state.proxy_settings().proxy_mode,
            crate::models::ProxyMode::System
        );
        let settings = ProxySettings {
            upstream_connect_timeout_seconds: 30,
            proxy_mode: crate::models::ProxyMode::Manual,
            proxy_url: "socks5h://127.0.0.1:7897".to_string(),
        };
        state.set_proxy_settings(settings).unwrap();
        let saved = state.proxy_settings();
        let mut invalid = saved.clone();
        invalid.proxy_url = "http://127.0.0.1:8787".to_string();
        assert!(state.set_proxy_settings(invalid).is_err());
        assert_eq!(state.proxy_settings(), saved);
        let restored = AppState::new(db, "127.0.0.1:8787".to_string(), oauth()).unwrap();
        assert_eq!(restored.proxy_settings(), saved);
    }

    #[cfg(target_os = "macos")]
    #[test]
    fn credentials_use_macos_keychain_backend() {
        let entry = credential_entry("backend-check").unwrap();
        assert!(entry.get_credential().is::<keyring::macos::MacCredential>());
    }

    #[cfg(target_os = "windows")]
    #[test]
    fn credentials_use_windows_native_backend() {
        let entry = credential_entry("backend-check").unwrap();
        assert!(entry
            .get_credential()
            .is::<keyring::windows::WinCredential>());
    }

    fn oauth_provider() -> Provider {
        Provider {
            id: "official".to_string(),
            name: "ChatGPT".to_string(),
            base_url: "https://ignored.example".to_string(),
            test_model: "gpt-5-codex".to_string(),
            extra_headers: vec![],
            auth_type: crate::models::AUTH_TYPE_CODEX_OAUTH.to_string(),
            created_at: String::new(),
            updated_at: String::new(),
        }
    }

    #[test]
    fn codex_oauth_provider_uses_official_endpoints() {
        let runtime = ProviderRuntime::new_for_test(oauth_provider(), String::new());
        assert_eq!(
            runtime.responses_url(),
            "https://chatgpt.com/backend-api/codex/responses"
        );
        assert_eq!(
            runtime.responses_compact_url(),
            "https://chatgpt.com/backend-api/codex/responses/compact"
        );
        assert_eq!(
            runtime.models_url(),
            "https://chatgpt.com/backend-api/codex/models"
        );
        assert_eq!(
            runtime.images_generations_url(),
            "https://chatgpt.com/backend-api/codex/images/generations"
        );
        assert_eq!(
            runtime.images_edits_url(),
            "https://chatgpt.com/backend-api/codex/images/edits"
        );
    }
}
