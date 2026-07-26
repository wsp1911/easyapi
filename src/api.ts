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
};

export type ProviderInput = {
  id?: string;
  name: string;
  baseUrl: string;
  apiKey?: string;
  testModel: string;
  extraHeaders: HeaderPair[];
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
  startedAt: string;
  durationMs: number;
  statusCode?: number;
  outcome: string;
  error?: string;
  requestBytes?: number;
  contentCaptured: boolean;
};

export type ContentCaptureStatus = {
  enabled: boolean;
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
  powershellCommand: string;
  localToken: string;
};

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
  getRequestCapture: (id: string) => invoke<RequestCapture>("get_request_capture", { id }),
  clearRequestCaptures: () => invoke<void>("clear_request_captures"),
  getCodexSetup: () => invoke<CodexSetup>("get_codex_setup"),
};
