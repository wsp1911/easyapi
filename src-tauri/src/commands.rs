use std::{collections::HashSet, sync::Arc, time::Instant};

use futures_util::StreamExt;
use reqwest::header::{HeaderName, AUTHORIZATION, HOST};
use serde::Deserialize;
use tauri::State;
use uuid::Uuid;

use crate::{
    codex_oauth::{DeviceCode, OAuthStatus},
    models::{
        AppStatus, CodexSetup, ContentCaptureStatus, ProviderInput, ProviderTestResult,
        ProviderView, ProxySettings, RequestCapture, RequestLog,
    },
    state::{delete_api_key, set_api_key, AppState},
};

#[tauri::command]
pub fn list_providers(state: State<'_, Arc<AppState>>) -> Result<Vec<ProviderView>, String> {
    state.providers.list_views()
}

#[tauri::command]
pub fn save_provider(
    state: State<'_, Arc<AppState>>,
    mut input: ProviderInput,
) -> Result<ProviderView, String> {
    validate_provider_input(&mut input)?;
    if crate::network::points_to_listener(&input.base_url, &state.listen_address) {
        return Err(
            "Provider 的 Base URL 不能指向 EasyAPI 自己，请填写真正上游 API 服务的地址".to_string(),
        );
    }
    let id = input
        .id
        .clone()
        .unwrap_or_else(|| Uuid::new_v4().to_string());
    let existing = state.db.get_provider(&id)?;
    let is_new = existing.is_none();
    if input.auth_type != crate::models::AUTH_TYPE_CODEX_OAUTH
        && is_new
        && input
            .api_key
            .as_deref()
            .is_none_or(|key| key.trim().is_empty())
    {
        return Err("新增 Provider 时必须填写 API Key".to_string());
    }
    if input.auth_type != crate::models::AUTH_TYPE_CODEX_OAUTH
        && input
            .api_key
            .as_deref()
            .is_none_or(|key| key.trim().is_empty())
        && existing
            .as_ref()
            .is_none_or(|provider| provider.auth_type == crate::models::AUTH_TYPE_CODEX_OAUTH)
    {
        return Err("切换到 API Key 认证时必须填写 API Key".to_string());
    }

    let provider = state.db.save_provider(&input, &id)?;
    if input.auth_type == crate::models::AUTH_TYPE_CODEX_OAUTH {
        delete_api_key(&id)?;
    } else if let Some(api_key) = input
        .api_key
        .as_deref()
        .map(str::trim)
        .filter(|v| !v.is_empty())
    {
        if let Err(error) = set_api_key(&id, api_key) {
            if is_new {
                let _ = state.db.delete_provider(&id);
            }
            return Err(error);
        }
    }
    state.providers.refresh_if_active(&id)?;
    let has_api_key = state.providers.load_runtime(&id).is_ok();
    Ok(ProviderView {
        active: state.providers.active_id().as_deref() == Some(id.as_str()),
        has_api_key,
        authenticated: has_api_key || provider.auth_type == crate::models::AUTH_TYPE_CODEX_OAUTH,
        provider,
    })
}

#[tauri::command]
pub fn delete_provider(state: State<'_, Arc<AppState>>, id: String) -> Result<(), String> {
    if state.providers.active_id().as_deref() == Some(id.as_str()) {
        state.providers.deactivate()?;
    }
    state.db.delete_provider(&id)?;
    delete_api_key(&id)
}

#[tauri::command]
pub async fn start_codex_oauth_login(
    state: State<'_, Arc<AppState>>,
) -> Result<DeviceCode, String> {
    state.oauth.start_device_flow().await
}

#[tauri::command]
pub async fn poll_codex_oauth_login(
    state: State<'_, Arc<AppState>>,
    device_code: String,
    user_code: String,
) -> Result<bool, String> {
    state.oauth.poll_device_flow(&device_code, &user_code).await
}

#[tauri::command]
pub async fn get_codex_oauth_status(
    state: State<'_, Arc<AppState>>,
) -> Result<OAuthStatus, String> {
    Ok(state.oauth.status().await)
}

#[tauri::command]
pub async fn logout_codex_oauth(state: State<'_, Arc<AppState>>) -> Result<(), String> {
    state.oauth.logout().await
}

#[tauri::command]
pub fn switch_provider(state: State<'_, Arc<AppState>>, id: String) -> Result<(), String> {
    state.providers.switch(&id)
}

