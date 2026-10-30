use arc_swap::ArcSwap;
use base64::{engine::general_purpose::URL_SAFE_NO_PAD, Engine as _};
use chrono::Utc;
use reqwest::Client;
use serde::{Deserialize, Serialize};
use std::{path::PathBuf, sync::Arc, time::Duration};
use tokio::sync::{Mutex, RwLock};

const CLIENT_ID: &str = "app_EMoamEEZ73f0CkXaXp7hrann";
const DEVICE_USERCODE_URL: &str = "https://auth.openai.com/api/accounts/deviceauth/usercode";
const DEVICE_TOKEN_URL: &str = "https://auth.openai.com/api/accounts/deviceauth/token";
const OAUTH_TOKEN_URL: &str = "https://auth.openai.com/oauth/token";
pub const CODEX_BASE_URL: &str = "https://chatgpt.com/backend-api/codex";
pub const CODEX_OAUTH_ORIGINATOR: &str = "codex_cli_rs";
pub const CODEX_OAUTH_CLIENT_VERSION: &str = "0.162.1";
const DEVICE_URL: &str = "https://auth.openai.com/codex/device";
const REDIRECT_URI: &str = "https://auth.openai.com/deviceauth/callback";
const REFRESH_BUFFER_MS: i64 = 60_000;

#[derive(Debug, Clone, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct DeviceCode {
    pub device_code: String,
    pub user_code: String,
    pub verification_uri: String,
    pub expires_in: u64,
    pub interval: u64,
}

#[derive(Debug, Clone, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct OAuthStatus {
    pub authenticated: bool,
    pub account_id: Option<String>,
    pub email: Option<String>,
    pub expires_at: Option<i64>,
}

#[derive(Debug, Clone, Deserialize)]
struct DeviceStartResponse {
    device_auth_id: String,
    user_code: String,
    #[serde(default)]
    interval: Option<serde_json::Value>,
    #[serde(default)]
    expires_in: Option<u64>,
}

#[derive(Debug, Clone, Deserialize)]
struct DevicePollResponse {
    authorization_code: String,
    code_verifier: String,
}

#[derive(Debug, Clone, Deserialize)]
struct TokenResponse {
    access_token: String,
    refresh_token: Option<String>,
    id_token: Option<String>,
    expires_in: Option<i64>,
}

#[derive(Debug, Clone, Default, Serialize, Deserialize)]
struct StoredAuth {
    access_token: String,
    refresh_token: String,
    id_token: Option<String>,
    account_id: Option<String>,
    email: Option<String>,
    expires_at: i64,
}

pub struct CodexOAuthManager {
    path: PathBuf,
    auth: RwLock<Option<StoredAuth>>,
    refresh_lock: Mutex<()>,
    client: ArcSwap<Client>,
}

impl CodexOAuthManager {
    pub fn new(path: PathBuf) -> Result<Arc<Self>, String> {
        if let Some(parent) = path.parent() {
            std::fs::create_dir_all(parent).map_err(|e| e.to_string())?;
        }
        let stored = if path.exists() {
            let bytes = std::fs::read(&path).map_err(|e| e.to_string())?;
            Some(serde_json::from_slice(&bytes).map_err(|e| format!("OAuth 凭据格式无效: {e}"))?)
        } else {
            None
        };
        let client = Client::builder()
            .timeout(Duration::from_secs(30))
            .build()
            .map_err(|e| e.to_string())?;
        Ok(Arc::new(Self {
            path,
            auth: RwLock::new(stored),
            refresh_lock: Mutex::new(()),
            client: ArcSwap::from_pointee(client),
        }))
    }

    pub fn set_http_client(&self, client: Client) {
        self.client.store(Arc::new(client));
    }

    pub async fn status(&self) -> OAuthStatus {
        let auth = self.auth.read().await;
        auth.as_ref().map_or(
            OAuthStatus {
                authenticated: false,
                account_id: None,
                email: None,
                expires_at: None,
            },
            |value| OAuthStatus {
                authenticated: !value.refresh_token.is_empty()
                    && usable_account_id(value).is_some(),
                account_id: value.account_id.clone(),
                email: value.email.clone(),
                expires_at: Some(value.expires_at),
            },
        )
    }

    pub async fn start_device_flow(&self) -> Result<DeviceCode, String> {
        let response = self
            .client
            .load()
            .post(DEVICE_USERCODE_URL)
            .header("Content-Type", "application/json")
            .header("User-Agent", "easyapi-codex-oauth")
            .json(&serde_json::json!({"client_id": CLIENT_ID}))
            .send()
            .await
            .map_err(|e| format!("无法启动 OAuth 登录: {e}"))?;
        let status = response.status();
        if !status.is_success() {
            return Err(format!("OAuth 登录启动失败: HTTP {status}"));
        }
        let body: DeviceStartResponse = response
            .json()
            .await
            .map_err(|e| format!("OAuth 响应格式无效: {e}"))?;
        Ok(DeviceCode {
            device_code: body.device_auth_id,
            user_code: body.user_code,
            verification_uri: DEVICE_URL.to_string(),
            expires_in: body.expires_in.unwrap_or(900),
            interval: parse_interval(body.interval.as_ref()),
        })
    }

