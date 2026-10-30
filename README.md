# EasyAPI

EasyAPI 是一个面向 Codex Responses API 的 Windows / macOS 本地代理，macOS 安装包面向 Apple Silicon（M 系列芯片）Mac。Codex 始终连接固定的本地地址，用户可以在桌面界面中手动切换不同的上游 API Key，不需要反复退出 Codex、替换配置文件再启动。

## 当前功能

- `POST /v1/responses`、`POST /responses`、`POST /v1/responses/compact` 和 `POST /responses/compact` 透明转发
- `POST /v1/images/generations`、`POST /images/generations`、`POST /v1/images/edits` 和 `POST /images/edits` 透明转发。Codex 订阅生图走这两个接口，不经过 Responses
- `GET /v1/models` 和 `GET /models` 透明转发
- 请求体直接流式上传，不解析为完整 JSON，不设置应用层总大小限制
- JSON 和 SSE 响应直接流式返回
- 多 Provider 管理：名称、Base URL、API Key、测试模型、额外请求头；可从已保存的 Provider 拉取模型列表
- 手动原子切换 Provider
- 已开始的请求继续使用原 Provider，新请求使用切换后的 Provider
- 上游容量错误自动重试，并在请求记录中显示重试次数
- API Key 保存到系统凭据库：Windows Credential Manager / macOS Keychain（钥匙串）
- Provider 元数据和脱敏请求记录保存到 SQLite
- 运行日志按启动实例落盘并自动轮转
- 可选记录 Responses 请求和响应的原始内容，默认关闭
- 本地代理 Bearer Token 验证
- 系统托盘 / macOS 菜单栏常驻；关闭窗口只会隐藏，macOS 可通过 Dock 图标重新打开
- 手动连接测试
- Codex 官方 ChatGPT Plus/Pro 订阅 OAuth 登录，自动刷新 access token
- 官方订阅也作为 EasyAPI 内部 Provider，可在不重启 Codex 的情况下切换
- 官方订阅的 Responses 请求会流式兼容 ChatGPT Codex 后端：移除顶层 `max_output_tokens`，并强制使用 `store: false`。生图和改图请求保持原样转发
- Codex 配置和平台对应的环境变量命令生成（Windows PowerShell / macOS zsh）
- Codex 配置页提供 `env_key` 本地认证配置，以及 Windows / macOS 对应的本机地址绕过代理命令
- 上游网络可选择系统代理、直连或手动 HTTP / HTTPS / SOCKS5 代理；本机上游服务始终绕过代理

## 明确不做的事情

- 自动故障转移
- 自动切换 Key
- 非容量错误不自动重放请求
- 在未开启内容记录时缓存或持久化 Prompt、源代码和响应正文
- 修改请求中的模型名称
- Chat Completions API
- Responses WebSocket

## 技术栈

- Rust、Tokio、Axum、Reqwest
- Tauri 2
- React 19、TypeScript、Vite
- SQLite（rusqlite）
- Windows Credential Manager / macOS Keychain（keyring）

## 运行

要求：

- Rust stable
- Node.js 22+
- pnpm 10
- Windows：WebView2、Visual Studio C++ Build Tools
- macOS 11 或更新版本：Xcode Command Line Tools（`xcode-select --install`）；使用系统内置 WKWebView，无需 WebView2

安装依赖：

```sh
pnpm install
```

开发模式：

```sh
pnpm tauri dev
```

前端构建：

```sh
pnpm build
```

Rust 检查和测试：

```sh
cargo check --manifest-path src-tauri/Cargo.toml --locked
cargo test --manifest-path src-tauri/Cargo.toml --locked
```

集成测试使用 `127.0.0.1` 上的模拟上游；EasyAPI 访问回环地址时始终直连，不受系统代理影响。

完整桌面构建：

```sh
pnpm tauri build
```

在 Apple Silicon Mac 上构建会生成 ARM64 架构的 `.app` 和 `.dmg`，位于 `src-tauri/target/release/bundle/`。CI 检查 Windows 和 Apple Silicon Mac；nightly 构建会在同一个 Release 中提供 Windows EXE/MSI 安装包及 Apple Silicon DMG（`aarch64`）。不构建 Intel Mac 安装包。