#[tauri::command]
pub fn get_status(state: State<'_, Arc<AppState>>) -> AppStatus {
    state.stats.status(&state.providers, &state.listen_address)
}

#[tauri::command]
pub fn list_request_logs(
    state: State<'_, Arc<AppState>>,
    limit: Option<usize>,
) -> Result<Vec<RequestLog>, String> {
    state.db.list_request_logs(limit)
}

#[tauri::command]
pub fn get_content_capture_status(state: State<'_, Arc<AppState>>) -> ContentCaptureStatus {
    ContentCaptureStatus {
        enabled: state.content_capture_enabled(),
    }
}

#[tauri::command]
pub fn set_content_capture_enabled(
    state: State<'_, Arc<AppState>>,
    enabled: bool,
) -> Result<ContentCaptureStatus, String> {
    state.set_content_capture_enabled(enabled)?;
    Ok(ContentCaptureStatus { enabled })
}

#[tauri::command]
pub fn get_proxy_settings(state: State<'_, Arc<AppState>>) -> ProxySettings {
    state.proxy_settings()
}

#[tauri::command]
pub fn set_proxy_settings(
    state: State<'_, Arc<AppState>>,
    settings: ProxySettings,
) -> Result<ProxySettings, String> {
    state.set_proxy_settings(settings)?;
    Ok(state.proxy_settings())
}

#[tauri::command]
pub fn set_upstream_connect_timeout_seconds(
    state: State<'_, Arc<AppState>>,
    seconds: u64,
) -> Result<ProxySettings, String> {
    state.set_upstream_connect_timeout_seconds(seconds)?;
    Ok(state.proxy_settings())
}

#[tauri::command]
pub fn get_request_capture(
    state: State<'_, Arc<AppState>>,
    id: String,
) -> Result<RequestCapture, String> {
    state.db.get_request_capture(&id)
}

#[tauri::command]
pub fn clear_request_captures(state: State<'_, Arc<AppState>>) -> Result<(), String> {
    state.db.clear_request_captures()
}

#[tauri::command]
pub fn clear_request_logs(state: State<'_, Arc<AppState>>) -> Result<(), String> {
    state.db.clear_request_logs()
}

#[tauri::command]
pub fn get_codex_setup(state: State<'_, Arc<AppState>>) -> CodexSetup {
    build_codex_setup(
        &state.listen_address,
        &state.local_token,
        std::env::consts::OS,
    )
}

fn build_codex_setup(listen_address: &str, local_token: &str, platform: &str) -> CodexSetup {
    let config_toml = format!(
        r#"model_provider = "easyapi"

[model_providers.easyapi]
name = "EasyAPI Local Proxy"
base_url = "http://{}/v1"
env_key = "EASYAPI_LOCAL_TOKEN"
wire_api = "responses"
supports_websockets = false
request_max_retries = 0
stream_max_retries = 0
stream_idle_timeout_ms = 300000
requires_openai_auth = false
http_headers = {{ "x-openai-actor-authorization" = "easyapi" }}
"#,
        listen_address
    );
    let environment_command = match platform {
        "windows" => format!(
            "[Environment]::SetEnvironmentVariable('EASYAPI_LOCAL_TOKEN', '{}', 'User')\n$env:EASYAPI_LOCAL_TOKEN = '{}'",
            local_token.replace('\'', "''"),
            local_token.replace('\'', "''"),
        ),
        "macos" => {
            let export = format!("export EASYAPI_LOCAL_TOKEN={}", shell_quote(local_token));
            let quoted_export = shell_quote(&export);
            // zsh startup files configure CLI launches. launchctl also configures
            // apps opened from Finder/Dock, for the current login session only.
            format!(
                r#"{export}
easyapi_zshrc="${{ZDOTDIR:-$HOME}}/.zshrc"
touch "$easyapi_zshrc"
if ! grep -Fqx -- {quoted_export} "$easyapi_zshrc"; then
  printf '\n%s\n' {quoted_export} >> "$easyapi_zshrc"
fi
launchctl setenv EASYAPI_LOCAL_TOKEN "$EASYAPI_LOCAL_TOKEN""#
            )
        }
        _ => format!("export EASYAPI_LOCAL_TOKEN={}", shell_quote(local_token)),
    };
    let authorization =
        serde_json::to_string(&format!("Bearer {local_token}")).expect("string serializes");
    let config_toml_with_headers = config_toml
        .replace("http_headers = { \"x-openai-actor-authorization\" = \"easyapi\" }\n", "")
        .replace(
            "env_key = \"EASYAPI_LOCAL_TOKEN\"",
            &format!(
                "http_headers = {{ Authorization = {authorization}, \"x-openai-actor-authorization\" = \"easyapi\" }}"
            ),
        );
    CodexSetup {
        config_toml,
        config_toml_with_headers,
        environment_command,
        platform: platform.to_string(),
        local_token: local_token.to_string(),
    }
}