    pub async fn poll_device_flow(
        &self,
        device_code: &str,
        user_code: &str,
    ) -> Result<bool, String> {
        let response = self
            .client
            .load()
            .post(DEVICE_TOKEN_URL)
            .header("Content-Type", "application/json")
            .header("User-Agent", "easyapi-codex-oauth")
            .json(&serde_json::json!({"device_auth_id": device_code, "user_code": user_code}))
            .send()
            .await
            .map_err(|e| format!("OAuth 登录轮询失败: {e}"))?;
        if response.status() == reqwest::StatusCode::FORBIDDEN
            || response.status() == reqwest::StatusCode::NOT_FOUND
        {
            return Ok(false);
        }
        if response.status() == reqwest::StatusCode::GONE {
            return Err("OAuth 登录已过期，请重新开始登录".to_string());
        }
        if !response.status().is_success() {
            return Err(format!("OAuth 登录轮询失败: HTTP {}", response.status()));
        }
        let body: DevicePollResponse = response
            .json()
            .await
            .map_err(|e| format!("OAuth 轮询响应格式无效: {e}"))?;
        let token = self
            .exchange_code(&body.authorization_code, &body.code_verifier)
            .await?;
        self.store_token(token).await?;
        Ok(true)
    }

    pub async fn access_token(&self) -> Result<(String, String), String> {
        let current = self
            .auth
            .read()
            .await
            .clone()
            .ok_or_else(|| "尚未登录 ChatGPT OAuth".to_string())?;
        if let Some(account_id) = usable_account_id(&current) {
            if !current.access_token.trim().is_empty()
                && current.expires_at - Utc::now().timestamp_millis() >= REFRESH_BUFFER_MS
            {
                return Ok((current.access_token, account_id));
            }
        }
        let _refresh_guard = self.refresh_lock.lock().await;
        let current = self
            .auth
            .read()
            .await
            .clone()
            .ok_or_else(|| "尚未登录 ChatGPT OAuth".to_string())?;
        if let Some(account_id) = usable_account_id(&current) {
            if !current.access_token.trim().is_empty()
                && current.expires_at - Utc::now().timestamp_millis() >= REFRESH_BUFFER_MS
            {
                return Ok((current.access_token, account_id));
            }
        }
        let token = self
            .client
            .load()
            .post(OAUTH_TOKEN_URL)
            .header("Content-Type", "application/x-www-form-urlencoded")
            .header("User-Agent", "easyapi-codex-oauth")
            .form(&[
                ("grant_type", "refresh_token"),
                ("refresh_token", current.refresh_token.as_str()),
                ("client_id", CLIENT_ID),
                ("scope", "openid profile email"),
            ])
            .send()
            .await
            .map_err(|e| format!("OAuth 刷新失败: {e}"))?;
        if !token.status().is_success() {
            return Err(format!(
                "OAuth 刷新失败: HTTP {}，请重新登录",
                token.status()
            ));
        }
        let refreshed: TokenResponse = token
            .json()
            .await
            .map_err(|e| format!("OAuth 刷新响应格式无效: {e}"))?;
        let (refreshed_account_id, refreshed_email) = identity_from_tokens(&refreshed);
        let account_id = current.account_id.clone().or(refreshed_account_id);
        let email = current.email.clone().or(refreshed_email);
        let account_id = account_id
            .ok_or_else(|| "OAuth 凭据缺少 ChatGPT account id，请重新登录".to_string())?;
        let stored = StoredAuth {
            access_token: refreshed.access_token.clone(),
            refresh_token: refreshed.refresh_token.unwrap_or(current.refresh_token),
            id_token: refreshed.id_token.or(current.id_token),
            account_id: Some(account_id.clone()),
            email,
            expires_at: Utc::now().timestamp_millis() + refreshed.expires_in.unwrap_or(3600) * 1000,
        };
        self.persist(stored.clone()).await?;
        Ok((stored.access_token, account_id))
    }

    pub async fn logout(&self) -> Result<(), String> {
        let _refresh_guard = self.refresh_lock.lock().await;
        *self.auth.write().await = None;
        if self.path.exists() {
            std::fs::remove_file(&self.path).map_err(|e| e.to_string())?;
        }
        Ok(())
    }

    async fn exchange_code(&self, code: &str, verifier: &str) -> Result<TokenResponse, String> {
        let response = self
            .client
            .load()
            .post(OAUTH_TOKEN_URL)
            .header("Content-Type", "application/x-www-form-urlencoded")
            .header("User-Agent", "easyapi-codex-oauth")
            .form(&[
                ("grant_type", "authorization_code"),
                ("code", code),
                ("redirect_uri", REDIRECT_URI),
                ("client_id", CLIENT_ID),
                ("code_verifier", verifier),
            ])
            .send()
            .await
            .map_err(|e| format!("OAuth Token 交换失败: {e}"))?;
        if !response.status().is_success() {
            return Err(format!("OAuth Token 交换失败: HTTP {}", response.status()));
        }
        response
            .json()
            .await
            .map_err(|e| format!("OAuth Token 响应格式无效: {e}"))
    }

