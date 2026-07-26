use std::{io, sync::Arc, time::Instant};

use async_stream::stream;
use axum::{
    body::Body,
    extract::State,
    http::{header, HeaderMap, HeaderName, Request, Response, StatusCode},
    routing::{get, post},
    Router,
};
use chrono::Utc;
use futures_util::StreamExt;
use reqwest::header::HeaderValue;
use serde_json::json;
use subtle::ConstantTimeEq;
use tokio::time::{timeout, Duration};
use tower_http::trace::TraceLayer;
use uuid::Uuid;

use crate::{models::RequestLog, state::AppState};

const UPLOAD_IDLE_TIMEOUT: Duration = Duration::from_secs(60);

pub fn router(state: Arc<AppState>) -> Router {
    Router::new()
        .route("/healthz", get(healthz))
        .route("/models", get(proxy_models))
        .route("/v1/models", get(proxy_models))
        .route("/responses", post(proxy_responses))
        .route("/v1/responses", post(proxy_responses))
        .layer(TraceLayer::new_for_http())
        .with_state(state)
}

async fn healthz(State(state): State<Arc<AppState>>) -> Response<Body> {
    json_response(
        StatusCode::OK,
        json!({
            "status": "ok",
            "active_provider": state.providers.active_id(),
            "in_flight": state.stats.status(&state.providers, &state.listen_address).in_flight_requests
        }),
    )
}

async fn proxy_models(
    State(state): State<Arc<AppState>>,
    request: Request<Body>,
) -> Response<Body> {
    if !authorized(request.headers(), &state.local_token) {
        return json_response(
            StatusCode::UNAUTHORIZED,
            json!({"error": {"message": "EasyAPI local proxy authentication failed", "type": "authentication_error"}}),
        );
    }

    let Some(provider) = state.providers.active() else {
        return json_response(
            StatusCode::SERVICE_UNAVAILABLE,
            json!({"error": {"message": "No active provider is configured in EasyAPI", "type": "easyapi_configuration_error"}}),
        );
    };

    let (parts, _) = request.into_parts();
    let mut url = provider.models_url();
    if let Some(query) = parts.uri.query() {
        url.push('?');
        url.push_str(query);
    }

    let mut builder = state.http_client.get(url).header(
        header::AUTHORIZATION,
        format!("Bearer {}", provider.api_key()),
    );
    for (name, value) in &parts.headers {
        if should_forward_request_header(name) {
            builder = builder.header(name, value);
        }
    }
    for (name, value) in &provider.headers {
        builder = builder.header(name, value);
    }

    let upstream = match builder.send().await {
        Ok(response) => response,
        Err(error) => {
            let message = sanitized_reqwest_error(&error);
            return json_response(
                StatusCode::BAD_GATEWAY,
                json!({"error": {"message": message, "type": "easyapi_upstream_error"}}),
            );
        }
    };

    let mut response_builder = Response::builder()
        .status(upstream.status())
        .header("x-easyapi-request-id", Uuid::new_v4().to_string());
    for (name, value) in upstream.headers() {
        if should_forward_response_header(name) {
            response_builder = response_builder.header(name, value);
        }
    }

    let response_stream = upstream
        .bytes_stream()
        .map(|item| item.map_err(|error| io::Error::other(sanitized_reqwest_error(&error))));
    response_builder
        .body(Body::from_stream(response_stream))
        .unwrap_or_else(|error| {
            json_response(
                StatusCode::INTERNAL_SERVER_ERROR,
                json!({"error": {"message": error.to_string(), "type": "easyapi_internal_error"}}),
            )
        })
}