fn shell_quote(value: &str) -> String {
    format!("'{}'", value.replace('\'', "'\"'\"'"))
}

#[tauri::command]
pub async fn test_provider(
    state: State<'_, Arc<AppState>>,
    id: String,
) -> Result<ProviderTestResult, String> {
    let provider = state.providers.load_runtime(&id)?;
    if provider.provider.test_model.trim().is_empty() {
        return Err("请先填写测试模型".to_string());
    }
    let started = Instant::now();
    let (token, account_id) = if provider.uses_codex_oauth() {
        state
            .oauth
            .access_token()
            .await
            .map(|(token, id)| (token, Some(id)))?
    } else {
        (provider.api_key().to_string(), None)
    };
    let mut request_body = serde_json::json!({
        "model": provider.provider.test_model,
        "input": "Reply with OK.",
        "stream": false
    });
    if provider.uses_codex_oauth() {
        request_body["store"] = serde_json::json!(false);
    } else {
        request_body["max_output_tokens"] = serde_json::json!(16);
    }
    let mut request = state
        .http_client(&provider.responses_url())
        .post(provider.responses_url())
        .bearer_auth(token)
        .json(&request_body);
    for (name, value) in &provider.headers {
        request = request.header(name, value);
    }
    if let Some(account_id) = account_id {
        request = request
            .header("chatgpt-account-id", account_id)
            .header("originator", crate::codex_oauth::CODEX_OAUTH_ORIGINATOR)
            .header("version", crate::codex_oauth::CODEX_OAUTH_CLIENT_VERSION);
    }
    match request.send().await {
        Ok(response) => {
            let status = response.status();
            let latency_ms = started.elapsed().as_millis();
            if status.is_success() {
                Ok(ProviderTestResult {
                    ok: true,
                    status_code: Some(status.as_u16()),
                    latency_ms,
                    message: "连接测试成功".to_string(),
                })
            } else {
                let text = read_response_preview(response, 64 * 1024).await;
                Ok(ProviderTestResult {
                    ok: false,
                    status_code: Some(status.as_u16()),
                    latency_ms,
                    message: summarize_upstream_error(status.as_u16(), &text),
                })
            }
        }
        Err(error) => Ok(ProviderTestResult {
            ok: false,
            status_code: None,
            latency_ms: started.elapsed().as_millis(),
            message: if error.is_timeout() {
                "上游请求超时".to_string()
            } else if error.is_connect() {
                "无法连接上游 API".to_string()
            } else {
                "上游请求失败".to_string()
            },
        }),
    }
}

#[tauri::command]
pub async fn list_provider_models(
    state: State<'_, Arc<AppState>>,
    id: String,
) -> Result<Vec<String>, String> {
    let provider = state.providers.load_runtime(&id)?;
    let (token, account_id) = if provider.uses_codex_oauth() {
        state
            .oauth
            .access_token()
            .await
            .map(|(token, id)| (token, Some(id)))?
    } else {
        (provider.api_key().to_string(), None)
    };
    let mut request = state
        .http_client(&provider.models_url())
        .get(provider.models_url())
        .bearer_auth(token);
    for (name, value) in &provider.headers {
        request = request.header(name, value);
    }
    if let Some(account_id) = account_id {
        request = request
            .header("chatgpt-account-id", account_id)
            .header("originator", crate::codex_oauth::CODEX_OAUTH_ORIGINATOR)
            .header("version", crate::codex_oauth::CODEX_OAUTH_CLIENT_VERSION);
    }

    let response = request.send().await.map_err(|error| {
        if error.is_timeout() {
            "上游请求超时".to_string()
        } else if error.is_connect() {
            "无法连接上游 API".to_string()
        } else {
            "上游请求失败".to_string()
        }
    })?;
    let status = response.status();
    if !status.is_success() {
        let text = read_response_preview(response, 64 * 1024).await;
        return Err(summarize_upstream_error(status.as_u16(), &text));
    }

    let models = response
        .json::<ModelListResponse>()
        .await
        .map_err(|_| "上游返回的模型列表格式无效".to_string())?;
    let mut ids = models
        .data
        .into_iter()
        .map(|model| model.id.trim().to_string())
        .filter(|id| !id.is_empty())
        .collect::<Vec<_>>();
    ids.sort_unstable();
    ids.dedup();
    Ok(ids)
}

