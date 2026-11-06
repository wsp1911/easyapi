import { FormEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { isTauri } from "@tauri-apps/api/core";
import { openUrl } from "@tauri-apps/plugin-opener";
import { BarChart3, Boxes, Home, List, Moon, Settings2, Sun, Terminal } from "lucide-react";
import {
  ActionItem, Alert, Avatar, Button, ConfirmDialog,
  DesignSystemProvider, Dialog, DialogBody, DialogClose, DialogDescription, DialogFooter,
  DialogHeader, DialogHeading, DialogTitle, Disclosure, Empty, Field, FieldGroup,
  FieldRow, FormSection, Icon, IconButton, Input, LoadingState,
  NavigationPanel, NavigationPanelBody, NavigationPanelContent, NavigationPanelFooter,
  NavigationPanelHeader, NavigationPanelItem, NavigationPanelSection,
  NumberInput, PageHeader as SystemPageHeader, SegmentedControl, Select,
  StatusPill, Switch, ThemeRoot, Toolbar,
} from "@openbitfun/ui";
import { themes } from "@openbitfun/theme-openbitfun";
import { api, AppStatus, CodexSetup, ContentCaptureStatus, HeaderPair, Provider, ProviderInput, ProviderTestResult, ProxySettings, RequestCapture, RequestLog, OAuthStatus } from "./api";
import "./App.css";

type Page = "overview" | "providers" | "requests" | "stats" | "setup" | "settings";
type ThemeMode = "dark" | "light";

const themeStorageKey = "easyapi-theme";

function getInitialTheme(): ThemeMode {
  if (typeof window === "undefined") return "dark";
  try { return window.localStorage.getItem(themeStorageKey) === "light" ? "light" : "dark"; }
  catch { return "dark"; }
}

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
  const [theme, setTheme] = useState<ThemeMode>(getInitialTheme);
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
  const [deleting, setDeleting] = useState<Provider | null>(null);

  const refresh = useCallback(async () => {
    if (!isTauri()) {
      setLoading(false);
      return;
    }
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
    document.documentElement.dataset.colorScheme = theme;
    document.documentElement.setAttribute("data-openbitfun-design-system-root", "");
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", String(themes[theme]["color.surface.canvas"]));
    try { window.localStorage.setItem(themeStorageKey, theme); } catch { /* Theme remains usable without storage. */ }
  }, [theme]);

  useEffect(() => {
    void refresh();
    if (!isTauri()) return;
    void api.getCodexSetup().then(setSetup).catch((error) => setNotice(errorText(error)));
    const timer = window.setInterval(() => {
      void api.getStatus().then(setStatus).catch(error => setNotice(errorText(error)));
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
    try {
      await api.deleteProvider(provider.id);
      setDeleting(null);
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

  const pages: { id: Page; label: string; icon: typeof Home; group: "workspace" | "app" }[] = [
    { id: "overview", label: "概览", icon: Home, group: "workspace" },
    { id: "providers", label: "Provider", icon: Boxes, group: "workspace" },
    { id: "requests", label: "请求记录", icon: List, group: "workspace" },
    { id: "stats", label: "Token 统计", icon: BarChart3, group: "workspace" },
    { id: "setup", label: "Codex 配置", icon: Terminal, group: "app" },
    { id: "settings", label: "设置", icon: Settings2, group: "app" },
  ];
  const currentPage = pages.find(item => item.id === page)!;

  return <DesignSystemProvider colorScheme={theme} density="comfortable" locale="zh-CN" messages={{
    dialogClose: "关闭", confirmAction: "确认", confirmCancel: "取消", loading: "加载中…",
    noOptions: "暂无选项", selectPlaceholder: "请选择", searchOptions: "搜索选项", clearSelection: "清空选择",
  }}>
    <ThemeRoot className="theme-root" colorScheme={theme} density="comfortable">
      <div className="app-shell">
        <NavigationPanel className="app-navigation" aria-label="主导航">
          <NavigationPanelHeader>
            <div className="brand"><Avatar shape="square" size="md">E</Avatar><div><strong>EasyAPI</strong><span>本地 API 工作台</span></div></div>
          </NavigationPanelHeader>
          <NavigationPanelBody>
            <NavigationPanelContent>
              {(["workspace", "app"] as const).map(group => <NavigationPanelSection key={group} title={group === "workspace" ? "工作空间" : "应用"}>
                {pages.filter(item => item.group === group).map(item => <NavigationPanelItem key={item.id} selected={page === item.id} leading={<Icon glyph={item.icon} size="sm" />} onClick={() => { setPage(item.id); if (item.id === "requests" || item.id === "stats") void refresh(); }}>{item.label}</NavigationPanelItem>)}
              </NavigationPanelSection>)}
            </NavigationPanelContent>
          </NavigationPanelBody>
          <NavigationPanelFooter>
            <span className="sidebar-caption">外观</span>
            <SegmentedControl aria-label="界面主题" size="sm" value={theme} onValueChange={value => setTheme(value as ThemeMode)} options={[
              { value: "light", label: "浅色", icon: <Icon glyph={Sun} size="xs" /> },
              { value: "dark", label: "深色", icon: <Icon glyph={Moon} size="xs" /> },
            ]} />
          </NavigationPanelFooter>
        </NavigationPanel>
        <div className="workspace">
          <Toolbar size="sm" bordered leading={<div className="workspace-path"><Icon glyph={currentPage.icon} size="sm" /><span>EasyAPI</span><Icon name="chevron-right" size="xs" /><strong>{currentPage.label}</strong></div>} trailing={<StatusPill tone={status.proxyRunning ? "success" : "neutral"} leading={<Icon name={status.proxyRunning ? "check-circle" : "circle"} size="xs" />}>{!isTauri() ? "界面预览" : status.proxyRunning ? "代理运行中" : "代理未运行"}</StatusPill>} />
          <main className="main-content">
            <div className="page-viewport">
              {notice && <Alert className="app-notice" tone="info" message={notice} closable closeLabel="关闭通知" onClose={() => setNotice(null)} />}
              {loading ? <LoadingState>正在加载工作空间…</LoadingState> : <>
                {page === "overview" && <Overview status={status} active={active} providers={providers} logs={logs} oauthAuthenticated={oauth?.authenticated ?? false} onSwitch={switchProvider} onManage={() => setPage("providers")} onRequests={() => setPage("requests")} />}
                {page === "providers" && <ProvidersPage providers={providers} onAdd={() => setEditing("new")} onEdit={setEditing} onSwitch={switchProvider} onDelete={setDeleting} notify={setNotice} />}
                {page === "requests" && <RequestsPage logs={logs} onRefresh={refresh} contentCapture={contentCapture} onCaptureEnabledChange={setContentCaptureEnabled} notify={setNotice} />}
                {page === "stats" && <StatisticsPage logs={logs} />}
                {page === "setup" && <SetupPage setup={setup} />}
                {page === "settings" && <SettingsPage settings={proxySettings} theme={theme} onThemeChange={setTheme} onSave={saveProxySettings} />}
              </>}
            </div>
          </main>
          <div className="workspace-status"><span className="mono">{status.listenAddress}</span><span>Responses API</span><span className="status-end">{status.inFlightRequests} 个请求进行中</span></div>
        </div>
      </div>
      {editing && <ProviderDialog provider={editing === "new" ? undefined : editing} onClose={() => setEditing(null)} onSaved={async () => { setEditing(null); setNotice("Provider 已保存"); await refresh(); }} />}
      <ConfirmDialog open={Boolean(deleting)} title={`删除 ${deleting?.name ?? "Provider"}？`} message="对应的 API Key 也会从系统凭据库中删除。此操作无法撤销。" confirmDanger confirmText="删除 Provider" cancelText="保留" onConfirm={async () => { if (deleting) await removeProvider(deleting); }} onOpenChange={() => setDeleting(null)} />
    </ThemeRoot>
  </DesignSystemProvider>;
}

function Overview({ status, active, providers, logs, oauthAuthenticated, onSwitch, onManage, onRequests }: {
  status: AppStatus; active?: Provider; providers: Provider[]; logs: RequestLog[]; oauthAuthenticated: boolean;
  onSwitch: (provider: Provider) => void; onManage: () => void; onRequests: () => void;
}) {
  return <section className="page-stack">
    <PageHeader title="概览" subtitle="连接、切换，继续工作。" action={<Button variant="outline" size="sm" leadingIcon={<Icon name="layers" size="xs" />} onClick={onManage}>管理 Provider</Button>} />
    <div className="connection-strip">
      <Avatar shape="square" size="lg" icon={<Icon name="route" size="md" />} />
      <div className="connection-copy"><span className="muted">当前上游</span><h2>{active?.name ?? "尚未连接上游"}</h2><span className="mono muted">{active?.baseUrl ?? "添加并激活 Provider，即可开始转发请求"}</span></div>
      <StatusPill tone={active ? "success" : "neutral"}>{active ? "使用中" : "等待配置"}</StatusPill>
    </div>
    <div className="metrics">
      <Stat label="正在处理" value={String(status.inFlightRequests)} detail="进行中的请求" />
      <Stat label="累计请求" value={String(status.totalRequests)} detail="本次运行期间" />
      <Stat label="已配置上游" value={String(providers.length)} detail="Provider 数量" />
      <Stat label="最近错误" value={status.lastError ? "有" : "无"} detail={status.lastError ?? "运行正常"} danger={Boolean(status.lastError)} />
    </div>
    <div className="overview-columns">
      <FormSection title="切换上游" description="新请求将使用所选 Provider。" actions={<Button size="xs" variant="quiet" onClick={onManage}>全部上游<Icon name="chevron-right" size="xs" /></Button>}>
        <div className="action-list">
          {providers.length === 0 ? <Empty icon={<Icon name="plug" />} title="添加你的第一个 Provider" description="连接 API Key 或 ChatGPT 官方订阅。" actions={<Button size="sm" variant="fill" onClick={onManage}>配置上游</Button>} /> : providers.map(provider => <ActionItem key={provider.id} className="overview-item" labelBehavior="static" leading={<Avatar shape="square" size="sm">{provider.name.slice(0, 1).toUpperCase()}</Avatar>} metadata={provider.active ? <StatusPill tone="success">使用中</StatusPill> : <Icon name="arrow-right" size="xs" />} disabled={!provider.active && !provider.hasApiKey && !(provider.authType === "codex_oauth" && oauthAuthenticated)} onClick={() => { if (!provider.active) onSwitch(provider); }}><span className="provider-label"><strong>{provider.name}</strong><small>{provider.baseUrl}</small></span></ActionItem>)}
        </div>
      </FormSection>
      <FormSection title="最近请求" description="最近 5 条请求的状态与耗时。" actions={<Button size="xs" variant="quiet" onClick={onRequests}>全部记录<Icon name="chevron-right" size="xs" /></Button>}>
        <div className="action-list">
          {logs.length === 0 ? <Empty icon={<Icon name="history" />} title="等待第一条请求" description="Codex 发起请求后，记录会显示在这里。" /> : logs.slice(0, 5).map(log => <ActionItem key={log.id} className="overview-item" labelBehavior="static" leading={<HttpStatus statusCode={log.statusCode} />} metadata={<span className="mono muted">{log.durationMs} ms</span>} onClick={onRequests}><span className="provider-label"><strong>{log.providerName ?? "未选择"}</strong><small>{formatTime(log.startedAt)}</small></span></ActionItem>)}
        </div>
      </FormSection>
    </div>
  </section>;
}

function Stat({ label, value, detail, danger }: { label: string; value: string; detail: string; danger?: boolean }) {
  return <div className="metric"><span className="muted">{label}</span><strong className={danger ? "error-text" : undefined}>{value}</strong><small className="muted" title={detail}>{detail}</small></div>;
}

function HttpStatus({ statusCode }: { statusCode?: number }) {
  return <StatusPill className="http-status" tone={statusCode && statusCode < 400 ? "success" : "danger"} shape="rounded">{statusCode ?? "ERR"}</StatusPill>;
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

  return <section className="page-stack">
    <PageHeader title="Token 统计" subtitle="按时间范围查看请求 token usage，并按 Provider 和模型筛选。" />
    <div className="stats-filters">
      <Field label="开始日期" controlWidth="fill"><Input type="date" size="sm" value={fromDate} onValueChange={setFromDate} /></Field>
      <Field label="结束日期" controlWidth="fill"><Input type="date" size="sm" value={toDate} onValueChange={setToDate} /></Field>
      <Field label="Provider" controlWidth="fill"><Select size="sm" value={provider} onValueChange={value => { setProvider(String(value)); setModel(""); }} options={[{ value: "", label: "全部 Provider" }, ...providerOptions]} /></Field>
      <Field label="模型" controlWidth="fill"><Select size="sm" value={model} onValueChange={value => setModel(String(value))} options={[{ value: "", label: "全部模型" }, ...modelOptions.map(value => ({ value, label: value }))]} /></Field>
      <Button variant="quiet" size="sm" onClick={resetFilters}>重置</Button>
    </div>
    <div className="metrics">
      <Stat label="请求数" value={formatTokens(filteredLogs.length)} detail={`${formatTokens(totals.usageRequests)} 个请求包含 usage`} />
      <Stat label="输入 Token" value={formatTokens(totals.input)} detail={`缓存输入 ${formatTokens(totals.cached)}`} />
      <Stat label="输出 Token" value={formatTokens(totals.output)} detail={`推理输出 ${formatTokens(totals.reasoning)}`} />
      <Stat label="缓存命中率" value={formatPercent(totals.cacheHitRate)} detail={`${formatTokens(totals.cached)} 个缓存输入 Token`} />
    </div>
    <div className="table-panel stats-table-panel">
      <table><thead><tr><th>时间</th><th>Provider</th><th>模型</th><th>输入</th><th>输出</th><th>缓存</th><th>缓存命中率</th><th>推理</th><th>状态</th></tr></thead>
        <tbody>{filteredLogs.map(log => <tr key={log.id}><td>{formatTime(log.startedAt)}</td><td>{log.providerName ?? "—"}</td><td>{log.model ?? "—"}</td><td>{formatTokens(log.inputTokens)}</td><td>{formatTokens(log.outputTokens)}</td><td>{formatTokens(log.cachedInputTokens)}</td><td>{formatPercent(log.inputTokens != null && log.inputTokens > 0 && log.cachedInputTokens != null ? log.cachedInputTokens / log.inputTokens : undefined)}</td><td>{formatTokens(log.reasoningTokens)}</td><td><HttpStatus statusCode={log.statusCode} /></td></tr>)}</tbody>
      </table>
      {filteredLogs.length === 0 && <Empty icon={<Icon name="filter" />} title="当前筛选范围内暂无用量" description="调整日期、Provider 或模型后重试。" />}
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

  return <section className="page-stack">
    <PageHeader title="Provider" subtitle="管理你的上游连接与认证。" action={<Button variant="primary" size="sm" leadingIcon={<Icon name="plus" size="xs" />} onClick={onAdd}>添加 Provider</Button>} />
    <FormSection title="已保存的连接" description={`${providers.length} 个 Provider · 点击名称展开连接详情`}>
      <div className="provider-list">
        {providers.length === 0 && <Empty icon={<Icon name="plug" />} title="还没有 Provider" description="添加上游 Base URL 和认证信息，即可开始使用。" actions={<Button variant="fill" size="sm" onClick={onAdd}>添加第一个 Provider</Button>} />}
        {providers.map(provider => {
          const result = results[provider.id];
          const authenticated = provider.authType === "codex_oauth" ? Boolean(oauth?.authenticated) : provider.hasApiKey;
          return <Disclosure key={provider.id} className="provider-disclosure" summary={provider.name} description={provider.baseUrl} leading={<Avatar shape="square" size="sm">{provider.name.slice(0, 1).toUpperCase()}</Avatar>} actions={<div className="provider-actions">
            <StatusPill tone={provider.active ? "success" : authenticated ? "neutral" : "warning"}>{provider.active ? "使用中" : authenticated ? "已就绪" : "待认证"}</StatusPill>
            {!provider.active && <Button size="sm" variant="fill" disabled={!authenticated} onClick={() => onSwitch(provider)}>使用此上游</Button>}
            <IconButton size="sm" variant="quiet" aria-label={`编辑 ${provider.name}`} icon={<Icon name="edit" size="sm" />} onClick={() => onEdit(provider)} />
            <IconButton size="sm" variant="quiet" tone="danger" aria-label={`删除 ${provider.name}`} icon={<Icon name="delete" size="sm" />} onClick={() => onDelete(provider)} />
          </div>}>
            <div className="provider-details">
              <dl><div><dt>认证方式</dt><dd>{provider.authType === "codex_oauth" ? "ChatGPT 官方订阅" : "API Key"}</dd></div><div><dt>认证状态</dt><dd>{authenticated ? "凭据已保存" : "尚未完成认证"}</dd></div><div><dt>测试模型</dt><dd>{provider.testModel || "未设置"}</dd></div><div><dt>额外请求头</dt><dd>{provider.extraHeaders.length} 项</dd></div></dl>
              <div className="inline-actions"><Button size="sm" variant="outline" loading={testing === provider.id} disabled={!provider.testModel} leadingIcon={<Icon name="route" size="xs" />} onClick={() => void test(provider)}>测试连接</Button>{result && <StatusPill tone={result.ok ? "success" : "danger"}>{result.statusCode ?? "连接失败"} · {result.latencyMs} ms</StatusPill>}</div>
            </div>
          </Disclosure>;
        })}
      </div>
    </FormSection>
    <FormSection title="ChatGPT 官方订阅" description="通过设备码登录，为官方订阅 Provider 提供认证。">
      <FieldGroup appearance="subtle"><FieldRow><div className="account-row"><Avatar icon={<Icon name="user" size="sm" />} /><div className="account-copy"><strong>{oauth?.authenticated ? (oauth.email ?? oauth.accountId ?? "ChatGPT 账号") : "尚未登录"}</strong><span className="muted">{oauth?.authenticated ? "认证凭据已单独保存" : "支持 ChatGPT Plus / Pro 订阅"}</span></div><Button size="sm" variant="outline" loading={oauthBusy} onClick={() => void loginOAuth()}>{oauth?.authenticated ? "重新登录" : "登录 ChatGPT"}</Button>{oauth?.authenticated && <Button size="sm" variant="quiet" onClick={() => void api.logoutCodexOAuth().then(() => { setOauth({ authenticated: false }); notify("已退出 ChatGPT OAuth"); }).catch(error => notify(errorText(error)))}>退出</Button>}</div></FieldRow></FieldGroup>
      {device && <Alert tone="info" message={`设备码：${device.userCode}`} description="请完成浏览器授权，登录状态会自动更新。" />}
    </FormSection>
    <p className="page-note"><Icon name="info" size="xs" />切换只影响新请求；进行中的请求继续使用原 Provider。</p>
  </section>;
}

function RequestsPage({ logs, onRefresh, contentCapture, onCaptureEnabledChange, notify }: {
  logs: RequestLog[]; onRefresh: () => Promise<void>; contentCapture: ContentCaptureStatus;
  onCaptureEnabledChange: (enabled: boolean) => Promise<void>; notify: (value: string) => void;
}) {
  const [viewingCapture, setViewingCapture] = useState<string | null>(null);
  const [confirmClear, setConfirmClear] = useState<"contents" | "logs" | null>(null);
  const [clearing, setClearing] = useState(false);
  const [clearingLogs, setClearingLogs] = useState(false);
  const hasCapturedContent = logs.some(log => log.contentCaptured);

  async function clearCaptures() {
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

  return <section className="page-stack">
    <PageHeader title="请求记录" subtitle={contentCapture.enabled ? "正在原样保存新的 Responses 请求和响应内容。" : "仅保存状态、耗时和请求大小；内容记录当前已关闭。"} action={<div className="request-actions"><label className="capture-toggle"><span>记录内容</span><Switch checked={contentCapture.enabled} onCheckedChange={enabled => void onCaptureEnabledChange(enabled)} aria-label="记录内容" /></label>{(contentCapture.enabled || hasCapturedContent) && <Button variant="outline" size="xs" disabled={busy} onClick={() => setConfirmClear("contents")}>{clearing ? "清空中…" : "清空内容"}</Button>}{logs.length > 0 && <Button variant="outline" size="xs" disabled={busy} onClick={() => setConfirmClear("logs")}>{clearingLogs ? "清理中…" : "清理记录"}</Button>}<Button variant="quiet" size="xs" onClick={() => void onRefresh()}><Icon name="refresh" size="xs" />刷新</Button></div>} />
    <div className="table-panel">
      <table><thead><tr><th>时间</th><th>Provider</th><th>状态</th><th>结果</th><th>请求大小</th><th>耗时</th><th>内容</th><th>错误</th></tr></thead>
        <tbody>{logs.map(log => <tr key={log.id}><td>{formatTime(log.startedAt)}</td><td>{log.providerName ?? "—"}</td><td><HttpStatus statusCode={log.statusCode} /></td><td>{outcomeLabel(log.outcome)}{log.retryCount > 0 && <small className="retry-note">自动重试 {log.retryCount} 次</small>}</td><td>{formatBytes(log.requestBytes)}</td><td>{log.durationMs} ms</td><td>{log.contentCaptured ? <Button className="content-button" variant="text" size="xs" onClick={() => setViewingCapture(log.id)}>查看</Button> : "—"}</td><td className="error-cell" title={log.error}>{log.error ?? "—"}</td></tr>)}</tbody>
      </table>
      {logs.length === 0 && <Empty icon={<Icon name="history" />} title="暂无请求记录" description="经由 EasyAPI 的请求会出现在这里。" />}
    </div>
    <ConfirmDialog open={Boolean(confirmClear)} title={confirmClear === "logs" ? "清理全部请求记录？" : "清空已记录的内容？"} message={confirmClear === "logs" ? "请求元数据及请求与响应内容都会被删除，无法撤销。" : "请求与响应正文会被删除，元数据保留。此操作无法撤销。"} confirmText="确认清理" cancelText="取消" confirmDanger onOpenChange={() => setConfirmClear(null)} onConfirm={async () => { if (confirmClear === "logs") await clearLogs(); else await clearCaptures(); setConfirmClear(null); }} />
    {viewingCapture && <RequestCaptureDialog id={viewingCapture} onClose={() => setViewingCapture(null)} />}
  </section>;
}

function RequestCaptureDialog({ id, onClose }: { id: string; onClose: () => void }) {
  const [capture, setCapture] = useState<RequestCapture | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    void api.getRequestCapture(id).then(setCapture).catch(error => setError(errorText(error)));
  }, [id]);

  return <Dialog open onOpenChange={onClose} size="2xl">
    <DialogHeader><DialogHeading><DialogTitle>请求与响应内容</DialogTitle><DialogDescription>{id}</DialogDescription></DialogHeading><DialogClose aria-label="关闭" /></DialogHeader>
    <DialogBody>
      {error && <Alert tone="error" message={error} />}
      {!capture && !error && <LoadingState>正在读取内容记录…</LoadingState>}
      {capture && <div className="page-stack">
        {capture.captureError && <Alert tone="error" message={capture.captureError} />}
        <CaptureSection title="请求" contentType={capture.requestContentType} bytes={capture.requestCapturedBytes} complete={capture.requestComplete} content={capture.requestContent} />
        <CaptureSection title="响应" contentType={capture.responseContentType} bytes={capture.responseCapturedBytes} complete={capture.responseComplete} content={capture.responseContent} />
      </div>}
    </DialogBody>
  </Dialog>;
}

function CaptureSection({ title, contentType, bytes, complete, content }: { title: string; contentType?: string; bytes: number; complete: boolean; content?: string }) {
  return <section className="capture-section"><div className="capture-section-header"><h3>{title}</h3><span>{contentType ?? "未知类型"} · {formatBytes(bytes)} · {complete ? "完整" : "未完整"}</span></div><pre>{content ?? "内容文件不可用"}</pre></section>;
}

function outcomeLabel(outcome: string) {
  const labels: Record<string, string> = { completed: "完成", completed_client_disconnect: "完成后客户端断开", cancelled: "请求未完成", client_disconnected: "客户端断开（响应未完成）", client_cancelled: "客户端断开（历史记录）", proxy_error: "代理错误", upstream_http_error: "上游错误", stream_error: "流中断", streaming: "传输中" };
  return labels[outcome] ?? outcome;
}

function SettingsPage({ settings, theme, onThemeChange, onSave }: {
  settings: ProxySettings | null;
  theme: ThemeMode;
  onThemeChange: (theme: ThemeMode) => void;
  onSave: (settings: ProxySettings) => Promise<void>;
}) {
  const [value, setValue] = useState("15");
  const [capacityRetryValue, setCapacityRetryValue] = useState("5");
  const [proxyMode, setProxyMode] = useState<ProxySettings["proxyMode"]>("system");
  const [proxyUrl, setProxyUrl] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (settings) {
      setValue(String(settings.upstreamConnectTimeoutSeconds));
      setCapacityRetryValue(String(settings.capacityRetryCount));
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
    const capacityRetryCount = Number(capacityRetryValue);
    if (!Number.isInteger(capacityRetryCount) || capacityRetryCount < 0 || capacityRetryCount > 10) {
      setError("请输入 0 到 10 之间的整数次数");
      return;
    }
    if (proxyMode === "manual" && !proxyUrl.trim()) {
      setError("请输入代理地址，例如 http://127.0.0.1:7897");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      await onSave({ upstreamConnectTimeoutSeconds: seconds, proxyMode, proxyUrl: proxyUrl.trim(), capacityRetryCount });
    } catch (saveError) {
      setError(errorText(saveError));
    } finally {
      setSaving(false);
    }
  }

  return <section className="page-stack settings-page">
    <PageHeader title="设置" subtitle="个性化外观与上游网络。" />
    <FormSection title="外观" description="主题偏好自动保存到本机。" leading={<Icon name="palette" size="sm" />}>
      <FieldGroup appearance="subtle"><FieldRow><Field orientation="horizontal" label="界面主题" description="选择适合当前环境的明暗外观。" controlWidth="auto"><SegmentedControl aria-label="界面主题" value={theme} onValueChange={value => onThemeChange(value as ThemeMode)} options={[{ value: "light", label: "浅色", icon: <Icon glyph={Sun} size="xs" /> }, { value: "dark", label: "深色", icon: <Icon glyph={Moon} size="xs" /> }]} /></Field></FieldRow></FieldGroup>
    </FormSection>
    <form className="page-stack" onSubmit={submit}>
      <FormSection title="上游网络" description="用于 API 请求、模型列表和 OAuth 登录。保存后应用到后续请求。" leading={<Icon name="route" size="sm" />}>
        <FieldGroup appearance="subtle" dividers>
          <FieldRow><Field orientation="horizontal" label="代理方式" description={proxyMode === "system" ? "读取系统或进程的代理环境变量。更改系统代理后需重新保存或重启。" : proxyMode === "direct" ? "直接连接上游，忽略系统代理。" : "使用 HTTP / HTTPS / SOCKS 代理软件提供的本机免认证端口。"} controlWidth="auto"><Select aria-label="代理方式" value={proxyMode} onValueChange={next => setProxyMode(next as ProxySettings["proxyMode"])} disabled={!settings || saving} options={[{ value: "system", label: "跟随系统代理" }, { value: "direct", label: "直连" }, { value: "manual", label: "手动指定" }]} /></Field></FieldRow>
          {proxyMode === "manual" && <FieldRow><Field orientation="horizontal" label="代理地址" description="不要填写 EasyAPI 自己的 8787 端口。" controlWidth="auto"><Input aria-label="代理地址" value={proxyUrl} onValueChange={setProxyUrl} placeholder="http://127.0.0.1:7897" autoComplete="off" disabled={!settings || saving} /></Field></FieldRow>}
          <FieldRow><Field orientation="horizontal" label="连接超时" description="仅限制连接建立时间，不限制流式响应时长。范围 1–300 秒。" controlWidth="auto"><NumberInput aria-label="连接超时" value={Number(value)} decrementLabel="减少超时秒数" incrementLabel="增加超时秒数" onValueChange={next => setValue(String(next))} min={1} max={300} step={1} unit="秒" disabled={!settings || saving} /></Field></FieldRow>
          <FieldRow><Field orientation="horizontal" label="容量限制重试次数" description="上游返回容量不足时自动重试，范围 0–10 次，默认 5 次。0 表示关闭；第 5 次后继续使用 16 秒间隔。" controlWidth="auto"><NumberInput aria-label="容量限制重试次数" value={Number(capacityRetryValue)} decrementLabel="减少重试次数" incrementLabel="增加重试次数" onValueChange={next => setCapacityRetryValue(String(next))} min={0} max={10} step={1} unit="次" disabled={!settings || saving} /></Field></FieldRow>
        </FieldGroup>
        <p className="page-note"><Icon name="info" size="xs" />127.0.0.1、localhost 和 ::1 等本机服务始终直连。</p>
      </FormSection>
      {error && <Alert tone="error" message={error} />}
      <div className="form-actions"><Button type="submit" variant="primary" disabled={!settings} loading={saving}>保存网络设置</Button></div>
    </form>
  </section>;
}

function SetupPage({ setup }: { setup: CodexSetup | null }) {
  const [copied, setCopied] = useState<string | null>(null);
  const [step, setStep] = useState(0);
  const stepNavigation = useRef<HTMLDivElement>(null);
  function changeStep(next: number) {
    setStep(next);
    stepNavigation.current?.scrollIntoView({ block: "nearest" });
  }
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
  if (!setup) return isTauri() ? <LoadingState>正在加载配置…</LoadingState> : <Empty icon={<Icon name="terminal" />} title="请在桌面应用中查看配置" description="本地认证 Token 与平台命令由桌面应用生成。" />;
  return <section className="page-stack">
    <PageHeader title="Codex 配置" subtitle="完成以下配置后，所有上游切换都在 EasyAPI 内完成。" />
    <div className="setup-navigation" ref={stepNavigation}>
      <SegmentedControl aria-label="配置步骤" labelBehavior="static" distribution="fill" variant="pills" value={String(step)} onValueChange={value => changeStep(Number(value))} options={[
        { value: "0", label: "1. 本地认证" },
        { value: "1", label: "2. Provider 配置" },
        { value: "2", label: "3. 运行与检查" },
      ]} />
      <span className="muted">步骤 {step + 1} / 3</span>
    </div>
    <FormSection title={["设置本地认证 Token", "修改用户级 config.toml", "保持 EasyAPI 运行"][step]} description={["让 Codex 安全地访问本地代理。", "Codex 连接固定地址，上游切换由 EasyAPI 处理。", "完成配置后重新启动 Codex，发起一次请求验证连接。"][step]}>
      <div className="setup-guidance">
        {step === 0 && <><p>{setup.platform === "macos" ? "在终端（zsh）中执行。命令会将 Token 写入 .zshrc，并设置当前登录会话的桌面应用环境变量；随后完全退出并重新打开 Codex。" : setup.platform === "windows" ? "在 PowerShell 中执行，然后重启一次 Codex 使用户环境变量生效。" : "在终端中执行，并从同一终端启动 Codex。"}</p>{setup.platform === "macos" && <p>重启 Mac 或重新登录后，终端启动的 Codex 会自动读取 Token；从 Dock 或 Finder 启动前，请再执行一次下面的命令。使用其他 Shell 时，请将 export 行加入对应的启动配置。</p>}<CodeBlock value={setup.environmentCommand} copied={copied === "env"} onCopy={() => void copy("env", setup.environmentCommand)} /></>}
        {step === 1 && <><p>把下面配置加入 <code>~/.codex/config.toml</code>。模型名称仍由你现有的 Codex 配置决定。将 model_provider 放在文件顶层；已有 easyapi 配置时修改原配置，避免重复创建同名表。配置中的 <code>x-openai-actor-authorization</code> 用于让 Codex 注册内置生图工具，EasyAPI 转发前会将其移除。</p><CodeBlock value={setup.configToml} copied={copied === "toml"} onCopy={() => void copy("toml", setup.configToml)} /></>}
        {step === 2 && <><p>{setup.platform === "macos" ? "关闭窗口后代理会继续运行。点击 Dock 图标或菜单栏图标中的“显示 EasyAPI”可重新打开窗口；使用菜单中的“退出”或 ⌘Q 完全退出。" : "关闭窗口会隐藏到系统托盘，不会停止代理。需要完全关闭时使用托盘菜单中的“退出”。"}</p></>}
      </div>
      <div className="setup-actions">
        <Button variant="fill" disabled={step === 0} onClick={() => changeStep(step - 1)}>上一步</Button>
        <Button variant="primary" disabled={step === 2} onClick={() => changeStep(step + 1)}>下一步</Button>
      </div>
    </FormSection>
    <Disclosure summary="连接排查与代理绕过" description="遇到 502、无法连接或本机流量被代理时查看。">
      <div className="setup-guidance">
        <p>先查看 EasyAPI 的“请求记录”。有记录时检查上游服务和“设置 → 上游网络”；无记录时，先确认 Codex 连接的是 http://127.0.0.1:8787/v1，并让代理软件绕过 127.0.0.1 和 localhost。缺少本地 Token 通常返回 401。</p>
        {(setup.platform === "macos" || setup.platform === "windows") && <div className="setup-guidance"><p>{setup.platform === "windows" ? "在 PowerShell 中执行下方命令，再完全退出并重新打开 Codex。命令会保留现有的绕过地址，并将本机地址添加到用户级 NO_PROXY 环境变量，重启后仍然有效；从终端启动 Codex 时，请使用新的终端窗口或当前 PowerShell。" : "在终端执行下方命令，再完全退出并重新打开 Codex。这些环境变量对当前登录会话有效。"}如果代理软件使用 TUN / 透明代理模式，还需在该软件中将回环地址设为直连。</p><CodeBlock value={setup.platform === "windows" ? windowsProxyBypassCommand : macProxyBypassCommand} copied={copied === "bypass"} onCopy={() => void copy("bypass", setup.platform === "windows" ? windowsProxyBypassCommand : macProxyBypassCommand)} /></div>}
      </div>
    </Disclosure>
    <Alert tone="info" message="请求体直接流式转发" description="请求体没有应用层总大小限制，仅限制 60 秒上传空闲时间。关闭内容记录时不写入磁盘。" />
  </section>;
}

function CodeBlock({ value, copied, onCopy }: { value: string; copied: boolean; onCopy: () => void }) {
  return <div className="code-block"><Button className="code-copy" variant="quiet" size="xs" onClick={onCopy}>{copied ? "已复制" : "复制"}</Button><pre>{value}</pre></div>;
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
  const nameInput = useRef<HTMLInputElement>(null);
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
  return <Dialog open onOpenChange={onClose} size="lg" initialFocusRef={nameInput} closeOnPointerOutside={!saving} closeOnEscape={!saving}>
    <form onSubmit={submit} className="dialog-form">
      <DialogHeader><DialogHeading><DialogTitle>{provider ? "编辑 Provider" : "添加 Provider"}</DialogTitle><DialogDescription>连接一个上游服务，认证凭据保存在本机。</DialogDescription></DialogHeading><DialogClose aria-label="关闭" disabled={saving} /></DialogHeader>
      <DialogBody><div className="page-stack">
        {error && <Alert tone="error" message={error} />}
        <Field label="名称" required controlWidth="fill"><Input ref={nameInput} value={form.name} onValueChange={value => setForm({ ...form, name: value })} placeholder="例如 OpenAI" /></Field>
        <Field label="认证方式" controlWidth="fill"><Select value={form.authType} onValueChange={value => setForm({ ...form, authType: value as ProviderInput["authType"], baseUrl: value === "codex_oauth" ? "https://chatgpt.com/backend-api/codex" : form.baseUrl })} options={[{ value: "api_key", label: "API Key" }, { value: "codex_oauth", label: "ChatGPT 官方订阅 OAuth" }]} /></Field>
        <Field label="Base URL" required controlWidth="fill" description={form.authType === "codex_oauth" ? "官方 OAuth 使用 ChatGPT Codex backend。" : "填写真正上游 API 地址，代理会追加 /responses。"}><Input value={form.baseUrl} onValueChange={value => setForm({ ...form, baseUrl: value })} placeholder="https://api.example.com/v1" /></Field>
        {form.authType === "api_key" && <Field label={provider ? "替换 API Key" : "API Key"} required={!provider} description={provider ? "留空保留现有凭据。" : "保存到系统凭据库（macOS 钥匙串 / Windows 凭据管理器）。"} controlWidth="fill"><Input type="password" value={form.apiKey} onValueChange={value => setForm({ ...form, apiKey: value })} placeholder={provider ? "保持现有 Key" : "sk-..."} autoComplete="off" /></Field>}
        <Field label="测试模型" description="用于手动连接测试，可留空。" controlWidth="fill" labelAction={provider ? <Button variant="quiet" size="xs" loading={loadingModels} onClick={() => void loadModels()}>获取模型</Button> : undefined}><Input list="provider-models" value={form.testModel} onValueChange={value => setForm({ ...form, testModel: value })} placeholder="输入模型名称" /></Field>
        <datalist id="provider-models">{models.map(model => <option key={model} value={model} />)}</datalist>
        <Disclosure summary="额外请求头" description={`${form.extraHeaders.length} 项 · 可选`}>
          <div className="page-stack">
            {form.extraHeaders.map((header, index) => <div className="header-row" key={index}><Input aria-label={`请求头 ${index + 1} 名称`} value={header.name} onValueChange={value => updateHeader(index, { name: value })} placeholder="Header-Name" /><Input aria-label={`请求头 ${index + 1} 值`} value={header.value} onValueChange={value => updateHeader(index, { value })} placeholder="Value" /><IconButton aria-label="删除请求头" icon={<Icon name="xmark" size="xs" />} variant="quiet" tone="danger" onClick={() => setForm({ ...form, extraHeaders: form.extraHeaders.filter((_, i) => i !== index) })} /></div>)}
            <Button variant="quiet" size="sm" leadingIcon={<Icon name="plus" size="xs" />} onClick={() => setForm({ ...form, extraHeaders: [...form.extraHeaders, { name: "", value: "" }] })}>添加请求头</Button>
          </div>
        </Disclosure>
      </div></DialogBody>
      <DialogFooter><Button variant="fill" disabled={saving} onClick={onClose}>取消</Button><Button type="submit" variant="primary" disabled={!valid} loading={saving}>保存 Provider</Button></DialogFooter>
    </form>
  </Dialog>;
}

function PageHeader({ title, subtitle, action }: { title: string; subtitle: string; action?: React.ReactNode }) {
  return <SystemPageHeader title={title} description={subtitle} action={action} size="lg" level={1} />;
}
