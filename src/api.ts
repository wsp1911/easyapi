import { invoke } from "@tauri-apps/api/core";

export type HeaderPair = { name: string; value: string };

export type Provider = {
  id: string;
  name: string;
  baseUrl: string;
  testModel: string;
  extraHeaders: HeaderPair[];
  createdAt: string;
  updatedAt: string;
  active: boolean;
  hasApiKey: boolean;
  authenticated: boolean;
  authType: "api_key" | "codex_oauth";
};

export type ProviderInput = {
  id?: string;
  name: string;
  baseUrl: string;
  apiKey?: string;
  testModel: string;
  extraHeaders: HeaderPair[];
  authType: "api_key" | "codex_oauth";
};

export type AppStatus = {
  proxyRunning: boolean;
  listenAddress: string;
  activeProviderId?: string;
  activeProviderName?: string;
  inFlightRequests: number;
  totalRequests: number;
  lastError?: string;
};

export type RequestLog = {
  id: string;
  providerId?: string;
  providerName?: string;
  model?: string;
  startedAt: string;
  durationMs: number;
  statusCode?: number;
  outcome: string;
  retryCount: number;
  error?: string;
  requestBytes?: number;
  inputTokens?: number;
  outputTokens?: number;
  totalTokens?: number;
  cachedInputTokens?: number;
  reasoningTokens?: number;
  contentCaptured: boolean;
};

export type ContentCaptureStatus = {
  enabled: boolean;
};

export type ProxySettings = {
  upstreamConnectTimeoutSeconds: number;
  proxyMode: "system" | "direct" | "manual";
  proxyUrl: string;
  capacityRetryCount: number;
};

export type RequestCapture = {
  requestContentType?: string;
  responseContentType?: string;
  requestContent?: string;
  responseContent?: string;
  requestCapturedBytes: number;
  responseCapturedBytes: number;
  requestComplete: boolean;
  responseComplete: boolean;
  captureError?: string;
};

export type ProviderTestResult = {
  ok: boolean;
  statusCode?: number;
  latencyMs: number;
  message: string;
};

export type CodexSetup = {
  configToml: string;
  configTomlWithHeaders: string;
  environmentCommand: string;
  platform: string;
  localToken: string;
};

export type DeviceCode = { deviceCode: string; userCode: string; verificationUri: string; expiresIn: number; interval: number };
export type OAuthStatus = { authenticated: boolean; accountId?: string; email?: string; expiresAt?: number };

export const api = {
  listProviders: () => invoke<Provider[]>("list_providers"),
  saveProvider: (input: ProviderInput) => invoke<Provider>("save_provider", { input }),
  deleteProvider: (id: string) => invoke<void>("delete_provider", { id }),
  switchProvider: (id: string) => invoke<void>("switch_provider", { id }),
  testProvider: (id: string) => invoke<ProviderTestResult>("test_provider", { id }),
  listProviderModels: (id: string) => invoke<string[]>("list_provider_models", { id }),
  getStatus: () => invoke<AppStatus>("get_status"),
  listLogs: (limit?: number) => invoke<RequestLog[]>("list_request_logs", { limit }),
  getContentCaptureStatus: () => invoke<ContentCaptureStatus>("get_content_capture_status"),
  setContentCaptureEnabled: (enabled: boolean) => invoke<ContentCaptureStatus>("set_content_capture_enabled", { enabled }),
  getProxySettings: () => invoke<ProxySettings>("get_proxy_settings"),
  setProxySettings: (settings: ProxySettings) => invoke<ProxySettings>("set_proxy_settings", { settings }),
  setUpstreamConnectTimeoutSeconds: (seconds: number) => invoke<ProxySettings>("set_upstream_connect_timeout_seconds", { seconds }),
  getRequestCapture: (id: string) => invoke<RequestCapture>("get_request_capture", { id }),
  clearRequestCaptures: () => invoke<void>("clear_request_captures"),
  clearRequestLogs: () => invoke<void>("clear_request_logs"),
  getCodexSetup: () => invoke<CodexSetup>("get_codex_setup"),
  startCodexOAuthLogin: () => invoke<DeviceCode>("start_codex_oauth_login"),
  pollCodexOAuthLogin: (deviceCode: string, userCode: string) => invoke<boolean>("poll_codex_oauth_login", { deviceCode, userCode }),
  getCodexOAuthStatus: () => invoke<OAuthStatus>("get_codex_oauth_status"),
  logoutCodexOAuth: () => invoke<void>("logout_codex_oauth"),
};