当前 macOS 安装包尚未配置 Developer ID 签名和 Apple 公证。下载后先将 `EasyAPI.app` 拖入“应用程序”；如果首次打开被 Gatekeeper 拦截，在确认下载来源后，可在“系统设置 → 隐私与安全性”中选择“仍要打开”。首次保存或读取 API Key 时，系统可能要求允许 EasyAPI 访问登录钥匙串。

## 使用步骤

1. 启动 EasyAPI。
2. 在 Provider 页面添加上游：
   - 名称，例如 `API-A`
   - Base URL，例如 `https://api.example.com/v1`
   - API Key
   - 可选测试模型
   - 官方 ChatGPT Plus/Pro 订阅可选择“ChatGPT 官方订阅 OAuth”，然后完成浏览器设备码登录
3. 点击“切换”，激活该 Provider。
4. 打开“Codex 配置”页面。
5. 执行页面按系统生成的命令，设置 `EASYAPI_LOCAL_TOKEN`：Windows 使用 PowerShell，macOS 使用终端中的 zsh。
6. 将页面生成的 Provider 配置加入用户级 `~/.codex/config.toml`。
7. 重启一次 Codex。以后切换上游不再需要重启 Codex。

官方 OAuth 的凭据由 EasyAPI 单独保存并在请求时刷新；Codex 始终只看到 `easyapi` 这一个本地 Provider，因此切换到或离开官方订阅不会改变 Codex 的会话列表归属。

macOS 的配置命令会将 `export EASYAPI_LOCAL_TOKEN=…` 写入 `${ZDOTDIR:-$HOME}/.zshrc`，使以后从 zsh 终端启动的 Codex 自动继承 Token；重复执行同一命令不会重复添加配置。命令还会通过 `launchctl setenv` 设置当前登录会话的桌面应用环境变量。执行后需完全退出 Codex（⌘Q）再打开。

`launchctl setenv` 在注销或重启后会失效：从 Dock / Finder 启动 Codex 前，需重新执行页面中的命令。使用 bash、fish 等其他 Shell 时，需要自行把 Token 的导出配置加入对应启动文件。

macOS 关闭 EasyAPI 窗口后，代理仍会继续运行。点击 Dock 图标或菜单栏图标中的“显示 EasyAPI”可恢复窗口；菜单中的“退出”或 ⌘Q 会停止代理并退出应用。

示例配置：

```toml
model_provider = "easyapi"

[model_providers.easyapi]
name = "EasyAPI Local Proxy"
base_url = "http://127.0.0.1:8787/v1"
env_key = "EASYAPI_LOCAL_TOKEN"
wire_api = "responses"
supports_websockets = false
request_max_retries = 0
stream_max_retries = 0
stream_idle_timeout_ms = 300000
requires_openai_auth = false
http_headers = { "x-openai-actor-authorization" = "easyapi" }
```

`x-openai-actor-authorization` 用于让 Codex 注册内置生图工具。EasyAPI 仅在本地配置中使用该标记，转发给上游前会将其移除；修改配置后请完全退出 Codex，再新建会话。

模型仍由原有 Codex 配置决定，例如：

```toml
model = "your-model-name"
```

所有上游都需要接受 Codex 发送的模型名称。EasyAPI 当前不会读取或改写请求 JSON 中的 `model` 字段。

## 上游网络和 502 排查

在“设置 → 上游网络”中选择：

- **跟随系统代理**：默认行为，读取系统代理或 EasyAPI 进程的代理环境变量。修改系统代理后重新保存设置或重启 EasyAPI。
- **直连**：忽略系统和环境变量中的代理，直接连接上游 API。
- **手动指定代理**：填写代理软件的地址，例如 `http://127.0.0.1:7897` 或 `socks5h://127.0.0.1:7897`。支持 `http`、`https`、`socks5` 和 `socks5h`；`socks5h` 由代理解析远程域名。当前使用本机免认证代理端口，不支持带用户名或密码的地址。

