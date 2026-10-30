use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Provider {
    pub id: String,
    pub name: String,
    pub base_url: String,
    pub test_model: String,
    pub extra_headers: Vec<HeaderPair>,
    pub auth_type: String,
    pub created_at: String,
    pub updated_at: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct HeaderPair {
    pub name: String,
    pub value: String,
}

#[derive(Debug, Clone, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct ProviderInput {
    pub id: Option<String>,
    pub name: String,
    pub base_url: String,
    pub api_key: Option<String>,
    #[serde(default)]
    pub test_model: String,
    #[serde(default)]
    pub extra_headers: Vec<HeaderPair>,
    #[serde(default = "default_auth_type")]
    pub auth_type: String,
}

#[derive(Debug, Clone, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct ProviderView {
    #[serde(flatten)]
    pub provider: Provider,
    pub active: bool,
    pub has_api_key: bool,
    pub authenticated: bool,
}

pub const AUTH_TYPE_API_KEY: &str = "api_key";
pub const AUTH_TYPE_CODEX_OAUTH: &str = "codex_oauth";

fn default_auth_type() -> String {
    AUTH_TYPE_API_KEY.to_string()
}

#[derive(Debug, Clone, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct AppStatus {
    pub proxy_running: bool,
    pub listen_address: String,
    pub active_provider_id: Option<String>,
    pub active_provider_name: Option<String>,
    pub in_flight_requests: u64,
    pub total_requests: u64,
    pub last_error: Option<String>,
}

#[derive(Debug, Clone, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct RequestLog {
    pub id: String,
    pub provider_id: Option<String>,
    pub provider_name: Option<String>,
    pub model: Option<String>,
    pub started_at: String,
    pub duration_ms: i64,
    pub status_code: Option<u16>,
    pub outcome: String,
    pub retry_count: u32,
    pub error: Option<String>,
    pub request_bytes: Option<u64>,
    pub input_tokens: Option<i64>,
    pub output_tokens: Option<i64>,
    pub total_tokens: Option<i64>,
    pub cached_input_tokens: Option<i64>,
    pub reasoning_tokens: Option<i64>,
    pub content_captured: bool,
}

#[derive(Debug, Clone, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct ContentCaptureStatus {
    pub enabled: bool,
}

#[derive(Debug, Clone, Copy, Default, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum ProxyMode {
    #[default]
    System,
    Direct,
    Manual,
}

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct ProxySettings {
    pub upstream_connect_timeout_seconds: u64,
    #[serde(default)]
    pub proxy_mode: ProxyMode,
    #[serde(default)]
    pub proxy_url: String,
}

#[derive(Debug, Clone, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct RequestCapture {
    pub request_content_type: Option<String>,
    pub response_content_type: Option<String>,
    pub request_content: Option<String>,
    pub response_content: Option<String>,
    pub request_captured_bytes: i64,
    pub response_captured_bytes: i64,
    pub request_complete: bool,
    pub response_complete: bool,
    pub capture_error: Option<String>,
}

#[derive(Debug, Clone, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct ProviderTestResult {
    pub ok: bool,
    pub status_code: Option<u16>,
    pub latency_ms: u128,
    pub message: String,
}

#[derive(Debug, Clone, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct CodexSetup {
    pub config_toml: String,
    pub config_toml_with_headers: String,
    pub environment_command: String,
    pub platform: String,
    pub local_token: String,
}