async fn proxy_responses(
    State(state): State<Arc<AppState>>,
    request: Request<Body>,
) -> Response<Body> {
    let request_id = Uuid::new_v4().to_string();
    let started_at = Utc::now().to_rfc3339();
    let started = Instant::now();
    let request_bytes = request
        .headers()
        .get(header::CONTENT_LENGTH)
        .and_then(|value| value.to_str().ok())
        .and_then(|value| value.parse::<u64>().ok());

    let provider = state.providers.active();
    let mut guard = RequestGuard::new(
        state.clone(),
        request_id.clone(),
        started_at,
        started,
        provider.as_ref().map(|p| p.provider.id.clone()),
        provider.as_ref().map(|p| p.provider.name.clone()),
        request_bytes,
    );

    if !authorized(request.headers(), &state.local_token) {
        guard.fail(StatusCode::UNAUTHORIZED, "本地代理认证失败");
        return json_response(
            StatusCode::UNAUTHORIZED,
            json!({"error": {"message": "EasyAPI local proxy authentication failed", "type": "authentication_error"}}),
        );
    }

    let Some(provider) = provider else {
        guard.fail(StatusCode::SERVICE_UNAVAILABLE, "未选择 Provider");
        return json_response(
            StatusCode::SERVICE_UNAVAILABLE,
            json!({"error": {"message": "No active provider is configured in EasyAPI", "type": "easyapi_configuration_error"}}),
        );
    };

    let (parts, body) = request.into_parts();
    let mut builder = state.http_client.post(provider.responses_url()).header(
        header::AUTHORIZATION,
        format!("Bearer {}", provider.api_key()),
    );

    for (name, value) in &parts.headers {
        if should_forward_request_header(name) {
            builder = builder.header(name, value);
        }
    }
    for (name, value) in &provider.headers {
        builder = builder.header(name, value);
    }

    let mut incoming = body.into_data_stream();
    let upload_stream = stream! {
        loop {
            match timeout(UPLOAD_IDLE_TIMEOUT, incoming.next()).await {
                Ok(Some(Ok(bytes))) => yield Ok::<_, io::Error>(bytes),
                Ok(Some(Err(error))) => {
                    yield Err(io::Error::other(error));
                    break;
                }
                Ok(None) => break,
                Err(_) => {
                    yield Err(io::Error::new(io::ErrorKind::TimedOut, "request upload idle timeout"));
                    break;
                }
            }
        }
    };

    let upstream = match builder
        .body(reqwest::Body::wrap_stream(upload_stream))
        .send()
        .await
    {
        Ok(response) => response,
        Err(error) => {
            let message = sanitized_reqwest_error(&error);
            guard.fail(StatusCode::BAD_GATEWAY, &message);
            return json_response(
                StatusCode::BAD_GATEWAY,
                json!({"error": {"message": message, "type": "easyapi_upstream_error"}}),
            );
        }
    };

    let status = upstream.status();
    guard.set_status(status);
    let mut response_builder = Response::builder()
        .status(status)
        .header("x-easyapi-request-id", request_id);

    for (name, value) in upstream.headers() {
        if should_forward_response_header(name) {
            response_builder = response_builder.header(name, value);
        }
    }

    let mut upstream_stream = upstream.bytes_stream();
    let response_stream = stream! {
        let mut stream_error = None;
        while let Some(item) = upstream_stream.next().await {
            match item {
                Ok(bytes) => yield Ok::<_, io::Error>(bytes),
                Err(error) => {
                    let message = sanitized_reqwest_error(&error);
                    stream_error = Some(message.clone());
                    guard.mark_stream_error(message.clone());
                    yield Err(io::Error::other(message));
                    break;
                }
            }
        }
        if stream_error.is_none() {
            guard.complete();
        }
    };

    response_builder
        .body(Body::from_stream(response_stream))
        .unwrap_or_else(|error| {
            json_response(
                StatusCode::INTERNAL_SERVER_ERROR,
                json!({"error": {"message": error.to_string(), "type": "easyapi_internal_error"}}),
            )
        })
}

fn authorized(headers: &HeaderMap, expected: &str) -> bool {
    let Some(value) = headers.get(header::AUTHORIZATION) else {
        return false;
    };
    let Ok(value) = value.to_str() else {
        return false;
    };
    let Some(token) = value.strip_prefix("Bearer ") else {
        return false;
    };
    token.as_bytes().ct_eq(expected.as_bytes()).into()
}