网络设置会持久保存，并应用到后续 API 请求、模型列表、连接测试、生图、改图和 OAuth 登录 / Token 刷新；已开始的请求继续使用原客户端。上游连接超时仍只限制建立连接阶段，OAuth 请求另有 30 秒总超时。

三个地址的用途不同：

| 配置位置 | 示例 | 用途 |
| --- | --- | --- |
| Codex 的 `base_url` | `http://127.0.0.1:8787/v1` | Codex 连接 EasyAPI |
| EasyAPI Provider 的 Base URL | `http://127.0.0.1:3000/v1` 或远程 API 地址 | EasyAPI 连接真正的上游模型服务 |
| EasyAPI 的手动代理地址 | `http://127.0.0.1:7897` | EasyAPI 通过网络代理访问远程上游 |

Provider 和手动代理地址都不能指向 EasyAPI 自己的 8787 端口，以免请求回环。无论选择哪种代理方式，EasyAPI 访问 `127.0.0.0/8`、`localhost`、`*.localhost`、`::1` 等回环地址的上游服务时始终直连。

遇到 Codex 报 502 时：

1. 查看 EasyAPI“请求记录”。如果对应请求有记录，检查上游服务是否运行、Base URL 是否正确，以及网络代理的地址和协议是否匹配。
2. 如果没有记录，先确认 EasyAPI 正在运行，并让 Codex 所使用的代理软件绕过 `127.0.0.1`、`localhost` 和 `::1`。EasyAPI 的上游网络设置不能改变 Codex 自己的网络路由。
3. 在终端执行 `curl --noproxy '*' http://127.0.0.1:8787/healthz`；Windows 可使用 `curl.exe`。正常情况下应返回 `status: ok` 的 JSON。
4. 本地 Token 缺失或错误通常返回 401；Provider 地址指向 EasyAPI 自身会返回明确的配置错误。

Windows 上可以在 PowerShell 中执行以下命令，然后完全退出并重新打开 Codex。命令会保留现有绕过地址，将本机地址写入用户级 `NO_PROXY`，并立即应用到当前 PowerShell；重启后仍然有效。从终端启动 Codex 时，请使用新的终端窗口或当前 PowerShell。

```powershell
$easyapiNoProxy = @(
  $env:NO_PROXY
  [Environment]::GetEnvironmentVariable('NO_PROXY', 'User')
  [Environment]::GetEnvironmentVariable('NO_PROXY', 'Machine')
  '127.0.0.1,localhost,::1'
) -join ','
$easyapiNoProxy = ($easyapiNoProxy -split ',' | ForEach-Object { $_.Trim() } | Where-Object { $_ } | Select-Object -Unique) -join ','
[Environment]::SetEnvironmentVariable('NO_PROXY', $easyapiNoProxy, 'User')
$env:NO_PROXY = $easyapiNoProxy
```

macOS 上如果 Codex 的本机请求被代理截获，可以在终端执行以下命令，然后完全退出并重新打开 Codex：

```sh
export NO_PROXY="${NO_PROXY:+$NO_PROXY,}127.0.0.1,localhost,::1"
export no_proxy="$NO_PROXY"
launchctl setenv NO_PROXY "$NO_PROXY"
launchctl setenv no_proxy "$NO_PROXY"
```

这些桌面应用环境变量对当前登录会话有效；TUN / 透明代理仍需在代理软件中配置回环地址直连规则。

## 请求体行为

代理入口直接使用 Axum `Body`，不会使用 `Json`、`Bytes` 或 `String` extractor，因此不会触发缓冲型 extractor 的默认 Body 限制。

请求链路：

```text
Codex request body chunk
    -> EasyAPI
    -> Codex OAuth 请求按顶层字段流式规范化（普通 Provider 原样透传）
    -> Reqwest streaming body
    -> active upstream
```

保护措施：

- 不设置请求总大小限制
- 请求上传连续 60 秒无数据时终止
- 上游连接超时 15 秒
- 不设置整个 Responses 请求的总时长限制
- SSE 响应收到后立即转发
- 开启内容记录后，请求和响应会在转发时原样写入本地文件，不会在内存中累积完整内容

## 手动切换语义

Provider 在请求进入代理时快照：

