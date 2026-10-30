use std::{net::IpAddr, time::Duration};

use reqwest::{Client, ClientBuilder, Proxy, Url};

use crate::models::{ProxyMode, ProxySettings, DEFAULT_CAPACITY_RETRY_COUNT};

pub const DEFAULT_CONNECT_TIMEOUT_SECONDS: u64 = 15;
pub const MIN_CONNECT_TIMEOUT_SECONDS: u64 = 1;
pub const MAX_CONNECT_TIMEOUT_SECONDS: u64 = 300;
pub const MIN_CAPACITY_RETRY_COUNT: u32 = 0;
pub const MAX_CAPACITY_RETRY_COUNT: u32 = 10;

impl Default for ProxySettings {
    fn default() -> Self {
        Self {
            upstream_connect_timeout_seconds: DEFAULT_CONNECT_TIMEOUT_SECONDS,
            proxy_mode: ProxyMode::System,
            proxy_url: String::new(),
            capacity_retry_count: DEFAULT_CAPACITY_RETRY_COUNT,
        }
    }
}

pub struct HttpClients {
    pub settings: ProxySettings,
    upstream: Client,
    direct: Client,
    pub oauth: Client,
}

impl HttpClients {
    pub fn new(mut settings: ProxySettings, listen_address: &str) -> Result<Self, String> {
        validate_settings(&mut settings, listen_address)?;
        let builder = || {
            Client::builder()
                .connect_timeout(Duration::from_secs(
                    settings.upstream_connect_timeout_seconds,
                ))
                .pool_idle_timeout(Duration::from_secs(90))
        };
        let direct = builder().no_proxy().build().map_err(|e| e.to_string())?;
        let upstream = configure_proxy(builder(), &settings)?
            .build()
            .map_err(|_| "无法创建上游网络客户端".to_string())?;
        let oauth = configure_proxy(builder(), &settings)?
            .timeout(Duration::from_secs(30))
            .build()
            .map_err(|_| "无法创建 OAuth 网络客户端".to_string())?;
        Ok(Self {
            settings,
            upstream,
            direct,
            oauth,
        })
    }

    pub fn client_for_url(&self, url: &str) -> Client {
        // Local model servers must remain reachable even when a system or
        // manual proxy intercepts HTTP traffic on this machine.
        if Url::parse(url)
            .ok()
            .is_some_and(|url| is_loopback_host(&url))
        {
            self.direct.clone()
        } else {
            self.upstream.clone()
        }
    }
}

fn configure_proxy(
    builder: ClientBuilder,
    settings: &ProxySettings,
) -> Result<ClientBuilder, String> {
    match settings.proxy_mode {
        ProxyMode::System => Ok(builder),
        ProxyMode::Direct => Ok(builder.no_proxy()),
        ProxyMode::Manual => {
            let proxy = Proxy::all(&settings.proxy_url)
                .map_err(|_| "代理地址无效".to_string())?
                .no_proxy(reqwest::NoProxy::from_string("localhost,127.0.0.0/8,::1"));
            Ok(builder.no_proxy().proxy(proxy))
        }
    }
}

fn is_loopback_host(url: &Url) -> bool {
    url.host_str().is_some_and(|host| {
        host.eq_ignore_ascii_case("localhost")
            || host.ends_with(".localhost")
            || host
                .trim_matches(['[', ']'])
                .parse::<IpAddr>()
                .is_ok_and(|ip| ip.is_loopback())
    })
}

pub fn points_to_listener(url: &str, listen_address: &str) -> bool {
    let Ok(url) = Url::parse(url) else {
        return false;
    };
    let Ok(listener) = Url::parse(&format!("http://{listen_address}")) else {
        return false;
    };
    is_loopback_host(&url) && url.port_or_known_default() == listener.port_or_known_default()
}

