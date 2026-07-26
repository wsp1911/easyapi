use std::sync::{
    atomic::{AtomicU64, Ordering},
    Arc, RwLock,
};

use arc_swap::ArcSwapOption;
use keyring::Entry;
use reqwest::header::{HeaderMap, HeaderName, HeaderValue};

use crate::{
    models::{AppStatus, Provider, ProviderView, RequestLog},
    storage::Database,
};

const KEYRING_SERVICE: &str = "easyapi";
const ACTIVE_PROVIDER_SETTING: &str = "active_provider_id";
const LOCAL_TOKEN_SETTING: &str = "local_token";

pub struct ProviderRuntime {
    pub provider: Provider,
    api_key: String,
    pub headers: HeaderMap,
}

impl ProviderRuntime {
    pub fn api_key(&self) -> &str {
        &self.api_key
    }

    pub fn responses_url(&self) -> String {
        format!("{}/responses", self.provider.base_url.trim_end_matches('/'))
    }

    pub fn models_url(&self) -> String {
        format!("{}/models", self.provider.base_url.trim_end_matches('/'))
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
        let api_key = credential_entry(id)?
            .get_password()
            .map_err(|e| format!("无法读取 API Key: {e}"))?;
        if api_key.trim().is_empty() {
            return Err("API Key 为空".to_string());
        }
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
    pub http_client: reqwest::Client,
    pub local_token: String,
    pub listen_address: String,
}

impl AppState {
    pub fn new(db: Arc<Database>, listen_address: String) -> Result<Arc<Self>, String> {
        let providers = Arc::new(ProviderManager::new(db.clone())?);
        let local_token = match db.get_setting(LOCAL_TOKEN_SETTING)? {
            Some(token) if !token.is_empty() => token,
            _ => {
                let token = format!("easyapi-{}", uuid::Uuid::new_v4());
                db.set_setting(LOCAL_TOKEN_SETTING, &token)?;
                token
            }
        };
        let http_client = reqwest::Client::builder()
            .connect_timeout(std::time::Duration::from_secs(15))
            .pool_idle_timeout(std::time::Duration::from_secs(90))
            .build()
            .map_err(|e| e.to_string())?;
        Ok(Arc::new(Self {
            db,
            providers,
            stats: Arc::new(RuntimeStats::new()),
            http_client,
            local_token,
            listen_address,
        }))
    }

    pub fn record_log(&self, log: &RequestLog) {
        if let Err(error) = self.db.insert_request_log(log) {
            tracing::warn!(%error, "failed to persist request log");
        }
    }
}

#[cfg(test)]
impl ProviderRuntime {
    pub fn new_for_test(provider: Provider, api_key: String) -> Self {
        Self {
            provider,
            api_key,
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
