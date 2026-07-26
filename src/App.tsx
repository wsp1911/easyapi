import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { api, AppStatus, CodexSetup, HeaderPair, Provider, ProviderInput, ProviderTestResult, RequestLog } from "./api";
import "./App.css";

type Page = "overview" | "providers" | "requests" | "setup";

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
  const [setup, setSetup] = useState<CodexSetup | null>(null);
  const [editing, setEditing] = useState<Provider | "new" | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const [nextProviders, nextStatus, nextLogs] = await Promise.all([
        api.listProviders(), api.getStatus(), api.listLogs(100),
      ]);
      setProviders(nextProviders);
      setStatus(nextStatus);
      setLogs(nextLogs);
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
          <NavButton active={page === "setup"} icon="⌘" label="Codex 配置" onClick={() => setPage("setup")} />
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
            {page === "overview" && <Overview status={status} active={active} providers={providers} logs={logs} onSwitch={switchProvider} onManage={() => setPage("providers")} />}
            {page === "providers" && <ProvidersPage providers={providers} onAdd={() => setEditing("new")} onEdit={setEditing} onSwitch={switchProvider} onDelete={removeProvider} notify={setNotice} />}
            {page === "requests" && <RequestsPage logs={logs} onRefresh={refresh} />}
            {page === "setup" && <SetupPage setup={setup} />}
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