fn validate_settings(settings: &mut ProxySettings, listen_address: &str) -> Result<(), String> {
    if !(MIN_CONNECT_TIMEOUT_SECONDS..=MAX_CONNECT_TIMEOUT_SECONDS)
        .contains(&settings.upstream_connect_timeout_seconds)
    {
        return Err(format!(
            "连接超时必须在 {MIN_CONNECT_TIMEOUT_SECONDS} 到 {MAX_CONNECT_TIMEOUT_SECONDS} 秒之间"
        ));
    }
    if !(MIN_CAPACITY_RETRY_COUNT..=MAX_CAPACITY_RETRY_COUNT)
        .contains(&settings.capacity_retry_count)
    {
        return Err(format!(
            "容量限制重试次数必须在 {MIN_CAPACITY_RETRY_COUNT} 到 {MAX_CAPACITY_RETRY_COUNT} 次之间"
        ));
    }
    if settings.proxy_mode != ProxyMode::Manual {
        settings.proxy_url.clear();
        return Ok(());
    }
    let url = Url::parse(settings.proxy_url.trim())
        .map_err(|_| "请输入完整代理地址，例如 http://127.0.0.1:7897".to_string())?;
    if !matches!(url.scheme(), "http" | "https" | "socks5" | "socks5h") || url.host_str().is_none()
    {
        return Err("代理协议仅支持 http、https、socks5 和 socks5h".to_string());
    }
    if !url.username().is_empty() || url.password().is_some() {
        return Err("暂不支持带用户名或密码的代理地址，请使用本机免认证代理端口".to_string());
    }
    if !matches!(url.path(), "" | "/") || url.query().is_some() || url.fragment().is_some() {
        return Err("代理地址只填写协议、主机和端口，不应包含路径、查询参数或片段".to_string());
    }
    if points_to_listener(url.as_str(), listen_address) {
        return Err(
            "代理地址不能指向 EasyAPI 自己的监听端口，请填写网络代理软件的 HTTP / SOCKS 端口"
                .to_string(),
        );
    }
    settings.proxy_url = url.to_string();
    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;
    use axum::{extract::Request, routing::any, Router};
    use std::sync::{
        atomic::{AtomicUsize, Ordering},
        Arc,
    };

    #[test]
    fn rejects_invalid_proxy_endpoints_and_self_proxy_loops() {
        for proxy_url in [
            "",
            "127.0.0.1:7897",
            "ftp://127.0.0.1:7897",
            "http://user:password@127.0.0.1:7897",
            "http://localhost:7897/path",
            "http://localhost:7897?token=secret",
            "http://localhost:8787",
            "socks5h://[::1]:8787",
            "http://127.0.0.2:8787",
        ] {
            let mut settings = ProxySettings {
                proxy_mode: ProxyMode::Manual,
                proxy_url: proxy_url.to_string(),
                ..Default::default()
            };
            assert!(
                validate_settings(&mut settings, "127.0.0.1:8787").is_err(),
                "{proxy_url}"
            );
        }
    }

    #[test]
    fn validates_capacity_retry_count_range() {
        assert_eq!(ProxySettings::default().capacity_retry_count, 5);
        for capacity_retry_count in [MIN_CAPACITY_RETRY_COUNT, MAX_CAPACITY_RETRY_COUNT] {
            let mut settings = ProxySettings {
                capacity_retry_count,
                ..Default::default()
            };
            assert!(validate_settings(&mut settings, "127.0.0.1:8787").is_ok());
        }
        let mut settings = ProxySettings {
            capacity_retry_count: MAX_CAPACITY_RETRY_COUNT + 1,
            ..Default::default()
        };
        assert!(validate_settings(&mut settings, "127.0.0.1:8787").is_err());
    }

    #[test]
    fn recognizes_ipv4_ipv6_and_localhost_loopback_urls() {
        for url in [
            "http://127.0.0.1:8080",
            "http://127.0.0.2:8080",
            "http://[::1]:8080",
            "http://localhost:8080",
            "http://test.localhost:8080",
        ] {
            assert!(is_loopback_host(&Url::parse(url).unwrap()), "{url}");
        }
        assert!(!is_loopback_host(
            &Url::parse("https://api.example.com").unwrap()
        ));
        assert!(!is_loopback_host(
            &Url::parse("https://localhost.example.com").unwrap()
        ));
    }

    #[tokio::test]
    async fn manual_http_proxy_routes_api_and_oauth_but_bypasses_local_services() {
        let hits = Arc::new(AtomicUsize::new(0));
        let proxy_hits = hits.clone();
        let proxy_listener = tokio::net::TcpListener::bind("127.0.0.1:0").await.unwrap();
        let proxy_address = proxy_listener.local_addr().unwrap();
        let proxy = tokio::spawn(async move {
            axum::serve(
                proxy_listener,
                Router::new().fallback(any(move |request: Request| {
                    proxy_hits.fetch_add(1, Ordering::SeqCst);
                    async move { request.uri().to_string() }
                })),
            )
            .await
            .unwrap();
        });
        let local_listener = tokio::net::TcpListener::bind("127.0.0.1:0").await.unwrap();
        let local_url = format!(
            "http://{}/v1/responses",
            local_listener.local_addr().unwrap()
        );
        let local = tokio::spawn(async move {
            axum::serve(
                local_listener,
                Router::new().fallback(any(|| async { "local service" })),
            )
            .await
            .unwrap();
        });
        let clients = HttpClients::new(
            ProxySettings {
                proxy_mode: ProxyMode::Manual,
                proxy_url: format!("http://{proxy_address}"),
                ..Default::default()
            },
            "127.0.0.1:8787",
        )
        .unwrap();
        let remote_url = "http://api.example.invalid/v1/responses";
        let body = clients
            .client_for_url(remote_url)
            .post(remote_url)
            .send()
            .await
            .unwrap()
            .text()
            .await
            .unwrap();
        assert_eq!(body, remote_url);
        let oauth_url = "http://auth.example.invalid/oauth/token";
        let body = clients
            .oauth
            .post(oauth_url)
            .send()
            .await
            .unwrap()
            .text()
            .await
            .unwrap();
        assert_eq!(body, oauth_url);
        let body = clients
            .client_for_url(&local_url)
            .post(&local_url)
            .send()
            .await
            .unwrap()
            .text()
            .await
            .unwrap();
        assert_eq!(body, "local service");
        assert_eq!(hits.load(Ordering::SeqCst), 2);
        proxy.abort();
        local.abort();
    }

    #[tokio::test]
    async fn socks5h_resolves_remote_host_through_proxy() {
        use tokio::io::{AsyncReadExt, AsyncWriteExt};
        let listener = tokio::net::TcpListener::bind("127.0.0.1:0").await.unwrap();
        let address = listener.local_addr().unwrap();
        let server = tokio::spawn(async move {
            let (mut socket, _) = listener.accept().await.unwrap();
            let mut greeting = [0u8; 2];
            socket.read_exact(&mut greeting).await.unwrap();
            assert_eq!(greeting[0], 5);
            let mut methods = vec![0; greeting[1] as usize];
            socket.read_exact(&mut methods).await.unwrap();
            socket.write_all(&[5, 0]).await.unwrap();
            let mut connect = [0u8; 5];
            socket.read_exact(&mut connect).await.unwrap();
            assert_eq!(&connect[..4], &[5, 1, 0, 3]);
            let mut host = vec![0; connect[4] as usize];
            socket.read_exact(&mut host).await.unwrap();
            assert_eq!(host, b"upstream.example.invalid");
            let mut port = [0u8; 2];
            socket.read_exact(&mut port).await.unwrap();
            assert_eq!(u16::from_be_bytes(port), 80);
            socket
                .write_all(&[5, 0, 0, 1, 127, 0, 0, 1, 0, 80])
                .await
                .unwrap();
            let mut request = Vec::new();
            while !request.ends_with(b"\r\n\r\n") {
                request.push(socket.read_u8().await.unwrap());
            }
            socket
                .write_all(b"HTTP/1.1 200 OK\r\nContent-Length: 2\r\nConnection: close\r\n\r\nok")
                .await
                .unwrap();
        });
        let clients = HttpClients::new(
            ProxySettings {
                proxy_mode: ProxyMode::Manual,
                proxy_url: format!("socks5h://{address}"),
                upstream_connect_timeout_seconds: 2,
                ..Default::default()
            },
            "127.0.0.1:8787",
        )
        .unwrap();
        let url = "http://upstream.example.invalid/v1/models";
        let response = clients
            .client_for_url(url)
            .get(url)
            .timeout(Duration::from_secs(5))
            .send()
            .await
            .unwrap();
        assert_eq!(response.text().await.unwrap(), "ok");
        server.await.unwrap();
    }
}
