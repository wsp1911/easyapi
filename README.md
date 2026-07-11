# EasyAPI

EasyAPI 是一个面向 Codex Responses API 的 Windows 本地代理。Codex 始终连接固定的本地地址，用户可以在桌面界面中手动切换不同的上游 API Key，不需要反复退出 Codex、替换配置文件再启动。

## 当前功能

- `POST /v1/responses` 和 `POST /responses` 透明转发
- 请求体直接流式上传，不解析为完整 JSON，不设置应用层总大小限制
- JSON 和 SSE 响应直接流式返回
- 多 Provider 管理：名称、Base URL、API Key、测试模型、额外请求头
- 手动原子切换 Provider
- 已开始的请求继续使用原 Provider，新请求使用切换后的 Provider
- 不自动重试，不自动故障转移
- API Key 保存到 Windows Credential Manager
- Provider 元数据和脱敏请求记录保存到 SQLite
- 本地代理 Bearer Token 验证
- 系统托盘常驻；关闭窗口只会隐藏
- 手动连接测试
- Codex 配置和 PowerShell 环境变量命令生成

## 明确不做的事情

- 自动故障转移
- 自动切换 Key
- 自动重放请求
- 缓存或持久化 Prompt、源代码和响应正文
- 修改请求中的模型名称
- Chat Completions API
- Responses WebSocket

## 技术栈

- Rust、Tokio、Axum、Reqwest
- Tauri 2
- React 19、TypeScript、Vite
- SQLite（rusqlite）
- Windows Credential Manager（keyring）

## 运行

要求：

- Rust stable
- Node.js 22+
- pnpm
- Windows WebView2

安装依赖：

```powershell
pnpm install
```

开发模式：

```powershell
pnpm tauri dev
```

前端构建：

```powershell
pnpm build
```

Rust 检查和测试：

```powershell
cargo check --manifest-path .\src-tauri\Cargo.toml
cargo test --manifest-path .\src-tauri\Cargo.toml
```

完整桌面构建：

```powershell
pnpm tauri build
```

## 使用步骤

1. 启动 EasyAPI。
2. 在 Provider 页面添加上游：
   - 名称，例如 `API-A`
   - Base URL，例如 `https://api.example.com/v1`
   - API Key
   - 可选测试模型
3. 点击“切换”，激活该 Provider。
4. 打开“Codex 配置”页面。
5. 执行页面生成的 PowerShell 命令，设置 `EASYAPI_LOCAL_TOKEN` 用户环境变量。
6. 将页面生成的 Provider 配置加入用户级 `~/.codex/config.toml`。
7. 重启一次 Codex。以后切换上游不再需要重启 Codex。

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
```

模型仍由原有 Codex 配置决定，例如：

```toml
model = "your-model-name"
```

所有上游都需要接受 Codex 发送的模型名称。EasyAPI 当前不会读取或改写请求 JSON 中的 `model` 字段。

## 请求体行为

代理入口直接使用 Axum `Body`，不会使用 `Json`、`Bytes` 或 `String` extractor，因此不会触发缓冲型 extractor 的默认 Body 限制。

请求链路：

```text
Codex request body chunk
    -> EasyAPI
    -> Reqwest streaming body
    -> active upstream
```

保护措施：

- 不设置请求总大小限制
- 请求上传连续 60 秒无数据时终止
- 上游连接超时 15 秒
- 不设置整个 Responses 请求的总时长限制
- SSE 响应收到后立即转发

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
Windows Credential Manager
service = easyapi
username = provider:<provider-id>
```

应用数据位于 Tauri 应用数据目录。Windows 默认通常是：

```text
%APPDATA%\com.wsp.easyapi\easyapi.sqlite3
```

SQLite 只保存：

- Provider 名称和 Base URL
- 测试模型
- 自定义请求头
- 当前 Provider ID
- 本地代理 Token
- 请求状态、耗时、大小等脱敏元数据

不会保存：

- 上游 API Key
- Prompt
- 源代码
- Responses 请求正文
- Responses 响应正文
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

测试不会调用真实模型 API。