function Overview({ status, active, providers, logs, onSwitch, onManage }: {
  status: AppStatus; active?: Provider; providers: Provider[]; logs: RequestLog[];
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
          {providers.map(provider => <button key={provider.id} className={`compact-provider ${provider.active ? "active" : ""}`} disabled={provider.active || !provider.hasApiKey} onClick={() => onSwitch(provider)}>
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

function ProvidersPage({ providers, onAdd, onEdit, onSwitch, onDelete, notify }: {
  providers: Provider[]; onAdd: () => void; onEdit: (p: Provider) => void; onSwitch: (p: Provider) => void;
  onDelete: (p: Provider) => void; notify: (value: string) => void;
}) {
  const [testing, setTesting] = useState<string | null>(null);
  const [results, setResults] = useState<Record<string, ProviderTestResult>>({});

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
    <PageHeader title="Provider" subtitle="每个 Provider 包含一个上游地址和独立 API Key。" action={<button className="primary" onClick={onAdd}>＋ 添加 Provider</button>} />
    <div className="provider-grid">
      {providers.map(provider => {
        const result = results[provider.id];
        return <article className={`provider-card ${provider.active ? "active" : ""}`} key={provider.id}>
          <div className="provider-card-top">
            <span className="provider-avatar large">{provider.name.slice(0, 1).toUpperCase()}</span>
            <div><h3>{provider.name}</h3><p>{provider.baseUrl}</p></div>
            {provider.active && <span className="active-badge">使用中</span>}
          </div>
          <dl>
            <div><dt>API Key</dt><dd>{provider.hasApiKey ? "已安全保存" : "未设置"}</dd></div>
            <div><dt>测试模型</dt><dd>{provider.testModel || "未设置"}</dd></div>
            <div><dt>额外请求头</dt><dd>{provider.extraHeaders.length} 项</dd></div>
            {result && <div><dt>最近测试</dt><dd className={result.ok ? "success-text" : "error-text"}>{result.statusCode ?? "连接失败"} · {result.latencyMs} ms</dd></div>}
          </dl>
          <div className="card-actions">
            <button disabled={testing === provider.id || !provider.testModel} onClick={() => void test(provider)}>{testing === provider.id ? "测试中…" : "测试"}</button>
            <button onClick={() => onEdit(provider)}>编辑</button>
            {!provider.active && <button className="switch" disabled={!provider.hasApiKey} onClick={() => onSwitch(provider)}>切换</button>}
            <button className="delete" onClick={() => onDelete(provider)}>删除</button>
          </div>
        </article>;
      })}
      {providers.length === 0 && <button className="add-card" onClick={onAdd}><span>＋</span><strong>添加第一个 Provider</strong><small>配置上游 Base URL 和 API Key</small></button>}
    </div>
    <div className="info-box"><strong>手动切换语义</strong><p>切换发生时，已经进入代理的请求会继续使用原 Provider；切换之后发起的新请求才使用新的 Provider。EasyAPI 不会自动重试或故障转移。</p></div>
  </section>;
}

function RequestsPage({ logs, onRefresh }: { logs: RequestLog[]; onRefresh: () => Promise<void> }) {
  return <section>
    <PageHeader title="请求记录" subtitle="仅保存状态、耗时和请求大小，不保存 Prompt、代码、响应内容或 API Key。" action={<button className="secondary" onClick={() => void onRefresh()}>刷新</button>} />
    <div className="table-panel">
      <table><thead><tr><th>时间</th><th>Provider</th><th>状态</th><th>结果</th><th>请求大小</th><th>耗时</th><th>错误</th></tr></thead>
        <tbody>{logs.map(log => <tr key={log.id}><td>{formatTime(log.startedAt)}</td><td>{log.providerName ?? "—"}</td><td><span className={`http-status ${log.statusCode && log.statusCode < 400 ? "good" : "bad"}`}>{log.statusCode ?? "ERR"}</span></td><td>{outcomeLabel(log.outcome)}</td><td>{formatBytes(log.requestBytes)}</td><td>{log.durationMs} ms</td><td className="error-cell" title={log.error}>{log.error ?? "—"}</td></tr>)}</tbody>
      </table>
      {logs.length === 0 && <div className="empty">暂无请求记录</div>}
    </div>
  </section>;
}

function outcomeLabel(outcome: string) {
  const labels: Record<string, string> = { completed: "完成", cancelled: "请求未完成", client_cancelled: "客户端取消", proxy_error: "代理错误", upstream_http_error: "上游错误", stream_error: "流中断", streaming: "传输中" };
  return labels[outcome] ?? outcome;
}

function SetupPage({ setup }: { setup: CodexSetup | null }) {
  const [copied, setCopied] = useState<string | null>(null);
  async function copy(label: string, value: string) {
    await navigator.clipboard.writeText(value);
    setCopied(label);
    window.setTimeout(() => setCopied(null), 1500);
  }
  if (!setup) return <div className="empty">正在加载配置…</div>;
  return <section>
    <PageHeader title="Codex 配置" subtitle="只需配置一次，之后所有上游切换都在 EasyAPI 内完成。" />
    <div className="setup-step"><span>1</span><div><h3>设置本地认证 Token</h3><p>在 PowerShell 中执行，然后重启一次 Codex 使用户环境变量生效。</p><CodeBlock value={setup.powershellCommand} copied={copied === "ps"} onCopy={() => void copy("ps", setup.powershellCommand)} /></div></div>
    <div className="setup-step"><span>2</span><div><h3>修改用户级 config.toml</h3><p>把下面配置加入 <code>~/.codex/config.toml</code>。模型名称仍由你现有的 Codex 配置决定。</p><CodeBlock value={setup.configToml} copied={copied === "toml"} onCopy={() => void copy("toml", setup.configToml)} /></div></div>
    <div className="setup-step"><span>3</span><div><h3>保持 EasyAPI 运行</h3><p>关闭窗口会隐藏到系统托盘，不会停止代理。需要完全关闭时使用托盘菜单中的“退出”。</p></div></div>
    <div className="warning-box"><strong>请求体没有应用层大小限制</strong><p>Responses 请求体会直接流式转发，不读取成完整 JSON，也不会写入磁盘。仅有 60 秒上传空闲超时。</p></div>
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
  });
  const [saving, setSaving] = useState(false);
  const [models, setModels] = useState<string[]>([]);
  const [loadingModels, setLoadingModels] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const valid = useMemo(() => form.name.trim() && form.baseUrl.trim() && (provider || form.apiKey?.trim()), [form, provider]);
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
      <div className="dialog-header"><div><h2>{provider ? "编辑 Provider" : "添加 Provider"}</h2><p>API Key 将保存到 Windows Credential Manager。</p></div><button type="button" onClick={onClose}>×</button></div>
      {error && <div className="form-error">{error}</div>}
      <label><span>名称</span><input autoFocus value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="例如 API-A" /></label>
      <label><span>Base URL</span><input value={form.baseUrl} onChange={e => setForm({ ...form, baseUrl: e.target.value })} placeholder="https://api.example.com/v1" /><small>EasyAPI 会在此地址后追加 /responses</small></label>
      <label><span>{provider ? "替换 API Key（留空则不修改）" : "API Key"}</span><input type="password" value={form.apiKey} onChange={e => setForm({ ...form, apiKey: e.target.value })} placeholder={provider ? "保持现有 Key" : "sk-..."} autoComplete="off" /></label>
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