#[derive(Deserialize)]
struct ModelListResponse {
    data: Vec<ListedModel>,
}

#[derive(Deserialize)]
struct ListedModel {
    id: String,
}

fn validate_provider_input(input: &mut ProviderInput) -> Result<(), String> {
    input.name = input.name.trim().to_string();
    input.base_url = input.base_url.trim().trim_end_matches('/').to_string();
    input.test_model = input.test_model.trim().to_string();
    if !matches!(
        input.auth_type.as_str(),
        crate::models::AUTH_TYPE_API_KEY | crate::models::AUTH_TYPE_CODEX_OAUTH
    ) {
        return Err("认证类型无效".to_string());
    }
    if input.name.is_empty() {
        return Err("Provider 名称不能为空".to_string());
    }
    let url = reqwest::Url::parse(&input.base_url).map_err(|_| "Base URL 格式无效".to_string())?;
    if !matches!(url.scheme(), "http" | "https") || url.host_str().is_none() {
        return Err("Base URL 必须是有效的 http 或 https 地址".to_string());
    }
    if url.query().is_some() || url.fragment().is_some() {
        return Err("Base URL 不能包含查询参数或锚点".to_string());
    }

    let mut names = HashSet::new();
    input
        .extra_headers
        .retain(|pair| !pair.name.trim().is_empty());
    for pair in &mut input.extra_headers {
        pair.name = pair.name.trim().to_string();
        let name = HeaderName::from_bytes(pair.name.as_bytes())
            .map_err(|_| format!("无效请求头名称: {}", pair.name))?;
        if name == AUTHORIZATION
            || name == HOST
            || matches!(
                name.as_str().to_ascii_lowercase().as_str(),
                "content-length"
                    | "connection"
                    | "proxy-connection"
                    | "keep-alive"
                    | "transfer-encoding"
                    | "te"
                    | "trailer"
                    | "upgrade"
                    | "chatgpt-account-id"
                    | "originator"
                    | "version"
            )
        {
            return Err(format!("不允许自定义请求头: {}", pair.name));
        }
        let lower = pair.name.to_ascii_lowercase();
        if !names.insert(lower) {
            return Err(format!("请求头重复: {}", pair.name));
        }
        reqwest::header::HeaderValue::from_str(&pair.value)
            .map_err(|_| format!("无效请求头值: {}", pair.name))?;
    }
    Ok(())
}

async fn read_response_preview(response: reqwest::Response, max_bytes: usize) -> String {
    let mut stream = response.bytes_stream();
    let mut bytes = Vec::with_capacity(max_bytes.min(4096));
    while let Some(item) = stream.next().await {
        let Ok(chunk) = item else {
            break;
        };
        let remaining = max_bytes.saturating_sub(bytes.len());
        if remaining == 0 {
            break;
        }
        bytes.extend_from_slice(&chunk[..chunk.len().min(remaining)]);
        if bytes.len() >= max_bytes {
            break;
        }
    }
    String::from_utf8_lossy(&bytes).into_owned()
}