```text
10:00:00 请求 A 开始，快照为 Provider-1
10:00:05 用户切换到 Provider-2
10:00:06 请求 B 开始，快照为 Provider-2
10:01:00 请求 A 完成，始终使用 Provider-1
```

EasyAPI 不会把进行中的请求迁移到新 Provider，也不会在上游出错时自动重新发送。

## Header 行为

EasyAPI 会移除本地请求中的 `Authorization`，并替换为当前 Provider 的 API Key。

以下 hop-by-hop 或连接相关 Header 不会转发：

```text
Host
Connection
Proxy-Connection
Keep-Alive
Transfer-Encoding
TE
Trailer
Upgrade
```

Provider 自定义请求头不允许覆盖：

```text
Authorization
Host
Content-Length
上述 hop-by-hop Header
```

## 数据和安全

默认监听：

```text
127.0.0.1:8787
```

不会监听局域网地址。

上游 API Key：

```text
Windows: Credential Manager
macOS: Keychain（登录钥匙串）
service = easyapi
username = provider:<provider-id>
```

应用数据位于 Tauri 应用数据目录。Windows 默认通常是：

```text
%APPDATA%\com.wsp.easyapi\easyapi.sqlite3
```

运行日志位于同目录的 `logs` 文件夹：

```text
%APPDATA%\com.wsp.easyapi\logs\easyapi-YYYYMMDD-HHMMSS-PID.log
```

macOS 使用以下目录：

```text
~/Library/Application Support/com.wsp.easyapi/easyapi.sqlite3
~/Library/Application Support/com.wsp.easyapi/logs/easyapi-YYYYMMDD-HHMMSS-PID.log
```

每次启动创建一个新的日志文件；单个文件达到 10 MiB 后轮转，最多保留两个轮转文件（`.1`、`.2`）。启动日志组最多保留最近 10 组，旧组会在新启动时自动删除。对于 Responses 请求，日志会记录请求 ID、Provider、上游地址、请求大小、HTTP 状态与版本、关键响应头、响应字节数、数据块数量与间隔、最后一个 SSE 事件及上游错误分类，便于定位长流中断。日志不会记录 API Key、Authorization Header 或请求正文。

SQLite 只保存：

- Provider 名称和 Base URL
- 测试模型
- 自定义请求头
- 当前 Provider ID
- 本地代理 Token
- 请求状态、耗时、大小、自动重试次数等脱敏元数据

ChatGPT OAuth 的 access/refresh token 保存在应用数据目录的 `codex_oauth.json`，不写入 SQLite，也不会写入 Codex 的 `~/.codex/auth.json`。

开启“记录内容”后，应用还会保存：

- Responses 请求和响应的原始字节内容
- 内容类型、已保存字节数和传输是否完整

内容文件位于 SQLite 数据库同级的 `captures` 目录。内容记录默认关闭；启用后不会设置大小或数量上限，直到你在请求记录页手动清空。

无论是否开启内容记录，都不会保存：

- 上游 API Key
- Authorization Header

## 主要目录

```text
src/
  App.tsx             React 主界面
  App.css             界面样式
  api.ts              Tauri 命令封装

src-tauri/src/
  lib.rs              Tauri 生命周期、代理启动、托盘
  commands.rs         Provider、测试、配置等 Tauri 命令
  models.rs           前后端数据结构
  state.rs            Provider 快照、运行状态、凭据库
  proxy/mod.rs        Responses 流式代理
  storage/database.rs SQLite 数据层
```

## 测试覆盖

当前 Rust 测试包括：

- 本地 Bearer Token 精确验证
- hop-by-hop Header 过滤
- Provider Base URL 规范化
- 禁止覆盖 Authorization
- 使用模拟上游验证请求和 SSE 响应流式转发
- Windows / macOS 使用正确的原生凭据库后端
- 平台配置命令生成；在 macOS 上验证 zsh 命令可重复执行、保留原有配置并正确转义 Token
- HTTP 代理和 SOCKS5 远端 DNS 的实际请求转发、本机上游绕过代理、网络设置持久化和旧超时配置迁移
- 检测并拒绝 Provider 指向 EasyAPI 自身的请求回环

测试不会调用真实模型 API。