fn should_forward_request_header(name: &HeaderName) -> bool {
    !matches!(
        name.as_str().to_ascii_lowercase().as_str(),
        "authorization"
            | "host"
            | "connection"
            | "proxy-connection"
            | "keep-alive"
            | "transfer-encoding"
            | "te"
            | "trailer"
            | "upgrade"
    )
}

fn should_forward_response_header(name: &HeaderName) -> bool {
    !matches!(
        name.as_str().to_ascii_lowercase().as_str(),
        "connection"
            | "proxy-connection"
            | "keep-alive"
            | "transfer-encoding"
            | "te"
            | "trailer"
            | "upgrade"
    )
}

fn json_response(status: StatusCode, value: serde_json::Value) -> Response<Body> {
    let body = serde_json::to_vec(&value).unwrap_or_else(|_| b"{}".to_vec());
    Response::builder()
        .status(status)
        .header(
            header::CONTENT_TYPE,
            HeaderValue::from_static("application/json"),
        )
        .body(Body::from(body))
        .expect("static response is valid")
}

fn sanitized_reqwest_error(error: &reqwest::Error) -> String {
    if error.is_timeout() {
        "上游请求超时".to_string()
    } else if error.is_connect() {
        "无法连接上游 API".to_string()
    } else if error.is_body() {
        "上游响应流中断".to_string()
    } else {
        "上游请求失败".to_string()
    }
}

struct RequestGuard {
    state: Arc<AppState>,
    id: String,
    provider_id: Option<String>,
    provider_name: Option<String>,
    started_at: String,
    started: Instant,
    status_code: Option<u16>,
    outcome: String,
    error: Option<String>,
    request_bytes: Option<u64>,
}

impl RequestGuard {
    fn new(
        state: Arc<AppState>,
        id: String,
        started_at: String,
        started: Instant,
        provider_id: Option<String>,
        provider_name: Option<String>,
        request_bytes: Option<u64>,
    ) -> Self {
        state.stats.begin();
        Self {
            state,
            id,
            provider_id,
            provider_name,
            started_at,
            started,
            status_code: None,
            outcome: "cancelled".to_string(),
            error: None,
            request_bytes,
        }
    }

    fn set_status(&mut self, status: StatusCode) {
        self.status_code = Some(status.as_u16());
        self.outcome = if status.is_success() {
            "client_cancelled".to_string()
        } else {
            "upstream_http_error".to_string()
        };
    }

    fn fail(&mut self, status: StatusCode, error: &str) {
        self.status_code = Some(status.as_u16());
        self.outcome = "proxy_error".to_string();
        self.error = Some(error.to_string());
    }

    fn mark_stream_error(&mut self, error: String) {
        self.outcome = "stream_error".to_string();
        self.error = Some(error);
    }

    fn complete(&mut self) {
        if self.status_code.is_some_and(|status| status < 400) {
            self.outcome = "completed".to_string();
        }
    }
}