fn summarize_upstream_error(status: u16, body: &str) -> String {
    let message = serde_json::from_str::<serde_json::Value>(body)
        .ok()
        .and_then(|value| {
            value
                .pointer("/error/message")
                .and_then(|value| value.as_str())
                .map(str::to_string)
        })
        .unwrap_or_else(|| "上游返回错误".to_string());
    let truncated: String = message.chars().take(240).collect();
    format!("HTTP {status}: {truncated}")
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn inline_header_setup_is_available_on_both_platforms() {
        for platform in ["windows", "macos"] {
            let setup = build_codex_setup("127.0.0.1:8787", "local-token", platform);
            assert!(setup
                .config_toml
                .contains("env_key = \"EASYAPI_LOCAL_TOKEN\""));
            assert!(setup
                .config_toml_with_headers
                .contains("Authorization = \"Bearer local-token\""));
            assert!(!setup.config_toml_with_headers.contains("env_key"));
            assert!(setup
                .config_toml_with_headers
                .contains("base_url = \"http://127.0.0.1:8787/v1\""));
            assert!(setup.config_toml.contains("requires_openai_auth = false"));
            assert!(setup.config_toml.contains("x-openai-actor-authorization"));
            assert!(setup
                .config_toml_with_headers
                .contains("x-openai-actor-authorization"));
            assert_eq!(
                setup
                    .config_toml_with_headers
                    .matches("http_headers =")
                    .count(),
                1
            );
        }
    }

    #[test]
    fn generates_windows_setup_with_literal_token() {
        let setup = build_codex_setup("127.0.0.1:8787", "token'$value", "windows");
        assert_eq!(setup.platform, "windows");
        assert!(setup
            .config_toml
            .contains("base_url = \"http://127.0.0.1:8787/v1\""));
        assert!(setup
            .config_toml
            .contains("env_key = \"EASYAPI_LOCAL_TOKEN\""));
        assert!(setup
            .environment_command
            .contains("'token''$value', 'User'"));
        assert!(setup
            .environment_command
            .contains("$env:EASYAPI_LOCAL_TOKEN = 'token''$value'"));
        assert!(!setup.environment_command.contains("launchctl"));
    }

    #[cfg(target_os = "macos")]
    #[test]
    fn macos_setup_preserves_zshrc_and_round_trips_token() {
        use std::process::Command;

        let temp = tempfile::tempdir().unwrap();
        let zsh_dir = temp.path().join("shell config");
        std::fs::create_dir(&zsh_dir).unwrap();
        let zshrc = zsh_dir.join(".zshrc");
        std::fs::write(&zshrc, "# Existing settings without a trailing newline").unwrap();
        let token = "test token'\"$HOME`whoami`";
        let setup = build_codex_setup("127.0.0.1:8787", token, "macos");
        assert_eq!(setup.platform, "macos");
        // Stub launchctl so the test never changes the user's login environment.
        let script = format!(
            "launchctl() {{ [[ $# = 3 && $1 = setenv && $2 = EASYAPI_LOCAL_TOKEN && $3 = $EXPECTED_TOKEN ]]; }}\n{}\n",
            setup.environment_command,
        );
        for _ in 0..2 {
            let output = Command::new("/bin/zsh")
                .args(["-efc", &script])
                .env("ZDOTDIR", &zsh_dir)
                .env("EXPECTED_TOKEN", token)
                .env_remove("EASYAPI_LOCAL_TOKEN")
                .output()
                .unwrap();
            assert!(
                output.status.success(),
                "{}",
                String::from_utf8_lossy(&output.stderr)
            );
        }
        let saved = std::fs::read_to_string(&zshrc).unwrap();
        assert!(saved.starts_with("# Existing settings without a trailing newline\n"));
        assert_eq!(saved.matches("export EASYAPI_LOCAL_TOKEN=").count(), 1);
        let output = Command::new("/bin/zsh")
            .args([
                "-efc",
                "source \"$ZDOTDIR/.zshrc\"; printf '%s' \"$EASYAPI_LOCAL_TOKEN\"",
            ])
            .env("ZDOTDIR", &zsh_dir)
            .env_remove("EASYAPI_LOCAL_TOKEN")
            .output()
            .unwrap();
        assert!(output.status.success());
        assert_eq!(String::from_utf8(output.stdout).unwrap(), token);
    }

    #[test]
    fn normalizes_provider_base_url() {
        let mut input = ProviderInput {
            id: None,
            name: " Test ".to_string(),
            base_url: "https://example.com/v1/".to_string(),
            api_key: Some("key".to_string()),
            test_model: " model ".to_string(),
            extra_headers: vec![],
            auth_type: crate::models::AUTH_TYPE_API_KEY.to_string(),
        };
        validate_provider_input(&mut input).unwrap();
        assert_eq!(input.name, "Test");
        assert_eq!(input.base_url, "https://example.com/v1");
        assert_eq!(input.test_model, "model");
    }

    #[test]
    fn rejects_authorization_override() {
        let mut input = ProviderInput {
            id: None,
            name: "Test".to_string(),
            base_url: "https://example.com/v1".to_string(),
            api_key: Some("key".to_string()),
            test_model: "model".to_string(),
            extra_headers: vec![crate::models::HeaderPair {
                name: "Authorization".to_string(),
                value: "bad".to_string(),
            }],
            auth_type: crate::models::AUTH_TYPE_API_KEY.to_string(),
        };
        assert!(validate_provider_input(&mut input).is_err());
    }
}