    async fn store_token(&self, token: TokenResponse) -> Result<(), String> {
        let (account_id, email) = identity_from_tokens(&token);
        let account_id =
            account_id.ok_or_else(|| "OAuth 响应缺少 ChatGPT account id".to_string())?;
        let refresh_token = token
            .refresh_token
            .ok_or_else(|| "OAuth 响应缺少 refresh_token".to_string())?;
        self.persist(StoredAuth {
            access_token: token.access_token,
            refresh_token,
            id_token: token.id_token,
            account_id: Some(account_id),
            email,
            expires_at: Utc::now().timestamp_millis() + token.expires_in.unwrap_or(3600) * 1000,
        })
        .await
    }

    async fn persist(&self, value: StoredAuth) -> Result<(), String> {
        let bytes = serde_json::to_vec_pretty(&value).map_err(|e| e.to_string())?;
        let temp = self.path.with_extension("tmp");
        std::fs::write(&temp, bytes).map_err(|e| e.to_string())?;
        match std::fs::rename(&temp, &self.path) {
            Ok(()) => {}
            Err(error) if error.kind() == std::io::ErrorKind::AlreadyExists => {
                std::fs::remove_file(&self.path).map_err(|e| e.to_string())?;
                std::fs::rename(&temp, &self.path).map_err(|e| e.to_string())?;
            }
            Err(error) => return Err(error.to_string()),
        }
        *self.auth.write().await = Some(value);
        Ok(())
    }
}

fn usable_account_id(auth: &StoredAuth) -> Option<String> {
    auth.account_id
        .as_deref()
        .map(str::trim)
        .filter(|value| !value.is_empty())
        .map(str::to_string)
}

fn parse_interval(value: Option<&serde_json::Value>) -> u64 {
    value
        .and_then(|v| {
            v.as_u64()
                .or_else(|| v.as_str().and_then(|s| s.parse().ok()))
        })
        .filter(|v| *v > 0)
        .unwrap_or(5)
}

fn identity_from_id_token(token: &str) -> Option<(String, Option<String>)> {
    let payload = token.split('.').nth(1)?;
    let bytes = URL_SAFE_NO_PAD.decode(payload).ok()?;
    let json: serde_json::Value = serde_json::from_slice(&bytes).ok()?;
    let id = json
        .get("chatgpt_account_id")
        .and_then(|v| v.as_str())
        .or_else(|| {
            json.get("https://api.openai.com/auth")
                .and_then(|v| v.get("chatgpt_account_id"))
                .and_then(|v| v.as_str())
        })
        .or_else(|| json.pointer("/organizations/0/id").and_then(|v| v.as_str()))?
        .to_string();
    Some((
        id,
        json.get("email")
            .and_then(|v| v.as_str())
            .map(str::to_string),
    ))
}

fn identity_from_tokens(token: &TokenResponse) -> (Option<String>, Option<String>) {
    let from_id = token.id_token.as_deref().and_then(identity_from_id_token);
    let from_access = identity_from_id_token(&token.access_token);
    let account_id = from_id
        .as_ref()
        .map(|v| v.0.clone())
        .or_else(|| from_access.as_ref().map(|v| v.0.clone()));
    let email = from_id
        .and_then(|v| v.1)
        .or_else(|| from_access.and_then(|v| v.1));
    (account_id, email)
}

#[cfg(test)]
mod tests {
    use super::*;
    #[test]
    fn parses_id_token_identity() {
        let payload = URL_SAFE_NO_PAD.encode(br#"{"chatgpt_account_id":"acct","email":"a@b"}"#);
        assert_eq!(
            identity_from_id_token(&format!("x.{payload}.x")),
            Some(("acct".to_string(), Some("a@b".to_string())))
        );
    }

    #[test]
    fn parses_nested_openai_identity_claim() {
        let payload = URL_SAFE_NO_PAD
            .encode(br#"{"https://api.openai.com/auth":{"chatgpt_account_id":"acct-nested"}}"#);
        assert_eq!(
            identity_from_id_token(&format!("x.{payload}.x")).map(|value| value.0),
            Some("acct-nested".to_string())
        );
    }

    #[test]
    fn falls_back_to_access_token_identity() {
        let payload = URL_SAFE_NO_PAD.encode(br#"{"chatgpt_account_id":"acct-access"}"#);
        let token = TokenResponse {
            access_token: format!("x.{payload}.x"),
            refresh_token: Some("refresh".to_string()),
            id_token: None,
            expires_in: Some(3600),
        };
        assert_eq!(
            identity_from_tokens(&token).0,
            Some("acct-access".to_string())
        );
    }
}