impl Drop for RequestGuard {
    fn drop(&mut self) {
        let error = self.error.clone();
        self.state.stats.finish(error.clone());
        self.state.record_log(&RequestLog {
            id: self.id.clone(),
            provider_id: self.provider_id.clone(),
            provider_name: self.provider_name.clone(),
            started_at: self.started_at.clone(),
            duration_ms: self.started.elapsed().as_millis().min(i64::MAX as u128) as i64,
            status_code: self.status_code,
            outcome: self.outcome.clone(),
            error,
            request_bytes: self.request_bytes,
        });
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn local_auth_requires_exact_bearer_token() {
        let mut headers = HeaderMap::new();
        headers.insert(
            header::AUTHORIZATION,
            HeaderValue::from_static("Bearer secret"),
        );
        assert!(authorized(&headers, "secret"));
        assert!(!authorized(&headers, "secret2"));
    }

    #[test]
    fn filters_hop_by_hop_headers() {
        assert!(!should_forward_request_header(&header::AUTHORIZATION));
        assert!(!should_forward_request_header(&header::CONNECTION));
        assert!(should_forward_request_header(&header::CONTENT_TYPE));
        assert!(!should_forward_response_header(&header::TRANSFER_ENCODING));
    }

    #[tokio::test]
    async fn streams_request_and_response_without_json_buffering() {
        use axum::{body::Bytes, routing::post, Router};
        use http_body_util::BodyExt;
        use tempfile::tempdir;
        use tower::ServiceExt;

        async fn upstream(body: Bytes) -> Response<Body> {
            assert_eq!(
                body,
                Bytes::from_static(br#"{"model":"test","input":"hello"}"#)
            );
            let chunks = futures_util::stream::iter([
                Ok::<_, io::Error>(Bytes::from_static(b"event: response.created\ndata: {}\n\n")),
                Ok::<_, io::Error>(Bytes::from_static(
                    b"event: response.completed\ndata: {}\n\n",
                )),
            ]);
            Response::builder()
                .status(StatusCode::OK)
                .header(header::CONTENT_TYPE, "text/event-stream")
                .body(Body::from_stream(chunks))
                .unwrap()
        }

        let upstream_listener = tokio::net::TcpListener::bind("127.0.0.1:0").await.unwrap();
        let upstream_address = upstream_listener.local_addr().unwrap();
        tokio::spawn(async move {
            axum::serve(
                upstream_listener,
                Router::new().route("/v1/responses", post(upstream)),
            )
            .await
            .unwrap();
        });

        let temp = tempdir().unwrap();
        let db =
            Arc::new(crate::storage::Database::open(&temp.path().join("test.sqlite3")).unwrap());
        let state = crate::state::AppState::new(db, "127.0.0.1:8787".to_string()).unwrap();
        state
            .providers
            .set_active_for_test(crate::state::ProviderRuntime::new_for_test(
                crate::models::Provider {
                    id: "test".to_string(),
                    name: "Test".to_string(),
                    base_url: format!("http://{upstream_address}/v1"),
                    test_model: "test".to_string(),
                    extra_headers: vec![],
                    created_at: Utc::now().to_rfc3339(),
                    updated_at: Utc::now().to_rfc3339(),
                },
                "upstream-key".to_string(),
            ));

        let request = Request::builder()
            .method("POST")
            .uri("/v1/responses")
            .header(
                header::AUTHORIZATION,
                format!("Bearer {}", state.local_token),
            )
            .header(header::CONTENT_TYPE, "application/json")
            .body(Body::from(r#"{"model":"test","input":"hello"}"#))
            .unwrap();
        let response = router(state).oneshot(request).await.unwrap();
        assert_eq!(response.status(), StatusCode::OK);
        assert_eq!(
            response.headers()[header::CONTENT_TYPE],
            "text/event-stream"
        );
        let bytes = response.into_body().collect().await.unwrap().to_bytes();
        assert_eq!(
            bytes,
            Bytes::from_static(
                b"event: response.created\ndata: {}\n\nevent: response.completed\ndata: {}\n\n"
            )
        );
    }

    #[tokio::test]
    async fn forwards_model_lists_with_upstream_authentication() {
        use axum::{body::Bytes, routing::get, Router};
        use http_body_util::BodyExt;
        use tempfile::tempdir;
        use tower::ServiceExt;

        async fn upstream(request: Request<Body>) -> Response<Body> {
            assert_eq!(request.uri().query(), Some("limit=1"));
            assert_eq!(
                request.headers()[header::AUTHORIZATION],
                "Bearer upstream-key"
            );
            Response::builder()
                .status(StatusCode::OK)
                .header(header::CONTENT_TYPE, "application/json")
                .body(Body::from(
                    r#"{"object":"list","data":[{"id":"test-model"}]}"#,
                ))
                .unwrap()
        }

        let upstream_listener = tokio::net::TcpListener::bind("127.0.0.1:0").await.unwrap();
        let upstream_address = upstream_listener.local_addr().unwrap();
        tokio::spawn(async move {
            axum::serve(
                upstream_listener,
                Router::new().route("/v1/models", get(upstream)),
            )
            .await
            .unwrap();
        });

        let temp = tempdir().unwrap();
        let db =
            Arc::new(crate::storage::Database::open(&temp.path().join("models.sqlite3")).unwrap());
        let state = crate::state::AppState::new(db, "127.0.0.1:8787".to_string()).unwrap();
        state
            .providers
            .set_active_for_test(crate::state::ProviderRuntime::new_for_test(
                crate::models::Provider {
                    id: "models-test".to_string(),
                    name: "Models Test".to_string(),
                    base_url: format!("http://{upstream_address}/v1"),
                    test_model: "test".to_string(),
                    extra_headers: vec![],
                    created_at: Utc::now().to_rfc3339(),
                    updated_at: Utc::now().to_rfc3339(),
                },
                "upstream-key".to_string(),
            ));

        let request = Request::builder()
            .method("GET")
            .uri("/v1/models?limit=1")
            .header(
                header::AUTHORIZATION,
                format!("Bearer {}", state.local_token),
            )
            .body(Body::empty())
            .unwrap();
        let response = router(state).oneshot(request).await.unwrap();
        assert_eq!(response.status(), StatusCode::OK);
        assert_eq!(response.headers()[header::CONTENT_TYPE], "application/json");
        let bytes = response.into_body().collect().await.unwrap().to_bytes();
        assert_eq!(
            bytes,
            Bytes::from_static(br#"{"object":"list","data":[{"id":"test-model"}]}"#)
        );
    }

    #[tokio::test]
    async fn accepts_request_bodies_larger_than_common_buffered_extractor_limits() {
        use axum::{body::Bytes, routing::post, Router};
        use http_body_util::BodyExt;
        use tempfile::tempdir;
        use tower::ServiceExt;

        async fn upstream(body: Body) -> Response<Body> {
            let bytes = body.collect().await.unwrap().to_bytes();
            Response::builder()
                .status(StatusCode::OK)
                .header(header::CONTENT_TYPE, "text/plain")
                .body(Body::from(bytes.len().to_string()))
                .unwrap()
        }

        let upstream_listener = tokio::net::TcpListener::bind("127.0.0.1:0").await.unwrap();
        let upstream_address = upstream_listener.local_addr().unwrap();
        tokio::spawn(async move {
            axum::serve(
                upstream_listener,
                Router::new().route("/v1/responses", post(upstream)),
            )
            .await
            .unwrap();
        });

        let temp = tempdir().unwrap();
        let db =
            Arc::new(crate::storage::Database::open(&temp.path().join("large.sqlite3")).unwrap());
        let state = crate::state::AppState::new(db, "127.0.0.1:8787".to_string()).unwrap();
        state
            .providers
            .set_active_for_test(crate::state::ProviderRuntime::new_for_test(
                crate::models::Provider {
                    id: "large-test".to_string(),
                    name: "Large Test".to_string(),
                    base_url: format!("http://{upstream_address}/v1"),
                    test_model: "test".to_string(),
                    extra_headers: vec![],
                    created_at: Utc::now().to_rfc3339(),
                    updated_at: Utc::now().to_rfc3339(),
                },
                "upstream-key".to_string(),
            ));

        let chunk = Bytes::from(vec![b'x'; 64 * 1024]);
        let chunks =
            futures_util::stream::iter((0..64).map(move |_| Ok::<_, io::Error>(chunk.clone())));
        let request = Request::builder()
            .method("POST")
            .uri("/v1/responses")
            .header(
                header::AUTHORIZATION,
                format!("Bearer {}", state.local_token),
            )
            .body(Body::from_stream(chunks))
            .unwrap();
        let response = router(state).oneshot(request).await.unwrap();
        assert_eq!(response.status(), StatusCode::OK);
        let body = response.into_body().collect().await.unwrap().to_bytes();
        assert_eq!(body, Bytes::from_static(b"4194304"));
    }
}
