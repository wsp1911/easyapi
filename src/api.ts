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
  getStatus: () => invoke<AppStatus>("get_status"),
  listLogs: (limit = 100) => invoke<RequestLog[]>("list_request_logs", { limit }),
  getCodexSetup: () => invoke<CodexSetup>("get_codex_setup"),
};
