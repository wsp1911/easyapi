import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { openUrl } from "@tauri-apps/plugin-opener";
import { api, AppStatus, CodexSetup, ContentCaptureStatus, HeaderPair, Provider, ProviderInput, ProviderTestResult, ProxySettings, RequestCapture, RequestLog, OAuthStatus } from "./api";
import "./App.css";

type Page = "overview" | "providers" | "requests" | "stats" | "setup" | "settings";

const emptyStatus: AppStatus = {
  proxyRunning: false,
  listenAddress: "127.0.0.1:8787",
  inFlightRequests: 0,
  totalRequests: 0,
};

function formatBytes(bytes?: number) {
  if (bytes == null) return "—";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KiB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MiB`;
}

function formatTokens(tokens?: number) {
  return tokens == null ? "—" : new Intl.NumberFormat("zh-CN").format(tokens);
}

function formatPercent(value?: number) {
  return value == null ? "—" : `${(value * 100).toFixed(1)}%`;
}

function dateInputValue(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatTime(value: string) {
  return new Intl.DateTimeFormat("zh-CN", {
    month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit",
  }).format(new Date(value));
}

function errorText(error: unknown) {
  return error instanceof Error ? error.message : String(error);
}

export default function App() {
  const [page, setPage] = useState<Page>("overview");
  const [providers, setProviders] = useState<Provider[]>([]);
  const [status, setStatus] = useState<AppStatus>(emptyStatus);
  const [logs, setLogs] = useState<RequestLog[]>([]);
  const [contentCapture, setContentCapture] = useState<ContentCaptureStatus>({ enabled: false });
  const [proxySettings, setProxySettings] = useState<ProxySettings | null>(null);
  const [setup, setSetup] = useState<CodexSetup | null>(null);
  const [oauth, setOauth] = useState<OAuthStatus | null>(null);
  const [editing, setEditing] = useState<Provider | "new" | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const [nextProviders, nextStatus, nextLogs, nextContentCapture, nextProxySettings] = await Promise.all([
        api.listProviders(), api.getStatus(), api.listLogs(), api.getContentCaptureStatus(), api.getProxySettings(),
      ]);
      setProviders(nextProviders);
      setStatus(nextStatus);
      setLogs(nextLogs);
      setContentCapture(nextContentCapture);
      setProxySettings(nextProxySettings);
      setOauth(await api.getCodexOAuthStatus());
    } catch (error) {
      setNotice(errorText(error));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
    void api.getCodexSetup().then(setSetup).catch((error) => setNotice(errorText(error)));
    const timer = window.setInterval(() => {
      void api.getStatus().then(setStatus);
    }, 2000);
    return () => window.clearInterval(timer);
  }, [refresh]);

  const active = providers.find((provider) => provider.active);

  async function switchProvider(provider: Provider) {
    try {
      await api.switchProvider(provider.id);
      setNotice(`已切换到 ${provider.name}，只影响之后的新请求`);
      await refresh();
    } catch (error) {
      setNotice(errorText(error));
    }
  }

  async function removeProvider(provider: Provider) {
    if (!window.confirm(`确定删除 ${provider.name}？API Key 也会从系统凭据库中删除。`)) return;
    try {
      await api.deleteProvider(provider.id);
      setNotice(`已删除 ${provider.name}`);
      await refresh();
    } catch (error) {
      setNotice(errorText(error));
    }
  }

  async function setContentCaptureEnabled(enabled: boolean) {
    try {
      const next = await api.setContentCaptureEnabled(enabled);
      setContentCapture(next);
      setNotice(next.enabled ? "已开始记录请求与响应内容" : "已停止记录新的请求与响应内容");
    } catch (error) {
      setNotice(errorText(error));
    }
  }

  async function saveProxySettings(settings: ProxySettings) {
    const next = await api.setProxySettings(settings);
    setProxySettings(next);
    setNotice("网络设置已保存，将应用到后续 API 和 OAuth 请求");
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">E</div>
          <div><strong>EasyAPI</strong><span>Responses Proxy</span></div>
        </div>
        <nav>
          <NavButton active={page === "overview"} icon="◫" label="概览" onClick={() => setPage("overview")} />
          <NavButton active={page === "providers"} icon="◉" label="Provider" onClick={() => setPage("providers")} />
          <NavButton active={page === "requests"} icon="≡" label="请求记录" onClick={() => { setPage("requests"); void refresh(); }} />
          <NavButton active={page === "stats"} icon="▦" label="Token 统计" onClick={() => { setPage("stats"); void refresh(); }} />
          <NavButton active={page === "setup"} icon="⌘" label="Codex 配置" onClick={() => setPage("setup")} />
          <NavButton active={page === "settings"} icon="⚙" label="设置" onClick={() => setPage("settings")} />
        </nav>
        <div className="sidebar-status">
          <span className={`status-dot ${status.proxyRunning ? "online" : "offline"}`} />
          <div><strong>{status.proxyRunning ? "代理运行中" : "代理未运行"}</strong><span>{status.listenAddress}</span></div>
        </div>
      </aside>

      <main className="main-content">
        {notice && <div className="notice" onClick={() => setNotice(null)}>{notice}<button>×</button></div>}
        {loading ? <div className="empty">正在加载…</div> : (
          <>
            {page === "overview" && <Overview status={status} active={active} providers={providers} logs={logs} oauthAuthenticated={oauth?.authenticated ?? false} onSwitch={switchProvider} onManage={() => setPage("providers")} />}
            {page === "providers" && <ProvidersPage providers={providers} onAdd={() => setEditing("new")} onEdit={setEditing} onSwitch={switchProvider} onDelete={removeProvider} notify={setNotice} />}
            {page === "requests" && <RequestsPage logs={logs} onRefresh={refresh} contentCapture={contentCapture} onCaptureEnabledChange={setContentCaptureEnabled} notify={setNotice} />}
            {page === "stats" && <StatisticsPage logs={logs} />}
            {page === "setup" && <SetupPage setup={setup} />}
            {page === "settings" && <SettingsPage settings={proxySettings} onSave={saveProxySettings} />}
          </>
        )}
      </main>

      {editing && <ProviderDialog provider={editing === "new" ? undefined : editing} onClose={() => setEditing(null)} onSaved={async () => { setEditing(null); setNotice("Provider 已保存"); await refresh(); }} />}
    </div>
  );
}

function NavButton({ active, icon, label, onClick }: { active: boolean; icon: string; label: string; onClick: () => void }) {
  return <button className={`nav-button ${active ? "active" : ""}`} onClick={onClick}><span>{icon}</span>{label}</button>;
}

function Overview({ status, active, providers, logs, oauthAuthenticated, onSwitch, onManage }: {
  status: AppStatus; active?: Provider; providers: Provider[]; logs: RequestLog[]; oauthAuthenticated: boolean;
  onSwitch: (provider: Provider) => void; onManage: () => void;
}) {
  return <section>
    <PageHeader title="概览" subtitle="Codex 始终连接本地代理，你只需在这里手动切换上游。" />
    <div className="hero-card">
      <div>
        <span className="eyebrow">当前上游</span>
        {active ? <><h2><span className="live-dot" />{active.name}</h2><p>{active.baseUrl}</p></> : <><h2>尚未选择 Provider</h2><p>添加 Provider 并手动激活后，代理才会转发请求。</p></>}
      </div>
      <button className="secondary" onClick={onManage}>管理 Provider</button>
    </div>
    <div className="stats-grid">
      <Stat label="正在处理" value={String(status.inFlightRequests)} detail="进行中的流式请求" />
      <Stat label="累计请求" value={String(status.totalRequests)} detail="本次运行期间" />
      <Stat label="已配置" value={String(providers.length)} detail="Provider 数量" />
      <Stat label="最近错误" value={status.lastError ? "有" : "无"} detail={status.lastError ?? "运行正常"} danger={Boolean(status.lastError)} />
    </div>
    <div className="content-grid">
      <div className="panel">
        <div className="panel-title"><div><h3>快速切换</h3><p>切换只影响之后的新请求。</p></div></div>
        <div className="compact-list">
          {providers.length === 0 && <div className="empty small">还没有 Provider</div>}
          {providers.map(provider => <button key={provider.id} className={`compact-provider ${provider.active ? "active" : ""}`} disabled={provider.active || (!provider.hasApiKey && !(provider.authType === "codex_oauth" && oauthAuthenticated))} onClick={() => onSwitch(provider)}>
            <span className="provider-avatar">{provider.name.slice(0, 1).toUpperCase()}</span>
            <span><strong>{provider.name}</strong><small>{provider.baseUrl}</small></span>
            <em>{provider.active ? "使用中" : "切换"}</em>
          </button>)}
        </div>
      </div>
      <div className="panel">
        <div className="panel-title"><div><h3>最近请求</h3><p>只记录脱敏元数据。</p></div></div>
        <div className="mini-logs">
          {logs.slice(0, 5).map(log => <div key={log.id}><span className={`http-status ${log.statusCode && log.statusCode < 400 ? "good" : "bad"}`}>{log.statusCode ?? "ERR"}</span><span><strong>{log.providerName ?? "未选择"}</strong><small>{formatTime(log.startedAt)} · {log.durationMs} ms</small></span></div>)}
          {logs.length === 0 && <div className="empty small">暂无请求记录</div>}
        </div>
      </div>
    </div>
  </section>;
}

function Stat({ label, value, detail, danger }: { label: string; value: string; detail: string; danger?: boolean }) {
  return <div className={`stat-card ${danger ? "danger" : ""}`}><span>{label}</span><strong>{value}</strong><small title={detail}>{detail}</small></div>;
}

function StatisticsPage({ logs }: { logs: RequestLog[] }) {
  const today = new Date();
  const defaultFrom = new Date(today);
  defaultFrom.setDate(defaultFrom.getDate() - 6);
  const [fromDate, setFromDate] = useState(() => dateInputValue(defaultFrom));
  const [toDate, setToDate] = useState(() => dateInputValue(today));
  const [provider, setProvider] = useState("");
  const [model, setModel] = useState("");

  const providerOptions = useMemo(() => {
    const options = new Map<string, string>();
    for (const log of logs) {
      const value = log.providerId ?? `name:${log.providerName ?? "unknown"}`;
      options.set(value, log.providerName ?? "未选择");
    }
    return Array.from(options, ([value, label]) => ({ value, label })).sort((a, b) => a.label.localeCompare(b.label));
  }, [logs]);

  const modelOptions = useMemo(() => {
    const values = new Set<string>();
    for (const log of logs) {
      const providerKey = log.providerId ?? `name:${log.providerName ?? "unknown"}`;
      if ((!provider || providerKey === provider) && log.model) values.add(log.model);
    }
    return Array.from(values).sort((a, b) => a.localeCompare(b));
  }, [logs, provider]);

  const filteredLogs = useMemo(() => {
    const from = fromDate ? new Date(`${fromDate}T00:00:00`).getTime() : Number.NEGATIVE_INFINITY;
    const to = toDate ? new Date(`${toDate}T23:59:59.999`).getTime() : Number.POSITIVE_INFINITY;
    return logs.filter(log => {
      const providerKey = log.providerId ?? `name:${log.providerName ?? "unknown"}`;
      const timestamp = new Date(log.startedAt).getTime();
      return timestamp >= from && timestamp <= to && (!provider || providerKey === provider) && (!model || log.model === model);
    });
  }, [logs, fromDate, toDate, provider, model]);

  const totals = useMemo(() => {
    const sum = (field: "inputTokens" | "outputTokens" | "cachedInputTokens" | "reasoningTokens") =>
      filteredLogs.reduce((total, log) => total + (log[field] ?? 0), 0);
    const input = sum("inputTokens");
    const cached = sum("cachedInputTokens");
    const usageRequests = filteredLogs.filter(log => log.inputTokens != null || log.outputTokens != null || log.totalTokens != null).length;
    const cacheHitRate = input > 0 ? cached / input : undefined;
    return {
      input,
      output: sum("outputTokens"),
      cached,
      reasoning: sum("reasoningTokens"),
      cacheHitRate,
      usageRequests,
    };
  }, [filteredLogs]);

  function resetFilters() {
    setFromDate(dateInputValue(defaultFrom));
    setToDate(dateInputValue(today));
    setProvider("");
    setModel("");
  }

  return <section>
    <PageHeader title="Token 统计" subtitle="按时间范围查看请求 token usage，并按 Provider 和模型筛选。" />
    <div className="stats-filters">
      <label className="stats-filter"><span>开始日期</span><input type="date" value={fromDate} onChange={event => setFromDate(event.target.value)} /></label>
      <label className="stats-filter"><span>结束日期</span><input type="date" value={toDate} onChange={event => setToDate(event.target.value)} /></label>
      <label className="stats-filter"><span>Provider</span><select value={provider} onChange={event => { setProvider(event.target.value); setModel(""); }}><option value="">全部 Provider</option>{providerOptions.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}</select></label>
      <label className="stats-filter"><span>模型</span><select value={model} onChange={event => setModel(event.target.value)}><option value="">全部模型</option>{modelOptions.map(option => <option key={option} value={option}>{option}</option>)}</select></label>
      <button className="secondary stats-reset" onClick={resetFilters}>重置</button>
    </div>
    <div className="stats-grid token-summary">
      <Stat label="请求数" value={formatTokens(filteredLogs.length)} detail={`${formatTokens(totals.usageRequests)} 个请求包含 usage`} />
      <Stat label="输入 Token" value={formatTokens(totals.input)} detail={`缓存输入 ${formatTokens(totals.cached)}`} />
      <Stat label="输出 Token" value={formatTokens(totals.output)} detail={`推理输出 ${formatTokens(totals.reasoning)}`} />
      <Stat label="缓存命中率" value={formatPercent(totals.cacheHitRate)} detail={`${formatTokens(totals.cached)} 个缓存输入 Token`} />
    </div>
    <div className="table-panel stats-table-panel">
      <table><thead><tr><th>时间</th><th>Provider</th><th>模型</th><th>输入</th><th>输出</th><th>缓存</th><th>缓存命中率</th><th>推理</th><th>状态</th></tr></thead>
        <tbody>{filteredLogs.map(log => <tr key={log.id}><td>{formatTime(log.startedAt)}</td><td>{log.providerName ?? "—"}</td><td>{log.model ?? "—"}</td><td>{formatTokens(log.inputTokens)}</td><td>{formatTokens(log.outputTokens)}</td><td>{formatTokens(log.cachedInputTokens)}</td><td>{formatPercent(log.inputTokens != null && log.inputTokens > 0 && log.cachedInputTokens != null ? log.cachedInputTokens / log.inputTokens : undefined)}</td><td>{formatTokens(log.reasoningTokens)}</td><td><span className={`http-status ${log.statusCode && log.statusCode < 400 ? "good" : "bad"}`}>{log.statusCode ?? "ERR"}</span></td></tr>)}</tbody>
      </table>
      {filteredLogs.length === 0 && <div className="empty">当前筛选范围内暂无请求 usage</div>}
    </div>
  </section>;
}

function ProvidersPage({ providers, onAdd, onEdit, onSwitch, onDelete, notify }: {
  providers: Provider[]; onAdd: () => void; onEdit: (p: Provider) => void; onSwitch: (p: Provider) => void;
  onDelete: (p: Provider) => void; notify: (value: string) => void;
}) {
  const [testing, setTesting] = useState<string | null>(null);
  const [results, setResults] = useState<Record<string, ProviderTestResult>>({});
  const [oauth, setOauth] = useState<OAuthStatus | null>(null);
  const [oauthBusy, setOauthBusy] = useState(false);
  const [device, setDevice] = useState<{ deviceCode: string; userCode: string; verificationUri: string; interval: number } | null>(null);

  useEffect(() => { void api.getCodexOAuthStatus().then(setOauth).catch(() => undefined); }, []);

  async function loginOAuth() {
    setOauthBusy(true);
    try {
      const next = await api.startCodexOAuthLogin();
      setDevice(next);
      await openUrl(next.verificationUri);
      notify(`请在浏览器中输入设备码 ${next.userCode} 完成 ChatGPT 登录`);
      let attempts = 0;
      const poll = async () => {
        if (attempts++ > Math.ceil(next.expiresIn / next.interval)) throw new Error("OAuth 登录已过期");
        const done = await api.pollCodexOAuthLogin(next.deviceCode, next.userCode);
        if (done) { setDevice(null); setOauth(await api.getCodexOAuthStatus()); notify("ChatGPT OAuth 登录成功"); setOauthBusy(false); return; }
        window.setTimeout(() => void poll().catch(error => { setOauthBusy(false); notify(errorText(error)); }), next.interval * 1000);
      };
      window.setTimeout(() => void poll().catch(error => { setOauthBusy(false); notify(errorText(error)); }), next.interval * 1000);
    } catch (error) { setOauthBusy(false); notify(errorText(error)); }
  }

  async function test(provider: Provider) {
    setTesting(provider.id);
    try {
      const result = await api.testProvider(provider.id);
      setResults(current => ({ ...current, [provider.id]: result }));
      notify(`${provider.name}: ${result.message}（${result.latencyMs} ms）`);
    } catch (error) {
      notify(errorText(error));
    } finally {
      setTesting(null);
    }
  }

  return <section>
    <PageHeader title="Provider" subtitle="每个 Provider 都在 EasyAPI 内部独立切换认证和上游。" action={<button className="primary" onClick={onAdd}>＋ 添加 Provider</button>} />
    <div className="info-box"><strong>Codex 官方订阅</strong><p>{oauth?.authenticated ? `已登录 ${oauth.email ?? oauth.accountId ?? "ChatGPT 账号"}` : "OAuth 凭据由 EasyAPI 单独保存，Codex 仍只连接 easyapi Provider。"}</p><div className="card-actions"><button disabled={oauthBusy} onClick={() => void loginOAuth()}>{oauthBusy ? "登录处理中…" : oauth?.authenticated ? "重新登录" : "登录 ChatGPT"}</button>{oauth?.authenticated && <button className="delete" onClick={() => void api.logoutCodexOAuth().then(() => { setOauth({ authenticated: false }); notify("已退出 ChatGPT OAuth"); }).catch(error => notify(errorText(error)))}>退出登录</button>}</div>{device && <small>设备码：{device.userCode}，请完成浏览器授权后等待状态更新。</small>}</div>
    <div className="provider-grid">
      {providers.map(provider => {
        const result = results[provider.id];
        return <article className={`provider-card ${provider.active ? "active" : ""}`} key={provider.id}>
          <div className="provider-card-top">
            <span className="provider-avatar large">{provider.name.slice(0, 1).toUpperCase()}</span>
            <div><h3>{provider.name}</h3><p>{provider.authType === "codex_oauth" ? "ChatGPT OAuth · chatgpt.com/backend-api/codex" : provider.baseUrl}</p></div>
            {provider.active && <span className="active-badge">使用中</span>}
          </div>
          <dl>
            <div><dt>认证</dt><dd>{provider.authType === "codex_oauth" ? (oauth?.authenticated ? "ChatGPT OAuth 已登录" : "需要登录") : (provider.hasApiKey ? "API Key 已安全保存" : "未设置")}</dd></div>
            <div><dt>测试模型</dt><dd>{provider.testModel || "未设置"}</dd></div>
            <div><dt>额外请求头</dt><dd>{provider.extraHeaders.length} 项</dd></div>
            {result && <div><dt>最近测试</dt><dd className={result.ok ? "success-text" : "error-text"}>{result.statusCode ?? "连接失败"} · {result.latencyMs} ms</dd></div>}
          </dl>
          <div className="card-actions">
            <button disabled={testing === provider.id || !provider.testModel} onClick={() => void test(provider)}>{testing === provider.id ? "测试中…" : "测试"}</button>
            <button onClick={() => onEdit(provider)}>编辑</button>
            {!provider.active && <button className="switch" disabled={!provider.authenticated || (provider.authType === "codex_oauth" && !oauth?.authenticated)} onClick={() => onSwitch(provider)}>切换</button>}
            <button className="delete" onClick={() => onDelete(provider)}>删除</button>
          </div>
        </article>;
      })}
      {providers.length === 0 && <button className="add-card" onClick={onAdd}><span>＋</span><strong>添加第一个 Provider</strong><small>配置上游 Base URL 和 API Key</small></button>}
    </div>
    <div className="info-box"><strong>手动切换语义</strong><p>切换发生时，已经进入代理的请求会继续使用原 Provider；切换之后发起的新请求才使用新的 Provider。EasyAPI 不会自动重试或故障转移。</p></div>
  </section>;
}

function RequestsPage({ logs, onRefresh, contentCapture, onCaptureEnabledChange, notify }: {
  logs: RequestLog[]; onRefresh: () => Promise<void>; contentCapture: ContentCaptureStatus;
  onCaptureEnabledChange: (enabled: boolean) => Promise<void>; notify: (value: string) => void;
}) {
  const [viewingCapture, setViewingCapture] = useState<string | null>(null);
  const [clearing, setClearing] = useState(false);
  const [clearingLogs, setClearingLogs] = useState(false);
  const hasCapturedContent = logs.some(log => log.contentCaptured);

  async function clearCaptures() {
    if (!window.confirm("确定清空所有已保存的请求和响应内容吗？请求元数据会保留。")) return;
    setClearing(true);
    try {
      await api.clearRequestCaptures();
      notify("已清空请求与响应内容记录");
      await onRefresh();
    } catch (error) {
      notify(errorText(error));
    } finally {
      setClearing(false);
    }
  }

  async function clearLogs() {
    if (!window.confirm("确定删除全部请求记录吗？请求元数据和已保存的请求与响应内容都会被删除。")) return;
    setClearingLogs(true);
    try {
      await api.clearRequestLogs();
      setViewingCapture(null);
      notify("已删除全部请求记录");
      await onRefresh();
    } catch (error) {
      notify(errorText(error));
    } finally {
      setClearingLogs(false);
    }
  }

  const busy = clearing || clearingLogs;

  return <section>
    <PageHeader title="请求记录" subtitle={contentCapture.enabled ? "正在原样保存新的 Responses 请求和响应内容。" : "仅保存状态、耗时和请求大小；内容记录当前已关闭。"} action={<div className="request-actions"><label className="capture-toggle"><span>记录内容</span><input type="checkbox" checked={contentCapture.enabled} onChange={event => void onCaptureEnabledChange(event.target.checked)} /></label>{(contentCapture.enabled || hasCapturedContent) && <button className="secondary" disabled={busy} onClick={() => void clearCaptures()}>{clearing ? "清空中…" : "清空内容"}</button>}{logs.length > 0 && <button className="secondary" disabled={busy} onClick={() => void clearLogs()}>{clearingLogs ? "清理中…" : "清理记录"}</button>}<button className="secondary" onClick={() => void onRefresh()}>刷新</button></div>} />
    <div className="table-panel">
      <table><thead><tr><th>时间</th><th>Provider</th><th>状态</th><th>结果</th><th>请求大小</th><th>耗时</th><th>内容</th><th>错误</th></tr></thead>
        <tbody>{logs.map(log => <tr key={log.id}><td>{formatTime(log.startedAt)}</td><td>{log.providerName ?? "—"}</td><td><span className={`http-status ${log.statusCode && log.statusCode < 400 ? "good" : "bad"}`}>{log.statusCode ?? "ERR"}</span></td><td>{outcomeLabel(log.outcome)}{log.retryCount > 0 && <small className="retry-note">自动重试 {log.retryCount} 次</small>}</td><td>{formatBytes(log.requestBytes)}</td><td>{log.durationMs} ms</td><td>{log.contentCaptured ? <button className="content-button" onClick={() => setViewingCapture(log.id)}>查看</button> : "—"}</td><td className="error-cell" title={log.error}>{log.error ?? "—"}</td></tr>)}</tbody>
      </table>
      {logs.length === 0 && <div className="empty">暂无请求记录</div>}
    </div>
    {viewingCapture && <RequestCaptureDialog id={viewingCapture} onClose={() => setViewingCapture(null)} />}
  </section>;
}

function RequestCaptureDialog({ id, onClose }: { id: string; onClose: () => void }) {
  const [capture, setCapture] = useState<RequestCapture | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    void api.getRequestCapture(id).then(setCapture).catch(error => setError(errorText(error)));
  }, [id]);

  return <div className="dialog-backdrop" onMouseDown={event => { if (event.target === event.currentTarget) onClose(); }}>
    <div className="dialog capture-dialog">
      <div className="dialog-header"><div><h2>请求与响应内容</h2><p>{id}</p></div><button type="button" onClick={onClose}>×</button></div>
      {error && <div className="form-error">{error}</div>}
      {!capture && !error && <div className="empty small">正在读取内容记录…</div>}
      {capture && <>
        {capture.captureError && <div className="form-error">{capture.captureError}</div>}
        <CaptureSection title="请求" contentType={capture.requestContentType} bytes={capture.requestCapturedBytes} complete={capture.requestComplete} content={capture.requestContent} />
        <CaptureSection title="响应" contentType={capture.responseContentType} bytes={capture.responseCapturedBytes} complete={capture.responseComplete} content={capture.responseContent} />
      </>}
    </div>
  </div>;
}

function CaptureSection({ title, contentType, bytes, complete, content }: { title: string; contentType?: string; bytes: number; complete: boolean; content?: string }) {
  return <section className="capture-section"><div className="capture-section-header"><h3>{title}</h3><span>{contentType ?? "未知类型"} · {formatBytes(bytes)} · {complete ? "完整" : "未完整"}</span></div><pre>{content ?? "内容文件不可用"}</pre></section>;
}

function outcomeLabel(outcome: string) {
  const labels: Record<string, string> = { completed: "完成", completed_client_disconnect: "完成后客户端断开", cancelled: "请求未完成", client_disconnected: "客户端断开（响应未完成）", client_cancelled: "客户端断开（历史记录）", proxy_error: "代理错误", upstream_http_error: "上游错误", stream_error: "流中断", streaming: "传输中" };
  return labels[outcome] ?? outcome;
}

function SettingsPage({ settings, onSave }: {
  settings: ProxySettings | null;
  onSave: (settings: ProxySettings) => Promise<void>;
}) {
  const [value, setValue] = useState("");
  const [proxyMode, setProxyMode] = useState<ProxySettings["proxyMode"]>("system");
  const [proxyUrl, setProxyUrl] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (settings) {
      setValue(String(settings.upstreamConnectTimeoutSeconds));
      setProxyMode(settings.proxyMode);
      setProxyUrl(settings.proxyUrl);
    }
  }, [settings]);

  async function submit(event: FormEvent) {
    event.preventDefault();
    const seconds = Number(value);
    if (!Number.isInteger(seconds) || seconds < 1 || seconds > 300) {
      setError("请输入 1 到 300 之间的整数秒数");
      return;
    }
    if (proxyMode === "manual" && !proxyUrl.trim()) {
      setError("请输入代理地址，例如 http://127.0.0.1:7897");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      await onSave({ upstreamConnectTimeoutSeconds: seconds, proxyMode, proxyUrl: proxyUrl.trim() });
    } catch (saveError) {
      setError(errorText(saveError));
    } finally {
      setSaving(false);
    }
  }

  return <section>
    <PageHeader title="设置" subtitle="调整 EasyAPI 的本地代理行为。修改会立即应用到后续请求。" />
    <form className="settings-panel" onSubmit={submit}>
      <div className="panel-title"><h3>上游网络</h3><p>用于 EasyAPI 连接上游 API、模型列表、生图、OAuth 登录和刷新。设置保存后立即生效，重启应用后保留。</p></div>
      <div className="settings-field">
        <label><span>代理方式</span><select value={proxyMode} onChange={event => setProxyMode(event.target.value as ProxySettings["proxyMode"])} disabled={!settings || saving}><option value="system">跟随系统代理</option><option value="direct">直连（不使用代理）</option><option value="manual">手动指定代理</option></select></label>
        <small>{proxyMode === "system" ? "自动读取系统或应用进程的代理环境变量。更改系统代理后，请重新保存设置或重启 EasyAPI。" : proxyMode === "direct" ? "直接连接上游，忽略系统和环境变量中的代理。" : "填写代理软件提供的 HTTP / SOCKS 端口，例如 http://127.0.0.1:7897 或 socks5h://127.0.0.1:7897。请使用本机免认证端口。"}</small>
      </div>
      {proxyMode === "manual" && <div className="settings-field"><label><span>代理地址</span><input className="proxy-url-input" type="text" value={proxyUrl} onChange={event => setProxyUrl(event.target.value)} placeholder="http://127.0.0.1:7897" autoComplete="off" disabled={!settings || saving} /></label><small>不要填写 EasyAPI 的 8787 端口。Provider 的 Base URL 仍应填写模型服务的 API 地址。</small></div>}
      <div className="settings-field">
        <label><span>超时时间（秒）</span><input type="number" min="1" max="300" step="1" value={value} onChange={event => setValue(event.target.value)} disabled={!settings || saving} /></label>
        <small>范围：1–300 秒，默认 15 秒。仅限制建立上游连接，不限制 Responses 总时长或 SSE 读取时长。</small>
      </div>
      <div className="settings-field"><small>访问 127.0.0.1、localhost、::1 等本机服务始终直连。Codex 访问 EasyAPI 的 127.0.0.1:8787 也应在代理软件中设置为绕过代理。</small></div>
      {error && <div className="form-error">{error}</div>}
      <div className="dialog-actions"><button className="primary" disabled={!settings || saving}>{saving ? "保存中…" : "保存设置"}</button></div>
    </form>
  </section>;
}

function SetupPage({ setup }: { setup: CodexSetup | null }) {
  const [copied, setCopied] = useState<string | null>(null);
  const macProxyBypassCommand = 'export NO_PROXY="${NO_PROXY:+$NO_PROXY,}127.0.0.1,localhost,::1"\nexport no_proxy="$NO_PROXY"\nlaunchctl setenv NO_PROXY "$NO_PROXY"\nlaunchctl setenv no_proxy "$NO_PROXY"';
  const windowsProxyBypassCommand = `$easyapiNoProxy = @(
  $env:NO_PROXY
  [Environment]::GetEnvironmentVariable('NO_PROXY', 'User')
  [Environment]::GetEnvironmentVariable('NO_PROXY', 'Machine')
  '127.0.0.1,localhost,::1'
) -join ','
$easyapiNoProxy = ($easyapiNoProxy -split ',' | ForEach-Object { $_.Trim() } | Where-Object { $_ } | Select-Object -Unique) -join ','
[Environment]::SetEnvironmentVariable('NO_PROXY', $easyapiNoProxy, 'User')
$env:NO_PROXY = $easyapiNoProxy`;
  async function copy(label: string, value: string) {
    await navigator.clipboard.writeText(value);
    setCopied(label);
    window.setTimeout(() => setCopied(null), 1500);
  }
  if (!setup) return <div className="empty">正在加载配置…</div>;
  return <section>
    <PageHeader title="Codex 配置" subtitle="完成以下配置后，所有上游切换都在 EasyAPI 内完成。" />
    <div className="setup-step"><span>1</span><div><h3>设置本地认证 Token</h3><p>{setup.platform === "macos" ? "在终端（zsh）中执行。命令会将 Token 写入 .zshrc，并设置当前登录会话的桌面应用环境变量；随后完全退出并重新打开 Codex。" : setup.platform === "windows" ? "在 PowerShell 中执行，然后重启一次 Codex 使用户环境变量生效。" : "在终端中执行，并从同一终端启动 Codex。"}</p>{setup.platform === "macos" && <p>重启 Mac 或重新登录后，终端启动的 Codex 会自动读取 Token；从 Dock 或 Finder 启动前，请再执行一次下面的命令。使用其他 Shell 时，请将 export 行加入对应的启动配置。</p>}<CodeBlock value={setup.environmentCommand} copied={copied === "env"} onCopy={() => void copy("env", setup.environmentCommand)} /></div></div>
    <div className="setup-step"><span>2</span><div><h3>修改用户级 config.toml</h3><p>把下面配置加入 <code>~/.codex/config.toml</code>。模型名称仍由你现有的 Codex 配置决定。将 model_provider 放在文件顶层；已有 easyapi 配置时修改原配置，避免重复创建同名表。配置中的 <code>x-openai-actor-authorization</code> 用于让 Codex 注册内置生图工具，EasyAPI 转发前会将其移除。</p><CodeBlock value={setup.configToml} copied={copied === "toml"} onCopy={() => void copy("toml", setup.configToml)} /></div></div>
    <div className="setup-step"><span>3</span><div><h3>保持 EasyAPI 运行</h3><p>{setup.platform === "macos" ? "关闭窗口后代理会继续运行。点击 Dock 图标或菜单栏图标中的“显示 EasyAPI”可重新打开窗口；使用菜单中的“退出”或 ⌘Q 完全退出。" : "关闭窗口会隐藏到系统托盘，不会停止代理。需要完全关闭时使用托盘菜单中的“退出”。"}</p></div></div>
    <div className="warning-box"><strong>请求体没有应用层大小限制</strong><p>Responses 请求体会直接流式转发，不读取成完整 JSON。内容记录关闭时不会写入磁盘；仅有 60 秒上传空闲超时。</p></div>
    <div className="warning-box"><strong>遇到 502 时检查请求链路</strong><p>先查看 EasyAPI 的“请求记录”。有记录时检查上游服务和“设置 → 上游网络”；无记录时，先确认 Codex 连接的是 http://127.0.0.1:8787/v1，并让代理软件绕过 127.0.0.1 和 localhost。缺少本地 Token 通常返回 401。</p>{(setup.platform === "macos" || setup.platform === "windows") && <details className="setup-alternative"><summary>{setup.platform === "windows" ? "Windows" : "macOS"}：为新启动的 Codex 设置本机地址绕过代理</summary><p>{setup.platform === "windows" ? "在 PowerShell 中执行下方命令，再完全退出并重新打开 Codex。命令会保留现有的绕过地址，并将本机地址添加到用户级 NO_PROXY 环境变量，重启后仍然有效；从终端启动 Codex 时，请使用新的终端窗口或当前 PowerShell。" : "在终端执行下方命令，再完全退出并重新打开 Codex。这些环境变量对当前登录会话有效。"}如果代理软件使用 TUN / 透明代理模式，还需在该软件中将回环地址设为直连。</p><CodeBlock value={setup.platform === "windows" ? windowsProxyBypassCommand : macProxyBypassCommand} copied={copied === "bypass"} onCopy={() => void copy("bypass", setup.platform === "windows" ? windowsProxyBypassCommand : macProxyBypassCommand)} /></details>}</div>
  </section>;
}

function CodeBlock({ value, copied, onCopy }: { value: string; copied: boolean; onCopy: () => void }) {
  return <div className="code-block"><pre>{value}</pre><button onClick={onCopy}>{copied ? "已复制" : "复制"}</button></div>;
}

function ProviderDialog({ provider, onClose, onSaved }: { provider?: Provider; onClose: () => void; onSaved: () => Promise<void> }) {
  const [form, setForm] = useState<ProviderInput>({
    id: provider?.id,
    name: provider?.name ?? "",
    baseUrl: provider?.baseUrl ?? "",
    apiKey: "",
    testModel: provider?.testModel ?? "",
    extraHeaders: provider?.extraHeaders ?? [],
    authType: provider?.authType ?? "api_key",
  });
  const [saving, setSaving] = useState(false);
  const [models, setModels] = useState<string[]>([]);
  const [loadingModels, setLoadingModels] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const valid = useMemo(() => form.name.trim() && form.baseUrl.trim() && (form.authType === "codex_oauth" || provider || form.apiKey?.trim()), [form, provider]);
  async function submit(event: FormEvent) {
    event.preventDefault();
    setSaving(true); setError(null);
    try { await api.saveProvider({ ...form, apiKey: form.apiKey?.trim() || undefined }); await onSaved(); }
    catch (error) { setError(errorText(error)); }
    finally { setSaving(false); }
  }
  function updateHeader(index: number, patch: Partial<HeaderPair>) {
    setForm(current => ({ ...current, extraHeaders: current.extraHeaders.map((item, i) => i === index ? { ...item, ...patch } : item) }));
  }
  async function loadModels() {
    if (!provider) return;
    setLoadingModels(true); setError(null);
    try { setModels(await api.listProviderModels(provider.id)); }
    catch (error) { setError(errorText(error)); }
    finally { setLoadingModels(false); }
  }
  return <div className="dialog-backdrop" onMouseDown={event => { if (event.target === event.currentTarget) onClose(); }}>
    <form className="dialog" onSubmit={submit}>
      <div className="dialog-header"><div><h2>{provider ? "编辑 Provider" : "添加 Provider"}</h2><p>API Key 保存到系统凭据库（Windows 凭据管理器 / macOS 钥匙串）；OAuth 凭据由 EasyAPI 单独保存。</p></div><button type="button" onClick={onClose}>×</button></div>
      {error && <div className="form-error">{error}</div>}
      <label><span>名称</span><input autoFocus value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="例如 API-A" /></label>
      <label><span>认证方式</span><select value={form.authType} onChange={e => setForm({ ...form, authType: e.target.value as ProviderInput["authType"], baseUrl: e.target.value === "codex_oauth" ? "https://chatgpt.com/backend-api/codex" : form.baseUrl })}><option value="api_key">API Key</option><option value="codex_oauth">ChatGPT 官方订阅 OAuth</option></select></label>
      <label><span>Base URL</span><input value={form.baseUrl} onChange={e => setForm({ ...form, baseUrl: e.target.value })} placeholder="https://api.example.com/v1" /><small>{form.authType === "codex_oauth" ? "官方 OAuth 固定使用 ChatGPT Codex backend。" : "填写真正上游服务的 API 地址，EasyAPI 会追加 /responses。127.0.0.1:8787 是 EasyAPI 自己的入口，仅供 Codex 配置使用。"}</small></label>
      {form.authType === "api_key" && <label><span>{provider ? "替换 API Key（留空则不修改）" : "API Key"}</span><input type="password" value={form.apiKey} onChange={e => setForm({ ...form, apiKey: e.target.value })} placeholder={provider ? "保持现有 Key" : "sk-..."} autoComplete="off" /></label>}
      <label><span className="model-field-label">测试模型{provider && <button type="button" onClick={() => void loadModels()} disabled={loadingModels}>{loadingModels ? "获取中…" : "获取模型"}</button>}</span><input list="provider-models" value={form.testModel} onChange={e => setForm({ ...form, testModel: e.target.value })} placeholder="用于手动连接测试，可留空" />
        <datalist id="provider-models">{models.map(model => <option key={model} value={model} />)}</datalist>
      </label>
      <div className="headers-editor"><div className="field-heading"><span>额外请求头</span><button type="button" onClick={() => setForm({ ...form, extraHeaders: [...form.extraHeaders, { name: "", value: "" }] })}>＋ 添加</button></div>
        {form.extraHeaders.map((header, index) => <div className="header-row" key={index}><input value={header.name} onChange={e => updateHeader(index, { name: e.target.value })} placeholder="Header-Name" /><input value={header.value} onChange={e => updateHeader(index, { value: e.target.value })} placeholder="Value" /><button type="button" onClick={() => setForm({ ...form, extraHeaders: form.extraHeaders.filter((_, i) => i !== index) })}>×</button></div>)}
      </div>
      <div className="dialog-actions"><button type="button" className="secondary" onClick={onClose}>取消</button><button className="primary" disabled={!valid || saving}>{saving ? "保存中…" : "保存"}</button></div>
    </form>
  </div>;
}

function PageHeader({ title, subtitle, action }: { title: string; subtitle: string; action?: React.ReactNode }) {
  return <header className="page-header"><div><h1>{title}</h1><p>{subtitle}</p></div>{action}</header>;
}
