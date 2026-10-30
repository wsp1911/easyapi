use std::{
    io,
    pin::Pin,
    sync::{Arc, Mutex},
    time::Instant,
};

use async_stream::stream;
use axum::{
    body::{Body, Bytes},
    extract::State,
    http::{header, HeaderMap, HeaderName, Request, Response, StatusCode},
    routing::{get, post},
    Router,
};
use chrono::Utc;
use futures_util::{Stream, StreamExt};
use reqwest::header::HeaderValue;
use serde_json::json;
use subtle::ConstantTimeEq;
use tokio::time::{timeout, Duration};
use tower_http::trace::TraceLayer;
use uuid::Uuid;

use crate::{models::RequestLog, state::AppState, storage::ContentCapture};

const UPLOAD_IDLE_TIMEOUT: Duration = Duration::from_secs(60);
const CAPACITY_RETRY_DELAYS: [Duration; 5] = [
    Duration::from_secs(1),
    Duration::from_secs(2),
    Duration::from_secs(4),
    Duration::from_secs(8),
    Duration::from_secs(16),
];

pub fn router(state: Arc<AppState>) -> Router {
    Router::new()
        .route("/healthz", get(healthz))
        .route("/models", get(proxy_models))
        .route("/v1/models", get(proxy_models))
        .route("/responses", post(proxy_responses))
        .route("/v1/responses", post(proxy_responses))
        .route("/responses/compact", post(proxy_responses_compact))
        .route("/v1/responses/compact", post(proxy_responses_compact))
        .route("/images/generations", post(proxy_images_generations))
        .route("/v1/images/generations", post(proxy_images_generations))
        .route("/images/edits", post(proxy_images_edits))
        .route("/v1/images/edits", post(proxy_images_edits))
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
    if crate::network::points_to_listener(&url, &state.listen_address) {
        return json_response(
            StatusCode::SERVICE_UNAVAILABLE,
            json!({"error": {"message": "Provider 的 Base URL 指向 EasyAPI 自己，请修改为真正上游 API 服务的地址", "type": "easyapi_configuration_error"}}),
        );
    }
    if let Some(query) = parts.uri.query() {
        url.push('?');
        url.push_str(query);
    }

    let (token, account_id) = match upstream_token(&state, &provider).await {
        Ok(value) => value,
        Err(error) => {
            return json_response(
                StatusCode::UNAUTHORIZED,
                json!({"error": {"message": error, "type": "authentication_error"}}),
            )
        }
    };
    let mut builder = state
        .http_client(&url)
        .get(url)
        .header(header::AUTHORIZATION, format!("Bearer {token}"));
    for (name, value) in &parts.headers {
        if should_forward_request_header(name) {
            builder = builder.header(name, value);
        }
    }
    for (name, value) in &provider.headers {
        builder = builder.header(name, value);
    }
    if let Some(account_id) = account_id {
        builder = builder
            .header("chatgpt-account-id", account_id)
            .header("originator", crate::codex_oauth::CODEX_OAUTH_ORIGINATOR)
            .header("version", crate::codex_oauth::CODEX_OAUTH_CLIENT_VERSION);
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
    proxy_post_endpoint(state, request, PostRoute::Responses).await
}

async fn proxy_responses_compact(
    State(state): State<Arc<AppState>>,
    request: Request<Body>,
) -> Response<Body> {
    proxy_post_endpoint(state, request, PostRoute::ResponsesCompact).await
}

async fn proxy_images_generations(
    State(state): State<Arc<AppState>>,
    request: Request<Body>,
) -> Response<Body> {
    proxy_post_endpoint(state, request, PostRoute::ImagesGenerations).await
}

async fn proxy_images_edits(
    State(state): State<Arc<AppState>>,
    request: Request<Body>,
) -> Response<Body> {
    proxy_post_endpoint(state, request, PostRoute::ImagesEdits).await
}

#[derive(Clone, Copy)]
enum PostRoute {
    Responses,
    ResponsesCompact,
    ImagesGenerations,
    ImagesEdits,
}

impl PostRoute {
    fn name(self) -> &'static str {
        match self {
            Self::Responses => "responses",
            Self::ResponsesCompact => "responses/compact",
            Self::ImagesGenerations => "images/generations",
            Self::ImagesEdits => "images/edits",
        }
    }

    fn upstream_url(self, provider: &crate::state::ProviderRuntime) -> String {
        match self {
            Self::Responses => provider.responses_url(),
            Self::ResponsesCompact => provider.responses_compact_url(),
            Self::ImagesGenerations => provider.images_generations_url(),
            Self::ImagesEdits => provider.images_edits_url(),
        }
    }

    fn normalize_codex_request(self, provider: &crate::state::ProviderRuntime) -> bool {
        matches!(self, Self::Responses) && provider.uses_codex_oauth()
    }
}

async fn proxy_post_endpoint(
    state: Arc<AppState>,
    request: Request<Body>,
    route: PostRoute,
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

    let mut upstream_url = route.upstream_url(&provider);
    if crate::network::points_to_listener(&upstream_url, &state.listen_address) {
        let message = "Provider 的 Base URL 指向 EasyAPI 自己，请修改为真正上游 API 服务的地址";
        guard.fail(StatusCode::SERVICE_UNAVAILABLE, message);
        return json_response(
            StatusCode::SERVICE_UNAVAILABLE,
            json!({"error": {"message": message, "type": "easyapi_configuration_error"}}),
        );
    }
    if let Some(query) = request.uri().query() {
        upstream_url.push('?');
        upstream_url.push_str(query);
    }
    let normalize_codex_request = route.normalize_codex_request(&provider);
    tracing::info!(
        request_id = %request_id,
        provider_id = %provider.provider.id,
        provider = %provider.provider.name,
        route = route.name(),
        endpoint = %upstream_url,
        normalize_codex_request,
        request_content_length = ?request_bytes,
        "upstream request started"
    );

    let (parts, body) = request.into_parts();
    if state.content_capture_enabled() {
        let request_content_type = parts
            .headers
            .get(header::CONTENT_TYPE)
            .and_then(|value| value.to_str().ok())
            .map(str::to_string);
        match state.start_content_capture(&request_id, request_content_type) {
            Ok(capture) => guard.set_content_capture(capture),
            Err(error) => {
                tracing::warn!(%error, request_id, "failed to start request content capture")
            }
        }
    }
    let (token, account_id) = match upstream_token(&state, &provider).await {
        Ok(value) => value,
        Err(error) => {
            guard.fail(StatusCode::UNAUTHORIZED, &error);
            return json_response(
                StatusCode::UNAUTHORIZED,
                json!({"error": {"message": error, "type": "authentication_error"}}),
            );
        }
    };
    let client = state.http_client(&upstream_url);
    let request_headers = parts.headers;
    let mut builder = build_responses_request(
        &client,
        &upstream_url,
        &token,
        &request_headers,
        &provider.headers,
        account_id.as_deref(),
        normalize_codex_request,
    );

    let mut incoming = body.into_data_stream();
    let model_extractor = Arc::new(Mutex::new(RequestModelExtractor::default()));
    let model_extractor_for_stream = model_extractor.clone();
    let replay_chunks = Arc::new(Mutex::new(Vec::<Bytes>::new()));
    let replay_chunks_for_stream = replay_chunks.clone();
    let request_upload_complete = Arc::new(std::sync::atomic::AtomicBool::new(false));
    let request_upload_complete_for_stream = request_upload_complete.clone();
    let request_capture = guard.content_capture();
    let upload_stream = stream! {
        let mut codex_normalizer = normalize_codex_request.then(CodexRequestNormalizer::default);
        loop {
            match timeout(UPLOAD_IDLE_TIMEOUT, incoming.next()).await {
                Ok(Some(Ok(bytes))) => {
                    if let Ok(mut extractor) = model_extractor_for_stream.lock() {
                        extractor.observe(&bytes);
                    }
                    if let Some(capture) = &request_capture {
                        capture.write_request(&bytes);
                    }
                    if let Some(normalizer) = &mut codex_normalizer {
                        let normalized = normalizer.observe(&bytes);
                        if !normalized.is_empty() {
                            let normalized = Bytes::from(normalized);
                            if let Ok(mut chunks) = replay_chunks_for_stream.lock() {
                                chunks.push(normalized.clone());
                            }
                            yield Ok::<_, io::Error>(normalized);
                        }
                    } else {
                        if let Ok(mut chunks) = replay_chunks_for_stream.lock() {
                            chunks.push(bytes.clone());
                        }
                        yield Ok::<_, io::Error>(bytes);
                    }
                }
                Ok(Some(Err(error))) => {
                    yield Err(io::Error::other(error));
                    break;
                }
                Ok(None) => {
                    if let Some(capture) = &request_capture {
                        capture.mark_request_complete();
                    }
                    request_upload_complete_for_stream.store(true, std::sync::atomic::Ordering::Release);
                    break;
                }
                Err(_) => {
                    yield Err(io::Error::new(io::ErrorKind::TimedOut, "request upload idle timeout"));
                    break;
                }
            }
        }
    };

    let mut upstream_result = builder
        .body(reqwest::Body::wrap_stream(upload_stream))
        .send()
        .await;
    let mut retry_count = 0;
    loop {
        let response = match upstream_result {
            Ok(response) => response,
            Err(_) => break,
        };
        if response.status() != StatusCode::SERVICE_UNAVAILABLE {
            upstream_result = Ok(response);
            break;
        }
        let response_status = response.status();
        let response_headers = response.headers().clone();
        let response_body = match response.bytes().await {
            Ok(bytes) => bytes,
            Err(error) => {
                let message = sanitized_reqwest_error(&error);
                guard.fail(StatusCode::BAD_GATEWAY, &message);
                return json_response(
                    StatusCode::BAD_GATEWAY,
                    json!({"error": {"message": message, "type": "easyapi_upstream_error"}}),
                );
            }
        };
        let is_capacity_error = is_server_overloaded_error(&response_body);
        let request_can_be_replayed =
            request_upload_complete.load(std::sync::atomic::Ordering::Acquire);
        if retry_count >= CAPACITY_RETRY_DELAYS.len()
            || !request_can_be_replayed
            || !is_capacity_error
        {
            guard.set_status(response_status);
            let message = if is_capacity_error {
                "上游模型容量暂不可用，自动重试次数已用尽"
            } else {
                "上游返回 HTTP 503"
            };
            guard.fail(response_status, message);
            let capture = guard.content_capture();
            if let Some(capture) = capture {
                capture.set_response_content_type(
                    response_headers
                        .get(header::CONTENT_TYPE)
                        .and_then(|value| value.to_str().ok())
                        .map(str::to_string),
                );
                capture.write_response(&response_body);
                capture.mark_response_complete();
            }
            let mut response_builder = Response::builder()
                .status(response_status)
                .header("x-easyapi-request-id", &request_id);
            for (name, value) in &response_headers {
                if should_forward_response_header(name) {
                    response_builder = response_builder.header(name, value);
                }
            }
            return response_builder.body(Body::from(response_body)).unwrap_or_else(|error| {
                json_response(
                    StatusCode::INTERNAL_SERVER_ERROR,
                    json!({"error": {"message": error.to_string(), "type": "easyapi_internal_error"}}),
                )
            });
        }
        let delay = response_headers
            .get(header::RETRY_AFTER)
            .and_then(|value| value.to_str().ok())
            .and_then(|value| value.parse::<u64>().ok())
            .map(|seconds| Duration::from_secs(seconds.min(30)))
            .unwrap_or(CAPACITY_RETRY_DELAYS[retry_count]);
        retry_count += 1;
        guard.record_retry();
        tracing::warn!(request_id = %request_id, retry = retry_count, delay_ms = delay.as_millis(), "upstream model capacity reached; retrying request");
        tokio::time::sleep(delay).await;
        let chunks = replay_chunks
            .lock()
            .map(|chunks| chunks.clone())
            .unwrap_or_default();
        builder = build_responses_request(
            &client,
            &upstream_url,
            &token,
            &request_headers,
            &provider.headers,
            account_id.as_deref(),
            normalize_codex_request,
        );
        upstream_result = builder
            .body(reqwest::Body::wrap_stream(futures_util::stream::iter(
                chunks.into_iter().map(Ok::<_, io::Error>),
            )))
            .send()
            .await;
    }
    let model = model_extractor
        .lock()
        .ok()
        .map(|mut extractor| std::mem::take(&mut *extractor).finish())
        .flatten();
    guard.set_model(model);
    let upstream = match upstream_result {
        Ok(response) => response,
        Err(error) => {
            let message = sanitized_reqwest_error(&error);
            tracing::warn!(
                request_id = %request_id,
                error = %message,
                reqwest_error = %error,
                request_duration_ms = started.elapsed().as_millis(),
                "upstream request failed before response"
            );
            guard.fail(StatusCode::BAD_GATEWAY, &message);
            return json_response(
                StatusCode::BAD_GATEWAY,
                json!({"error": {"message": message, "type": "easyapi_upstream_error"}}),
            );
        }
    };

    // Buffer SSE metadata until the first actual output event. If the stream fails
    // with an overload event before output begins, retry without leaking a partial
    // response (and confusing the client with duplicate response IDs/events).
    let mut prefetched_chunks = Vec::<Bytes>::new();
    let mut sse_retry_count = 0;
    let mut upstream = Some(upstream);
    let (final_status, final_headers, remaining_stream) = loop {
        let response = upstream
            .take()
            .expect("response is available before stream handling");
        let response_status = response.status();
        let response_headers = response.headers().clone();
        let content_type = response
            .headers()
            .get(header::CONTENT_TYPE)
            .and_then(|value| value.to_str().ok())
            .map(str::to_ascii_lowercase);
        let is_sse = content_type
            .as_deref()
            .is_some_and(|value| value.contains("text/event-stream"));
        let may_be_sse = is_sse || content_type.is_none();
        let mut stream: Pin<Box<dyn Stream<Item = Result<Bytes, reqwest::Error>> + Send>> =
            Box::pin(response.bytes_stream());
        if !may_be_sse {
            break (response_status, response_headers, stream);
        }
        let mut scanner = CapacitySseScanner::default();
        let mut should_retry = false;
        let mut detected_sse = is_sse;
        while let Some(item) = stream.next().await {
            match item {
                Ok(bytes) => {
                    if !detected_sse {
                        let mut probe = prefetched_chunks
                            .iter()
                            .flat_map(|chunk| chunk.iter().copied())
                            .take(32)
                            .collect::<Vec<_>>();
                        probe.extend(
                            bytes
                                .iter()
                                .copied()
                                .take(32usize.saturating_sub(probe.len())),
                        );
                        detected_sse = is_sse_prefix(&probe);
                        if !detected_sse {
                            prefetched_chunks.push(bytes);
                            if probe
                                .first()
                                .is_some_and(|byte| *byte != b'e' && *byte != b'd')
                                || probe.len() >= 8
                            {
                                break;
                            }
                            continue;
                        }
                        tracing::warn!(request_id = %request_id, status = response_status.as_u16(), content_type = ?content_type, "upstream response appears to be SSE despite missing content-type");
                    }
                    scanner.observe(&bytes);
                    prefetched_chunks.push(bytes);
                    if scanner.capacity_failed {
                        should_retry = true;
                        break;
                    }
                    if scanner.output_started || scanner.completed {
                        break;
                    }
                }
                Err(_) => break,
            }
        }
        if should_retry
            && sse_retry_count < CAPACITY_RETRY_DELAYS.len()
            && request_upload_complete.load(std::sync::atomic::Ordering::Acquire)
        {
            let delay = CAPACITY_RETRY_DELAYS[sse_retry_count];
            sse_retry_count += 1;
            guard.record_retry();
            tracing::warn!(request_id = %request_id, retry = sse_retry_count, delay_ms = delay.as_millis(), "SSE response reported model capacity; retrying request");
            tokio::time::sleep(delay).await;
            let chunks = replay_chunks
                .lock()
                .map(|chunks| chunks.clone())
                .unwrap_or_default();
            builder = build_responses_request(
                &client,
                &upstream_url,
                &token,
                &request_headers,
                &provider.headers,
                account_id.as_deref(),
                normalize_codex_request,
            );
            upstream = Some(
                match builder
                    .body(reqwest::Body::wrap_stream(futures_util::stream::iter(
                        chunks.into_iter().map(Ok::<_, io::Error>),
                    )))
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
                },
            );
            prefetched_chunks.clear();
            continue;
        }
        if scanner.capacity_failed {
            tracing::error!(request_id = %request_id, status = response_status.as_u16(), retry_count = sse_retry_count, request_upload_complete = request_upload_complete.load(std::sync::atomic::Ordering::Acquire), output_started = scanner.output_started, "upstream SSE reported server_is_overloaded but request cannot be retried");
        }
        break (response_status, response_headers, stream);
    };

    let status = final_status;
    tracing::info!(
        request_id = %request_id,
        status = status.as_u16(),
        content_type = ?header_value(&final_headers, &header::CONTENT_TYPE),
        content_length = ?header_value(&final_headers, &header::CONTENT_LENGTH),
        content_encoding = ?header_value(&final_headers, &header::CONTENT_ENCODING),
        transfer_encoding = ?header_value(&final_headers, &header::TRANSFER_ENCODING),
        upstream_request_id = ?header_value(&final_headers, &HeaderName::from_static("x-request-id")),
        upstream_header_request_id = ?header_value(&final_headers, &HeaderName::from_static("request-id")),
        processing_ms = ?header_value(&final_headers, &HeaderName::from_static("openai-processing-ms")),
        server = ?header_value(&final_headers, &header::SERVER),
        via = ?header_value(&final_headers, &header::VIA),
        cf_ray = ?header_value(&final_headers, &HeaderName::from_static("cf-ray")),
        "upstream response headers received"
    );
    guard.set_status(status);
    let response_capture = guard.content_capture();
    if let Some(capture) = &response_capture {
        let response_content_type = final_headers
            .get(header::CONTENT_TYPE)
            .and_then(|value| value.to_str().ok())
            .map(str::to_string);
        capture.set_response_content_type(response_content_type);
    }
    let mut response_builder = Response::builder()
        .status(status)
        .header("x-easyapi-request-id", &request_id);

    for (name, value) in &final_headers {
        if should_forward_response_header(name) {
            response_builder = response_builder.header(name, value);
        }
    }

    let mut upstream_stream = futures_util::stream::iter(
        prefetched_chunks
            .into_iter()
            .map(Ok::<Bytes, reqwest::Error>),
    )
    .chain(remaining_stream);
    let response_stream = stream! {
        let mut stream_error = None;
        let mut usage = TokenUsageExtractor::default();
        let mut diagnostics = ResponseStreamDiagnostics::default();
        let response_started = Instant::now();
        while let Some(item) = upstream_stream.next().await {
            match item {
                Ok(bytes) => {
                    diagnostics.observe(&bytes);
                    if diagnostics.last_event.as_deref() == Some("response.completed") {
                        guard.mark_response_completed();
                    }
                    usage.observe(&bytes);
                    if let Some(terminal_usage) = usage.terminal_usage() {
                        guard.set_usage(terminal_usage);
                    }
                    if let Some(capture) = &response_capture {
                        capture.write_response(&bytes);
                    }
                    yield Ok::<_, io::Error>(bytes);
                }
                Err(error) => {
                    let message = sanitized_reqwest_error(&error);
                    stream_error = Some(message.clone());
                    tracing::warn!(
                        request_id = %request_id,
                        error = %message,
                        reqwest_error = %error,
                        error_is_body = error.is_body(),
                        error_is_decode = error.is_decode(),
                        error_is_timeout = error.is_timeout(),
                        error_is_connect = error.is_connect(),
                        error_is_request = error.is_request(),
                        error_is_status = error.is_status(),
                        error_url = ?error.url().map(|url| url.as_str()),
                        response_bytes = diagnostics.total_bytes,
                        response_elapsed_ms = response_started.elapsed().as_millis(),
                        chunk_count = diagnostics.chunk_count,
                        last_chunk_bytes = diagnostics.last_chunk_bytes,
                        last_chunk_gap_ms = ?diagnostics.last_chunk_gap_ms,
                        max_chunk_gap_ms = diagnostics.max_chunk_gap_ms,
                        time_since_last_chunk_ms = ?diagnostics.time_since_last_chunk_ms(),
                        pending_sse_line_bytes = diagnostics.line_buffer.len(),
                        event_count = diagnostics.event_count,
                        last_event = ?diagnostics.last_event,
                        last_sequence_number = ?diagnostics.last_sequence_number,
                        "upstream response stream failed"
                    );
                    guard.mark_stream_error(message.clone());
                    yield Err(io::Error::other(message));
                    break;
                }
            }
        }
        guard.set_usage(usage.finish());
        if stream_error.is_none() {
            tracing::info!(
                request_id = %request_id,
                response_bytes = diagnostics.total_bytes,
                response_elapsed_ms = response_started.elapsed().as_millis(),
                chunk_count = diagnostics.chunk_count,
                last_chunk_bytes = diagnostics.last_chunk_bytes,
                last_chunk_gap_ms = ?diagnostics.last_chunk_gap_ms,
                max_chunk_gap_ms = diagnostics.max_chunk_gap_ms,
                pending_sse_line_bytes = diagnostics.line_buffer.len(),
                event_count = diagnostics.event_count,
                last_event = ?diagnostics.last_event,
                last_sequence_number = ?diagnostics.last_sequence_number,
                "upstream response stream completed"
            );
            if let Some(capture) = &response_capture {
                capture.mark_response_complete();
            }
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

async fn upstream_token(
    state: &AppState,
    provider: &crate::state::ProviderRuntime,
) -> Result<(String, Option<String>), String> {
    if provider.uses_codex_oauth() {
        let (token, account_id) = state.oauth.access_token().await?;
        return Ok((token, (!account_id.is_empty()).then_some(account_id)));
    }
    Ok((provider.api_key().to_string(), None))
}

fn build_responses_request(
    client: &reqwest::Client,
    url: &str,
    token: &str,
    request_headers: &HeaderMap,
    provider_headers: &HeaderMap,
    account_id: Option<&str>,
    body_rewritten: bool,
) -> reqwest::RequestBuilder {
    let mut builder = client
        .post(url)
        .header(header::AUTHORIZATION, format!("Bearer {token}"));
    for (name, value) in request_headers {
        if should_forward_request_header_for_body(name, body_rewritten) {
            builder = builder.header(name, value);
        }
    }
    for (name, value) in provider_headers {
        builder = builder.header(name, value);
    }
    if let Some(account_id) = account_id {
        builder = builder
            .header("chatgpt-account-id", account_id)
            .header("originator", crate::codex_oauth::CODEX_OAUTH_ORIGINATOR)
            .header("version", crate::codex_oauth::CODEX_OAUTH_CLIENT_VERSION);
    }
    builder
}

fn is_server_overloaded_error(body: &[u8]) -> bool {
    serde_json::from_slice::<serde_json::Value>(body)
        .ok()
        .and_then(|value| {
            value
                .pointer("/error/code")
                .and_then(|code| code.as_str().map(str::to_owned))
        })
        .as_deref()
        == Some("server_is_overloaded")
}

#[derive(Default)]
struct CapacitySseScanner {
    pending: Vec<u8>,
    capacity_failed: bool,
    output_started: bool,
    completed: bool,
}

impl CapacitySseScanner {
    fn observe(&mut self, bytes: &[u8]) {
        self.pending.extend_from_slice(bytes);
        while let Some((event_end, separator_len)) = find_sse_event_end(&self.pending) {
            let event = self.pending.drain(..event_end).collect::<Vec<_>>();
            self.pending.drain(..separator_len);
            self.inspect_event(&event);
            if self.capacity_failed || self.output_started || self.completed {
                break;
            }
        }
    }

    fn inspect_event(&mut self, event: &[u8]) {
        let text = String::from_utf8_lossy(event);
        let mut event_name = None;
        let mut data = String::new();
        for line in text.lines() {
            if let Some(value) = line.strip_prefix("event:") {
                event_name = Some(value.trim());
            } else if let Some(value) = line.strip_prefix("data:") {
                if !data.is_empty() {
                    data.push('\n');
                }
                data.push_str(value.trim_start());
            }
        }
        let parsed_data = serde_json::from_str::<serde_json::Value>(&data).ok();
        let event_name = event_name
            .or_else(|| {
                parsed_data
                    .as_ref()
                    .and_then(|value| value.get("type"))
                    .and_then(|value| value.as_str())
            })
            .unwrap_or_default();
        if event_name == "response.failed"
            && parsed_data
                .as_ref()
                .and_then(|value| value.pointer("/response/error/code"))
                .and_then(|code| code.as_str())
                == Some("server_is_overloaded")
        {
            self.capacity_failed = true;
        } else if event_name == "response.completed" {
            self.completed = true;
        } else if event_name.starts_with("response.output")
            || event_name.starts_with("response.content_part")
            || event_name.starts_with("response.reasoning")
            || event_name.starts_with("response.refusal")
        {
            self.output_started = true;
        }
    }
}

fn find_sse_event_end(bytes: &[u8]) -> Option<(usize, usize)> {
    bytes
        .windows(2)
        .position(|window| window == b"\n\n")
        .map(|index| (index, 2))
        .or_else(|| {
            bytes
                .windows(4)
                .position(|window| window == b"\r\n\r\n")
                .map(|index| (index, 4))
        })
}

fn is_sse_prefix(bytes: &[u8]) -> bool {
    bytes.starts_with(b"event:")
        || bytes.starts_with(b"data:")
        || bytes.starts_with(b"\r\nevent:")
        || bytes.starts_with(b"\r\ndata:")
}

fn should_forward_request_header(name: &HeaderName) -> bool {
    // Codex uses this local-only header to advertise its built-in image tool.
    // It must never be sent to an upstream provider as an arbitrary user header.
    if name
        .as_str()
        .eq_ignore_ascii_case("x-openai-actor-authorization")
    {
        return false;
    }
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

fn should_forward_request_header_for_body(name: &HeaderName, body_rewritten: bool) -> bool {
    should_forward_request_header(name) && !(body_rewritten && name == header::CONTENT_LENGTH)
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
        "上游请求超时，请检查网络代理和连接超时设置".to_string()
    } else if error.is_connect() {
        "无法连接上游 API，请检查 Base URL、上游服务及设置中的网络代理地址和端口".to_string()
    } else if error.is_body() {
        "上游响应流中断".to_string()
    } else {
        "上游请求失败".to_string()
    }
}

const REQUEST_MODEL_BUFFER_LIMIT: usize = 64 * 1024;
const USAGE_SCAN_BUFFER_LIMIT: usize = 4 * 1024;

#[derive(Default)]
struct CodexRequestNormalizer {
    state: CodexRequestState,
    separator: Vec<u8>,
    member_prefix: Vec<u8>,
    key_literal: Vec<u8>,
    key_escaped: bool,
    dropping_member: bool,
    emitted_member: bool,
    value_kind: JsonValueKind,
    value_depth: usize,
    value_in_string: bool,
    value_escaped: bool,
}

#[derive(Clone, Copy, Default)]
enum CodexRequestState {
    #[default]
    BeforeRoot,
    BetweenMembers,
    Key,
    AfterKey,
    Value,
    AfterValue,
    Done,
}

#[derive(Clone, Copy, Default)]
enum JsonValueKind {
    #[default]
    Unknown,
    Primitive,
    String,
    Container,
}

impl CodexRequestNormalizer {
    fn observe(&mut self, bytes: &[u8]) -> Vec<u8> {
        let mut output = Vec::with_capacity(bytes.len());
        for &byte in bytes {
            match self.state {
                CodexRequestState::BeforeRoot => {
                    output.push(byte);
                    if byte == b'{' {
                        self.state = CodexRequestState::BetweenMembers;
                    }
                }
                CodexRequestState::BetweenMembers => {
                    self.observe_between_members(byte, &mut output)
                }
                CodexRequestState::Key => self.observe_key(byte),
                CodexRequestState::AfterKey => self.observe_after_key(byte, &mut output),
                CodexRequestState::Value => self.observe_value(byte, &mut output),
                CodexRequestState::AfterValue => self.observe_after_value(byte, &mut output),
                CodexRequestState::Done => output.push(byte),
            }
        }
        output
    }

    fn observe_between_members(&mut self, byte: u8, output: &mut Vec<u8>) {
        match byte {
            b'"' => {
                self.member_prefix.push(byte);
                self.key_literal.push(byte);
                self.key_escaped = false;
                self.state = CodexRequestState::Key;
            }
            b'}' => self.finish_root(output),
            _ => self.separator.push(byte),
        }
    }

    fn observe_key(&mut self, byte: u8) {
        self.member_prefix.push(byte);
        self.key_literal.push(byte);
        match (byte, self.key_escaped) {
            (b'"', false) => self.state = CodexRequestState::AfterKey,
            (b'\\', false) => self.key_escaped = true,
            _ => self.key_escaped = false,
        }
    }

    fn observe_after_key(&mut self, byte: u8, output: &mut Vec<u8>) {
        self.member_prefix.push(byte);
        if byte != b':' {
            return;
        }

        let key = serde_json::from_slice::<String>(&self.key_literal).ok();
        self.dropping_member = key
            .as_deref()
            .is_some_and(|key| matches!(key, "max_output_tokens" | "store"));
        if !self.dropping_member {
            self.flush_separator(output);
            output.extend_from_slice(&self.member_prefix);
            self.emitted_member = true;
        }
        self.separator.clear();
        self.member_prefix.clear();
        self.key_literal.clear();
        self.value_kind = JsonValueKind::Unknown;
        self.value_depth = 0;
        self.value_in_string = false;
        self.value_escaped = false;
        self.state = CodexRequestState::Value;
    }

    fn observe_value(&mut self, byte: u8, output: &mut Vec<u8>) {
        match self.value_kind {
            JsonValueKind::Unknown => {
                if byte.is_ascii_whitespace() {
                    self.write_value_byte(byte, output);
                    return;
                }
                self.value_kind = match byte {
                    b'"' => JsonValueKind::String,
                    b'{' | b'[' => JsonValueKind::Container,
                    _ => JsonValueKind::Primitive,
                };
                if matches!(self.value_kind, JsonValueKind::Container) {
                    self.value_depth = 1;
                }
                self.write_value_byte(byte, output);
            }
            JsonValueKind::Primitive => match byte {
                b',' => self.begin_next_member(),
                b'}' => self.finish_root(output),
                _ if byte.is_ascii_whitespace() => {
                    self.write_value_byte(byte, output);
                    self.state = CodexRequestState::AfterValue;
                }
                _ => self.write_value_byte(byte, output),
            },
            JsonValueKind::String => {
                self.write_value_byte(byte, output);
                match (byte, self.value_escaped) {
                    (b'"', false) => self.state = CodexRequestState::AfterValue,
                    (b'\\', false) => self.value_escaped = true,
                    _ => self.value_escaped = false,
                }
            }
            JsonValueKind::Container => {
                self.write_value_byte(byte, output);
                if self.value_in_string {
                    match (byte, self.value_escaped) {
                        (b'"', false) => self.value_in_string = false,
                        (b'\\', false) => self.value_escaped = true,
                        _ => self.value_escaped = false,
                    }
                    return;
                }

                match byte {
                    b'"' => self.value_in_string = true,
                    b'{' | b'[' => self.value_depth += 1,
                    b'}' | b']' => {
                        self.value_depth = self.value_depth.saturating_sub(1);
                        if self.value_depth == 0 {
                            self.state = CodexRequestState::AfterValue;
                        }
                    }
                    _ => {}
                }
            }
        }
    }

    fn observe_after_value(&mut self, byte: u8, output: &mut Vec<u8>) {
        match byte {
            b',' => self.begin_next_member(),
            b'}' => self.finish_root(output),
            _ => self.write_value_byte(byte, output),
        }
    }

    fn write_value_byte(&self, byte: u8, output: &mut Vec<u8>) {
        if !self.dropping_member {
            output.push(byte);
        }
    }

    fn begin_next_member(&mut self) {
        self.separator.clear();
        self.separator.push(b',');
        self.state = CodexRequestState::BetweenMembers;
    }

    fn flush_separator(&self, output: &mut Vec<u8>) {
        if self.emitted_member {
            output.extend_from_slice(&self.separator);
            return;
        }
        output.extend(self.separator.iter().copied().filter(|byte| *byte != b','));
    }

    fn finish_root(&mut self, output: &mut Vec<u8>) {
        if matches!(self.state, CodexRequestState::BetweenMembers) {
            output.extend(self.separator.iter().copied().filter(|byte| *byte != b','));
        }
        if self.emitted_member {
            output.push(b',');
        }
        output.extend_from_slice(br#""store":false}"#);
        self.separator.clear();
        self.state = CodexRequestState::Done;
    }
}

#[derive(Default)]
struct RequestModelExtractor {
    buffer: Vec<u8>,
    model: Option<String>,
}

impl RequestModelExtractor {
    fn observe(&mut self, bytes: &[u8]) {
        if self.model.is_some() {
            return;
        }
        self.buffer.extend_from_slice(bytes);
        self.model = extract_json_string_field(&self.buffer, b"model");
        if self.model.is_none() && self.buffer.len() > REQUEST_MODEL_BUFFER_LIMIT {
            let keep_from = self.buffer.len() - REQUEST_MODEL_BUFFER_LIMIT / 2;
            self.buffer.drain(..keep_from);
        }
    }

    fn finish(self) -> Option<String> {
        self.model
            .or_else(|| extract_json_string_field(&self.buffer, b"model"))
    }
}

#[derive(Debug, Clone, Default, PartialEq, Eq)]
struct TokenUsage {
    input_tokens: Option<i64>,
    output_tokens: Option<i64>,
    total_tokens: Option<i64>,
    cached_input_tokens: Option<i64>,
    reasoning_tokens: Option<i64>,
}

#[derive(Default)]
struct TokenUsageExtractor {
    buffer: Vec<u8>,
    sse_line_buffer: Vec<u8>,
    sse_data_buffer: Vec<u8>,
    usage: TokenUsage,
    terminal_event_seen: bool,
}

impl TokenUsageExtractor {
    fn observe(&mut self, bytes: &[u8]) {
        self.buffer.extend_from_slice(bytes);
        self.sse_line_buffer.extend_from_slice(bytes);
        let mut consumed = 0;
        while let Some(relative_end) = self.sse_line_buffer[consumed..]
            .iter()
            .position(|byte| *byte == b'\n')
        {
            let end = consumed + relative_end;
            let line = self.sse_line_buffer[consumed..end].to_vec();
            self.observe_sse_line(&line);
            consumed = end + 1;
        }
        if consumed > 0 {
            self.sse_line_buffer.drain(..consumed);
        }
        if self.terminal_event_seen {
            return;
        }
        self.scan_unstructured_usage();
    }

    fn observe_sse_line(&mut self, line: &[u8]) {
        let line = line.strip_suffix(b"\r").unwrap_or(line);
        if line.is_empty() {
            self.process_sse_data();
            return;
        }
        let Some(data) = line.strip_prefix(b"data:") else {
            return;
        };
        let data = data.strip_prefix(b" ").unwrap_or(data);
        if !self.sse_data_buffer.is_empty() {
            self.sse_data_buffer.push(b'\n');
        }
        self.sse_data_buffer.extend_from_slice(data);
    }

    fn process_sse_data(&mut self) {
        if self.sse_data_buffer.is_empty() {
            return;
        }
        let data = std::mem::take(&mut self.sse_data_buffer);
        let Ok(event) = serde_json::from_slice::<serde_json::Value>(&data) else {
            return;
        };
        if !matches!(
            event.get("type").and_then(serde_json::Value::as_str),
            Some("response.completed" | "response.incomplete")
        ) {
            return;
        }
        self.terminal_event_seen = true;
        self.usage = TokenUsage::default();
        let Some(usage) = event
            .get("response")
            .and_then(|response| response.get("usage"))
            .filter(|usage| !usage.is_null())
        else {
            return;
        };
        let Some(object) = usage.as_object() else {
            return;
        };
        self.usage.input_tokens = object.get("input_tokens").and_then(json_i64);
        self.usage.output_tokens = object.get("output_tokens").and_then(json_i64);
        self.usage.total_tokens = object.get("total_tokens").and_then(json_i64);
        self.usage.cached_input_tokens = object
            .get("input_tokens_details")
            .and_then(|details| details.get("cached_tokens"))
            .and_then(json_i64);
        self.usage.reasoning_tokens = object
            .get("output_tokens_details")
            .and_then(|details| details.get("reasoning_tokens"))
            .and_then(json_i64);
    }

    fn scan_unstructured_usage(&mut self) {
        let mut offset = 0;
        while let Some(relative) = self.buffer[offset..]
            .windows(7)
            .position(|window| window == br#""usage""#)
        {
            let key_start = offset + relative;
            let value_start = key_start + 7;
            let mut cursor = value_start;
            while cursor < self.buffer.len() && self.buffer[cursor].is_ascii_whitespace() {
                cursor += 1;
            }
            if cursor >= self.buffer.len() || self.buffer[cursor] != b':' {
                offset = value_start;
                continue;
            }
            cursor += 1;
            while cursor < self.buffer.len() && self.buffer[cursor].is_ascii_whitespace() {
                cursor += 1;
            }
            if cursor < self.buffer.len() && self.buffer[cursor] == b'{' {
                scan_usage_fields(&self.buffer, cursor, &mut self.usage);
            }
            offset = value_start;
        }
        if self.buffer.len() > USAGE_SCAN_BUFFER_LIMIT {
            let keep_from = self.buffer.len() - USAGE_SCAN_BUFFER_LIMIT;
            self.buffer.drain(..keep_from);
        }
    }

    fn finish(mut self) -> TokenUsage {
        if !self.sse_line_buffer.is_empty() && !self.terminal_event_seen {
            let line = std::mem::take(&mut self.sse_line_buffer);
            self.observe_sse_line(&line);
        }
        if !self.terminal_event_seen {
            self.process_sse_data();
        }
        if !self.terminal_event_seen {
            self.scan_unstructured_usage();
        }
        self.usage
    }

    fn terminal_usage(&self) -> Option<TokenUsage> {
        self.terminal_event_seen.then(|| self.usage.clone())
    }
}

fn json_i64(value: &serde_json::Value) -> Option<i64> {
    value.as_i64().or_else(|| value.as_str()?.parse().ok())
}

fn scan_usage_fields(bytes: &[u8], start: usize, usage: &mut TokenUsage) {
    for (key, depth, slot) in [
        (b"input_tokens".as_slice(), 1, &mut usage.input_tokens),
        (b"output_tokens".as_slice(), 1, &mut usage.output_tokens),
        (b"total_tokens".as_slice(), 1, &mut usage.total_tokens),
        (
            b"cached_tokens".as_slice(),
            2,
            &mut usage.cached_input_tokens,
        ),
        (
            b"reasoning_tokens".as_slice(),
            2,
            &mut usage.reasoning_tokens,
        ),
    ] {
        if let Some(value) = find_usage_number(bytes, start, key, depth) {
            *slot = Some(value);
        }
    }
}

fn find_usage_number(
    bytes: &[u8],
    start: usize,
    wanted_key: &[u8],
    wanted_depth: usize,
) -> Option<i64> {
    let mut depth = 0usize;
    let mut cursor = start;
    let mut result = None;
    while cursor < bytes.len() {
        match bytes[cursor] {
            b'{' => {
                depth += 1;
                cursor += 1;
            }
            b'}' => {
                depth = depth.saturating_sub(1);
                cursor += 1;
                if depth == 0 {
                    break;
                }
            }
            b'"' => {
                let Some(end) = json_string_end(bytes, cursor) else {
                    break;
                };
                let key = &bytes[cursor + 1..end];
                cursor = end + 1;
                if depth != wanted_depth || key != wanted_key {
                    continue;
                }
                while cursor < bytes.len() && bytes[cursor].is_ascii_whitespace() {
                    cursor += 1;
                }
                if cursor >= bytes.len() || bytes[cursor] != b':' {
                    continue;
                }
                cursor += 1;
                while cursor < bytes.len() && bytes[cursor].is_ascii_whitespace() {
                    cursor += 1;
                }
                if cursor < bytes.len() && bytes[cursor] == b'"' {
                    let Some(value_end) = json_string_end(bytes, cursor) else {
                        break;
                    };
                    result = std::str::from_utf8(&bytes[cursor + 1..value_end])
                        .ok()
                        .and_then(|value| value.parse().ok());
                    cursor = value_end + 1;
                } else {
                    let value_start = cursor;
                    while cursor < bytes.len() && bytes[cursor].is_ascii_digit() {
                        cursor += 1;
                    }
                    if cursor > value_start && cursor < bytes.len() {
                        result = std::str::from_utf8(&bytes[value_start..cursor])
                            .ok()
                            .and_then(|value| value.parse().ok());
                    }
                }
            }
            _ => cursor += 1,
        }
    }
    result
}

fn json_string_end(bytes: &[u8], start: usize) -> Option<usize> {
    let mut escaped = false;
    for (offset, byte) in bytes[start + 1..].iter().copied().enumerate() {
        if escaped {
            escaped = false;
        } else if byte == b'\\' {
            escaped = true;
        } else if byte == b'"' {
            return Some(start + 1 + offset);
        }
    }
    None
}

#[derive(Default)]
struct ResponseStreamDiagnostics {
    total_bytes: u64,
    chunk_count: u64,
    last_chunk_bytes: usize,
    last_chunk_at: Option<Instant>,
    last_chunk_gap_ms: Option<u128>,
    max_chunk_gap_ms: u128,
    event_count: u64,
    last_event: Option<String>,
    last_sequence_number: Option<i64>,
    line_buffer: Vec<u8>,
}

impl ResponseStreamDiagnostics {
    fn observe(&mut self, bytes: &[u8]) {
        let now = Instant::now();
        if let Some(previous) = self.last_chunk_at {
            let gap_ms = now.duration_since(previous).as_millis();
            self.last_chunk_gap_ms = Some(gap_ms);
            self.max_chunk_gap_ms = self.max_chunk_gap_ms.max(gap_ms);
        }
        self.last_chunk_at = Some(now);
        self.chunk_count = self.chunk_count.saturating_add(1);
        self.last_chunk_bytes = bytes.len();
        self.total_bytes = self.total_bytes.saturating_add(bytes.len() as u64);
        self.line_buffer.extend_from_slice(bytes);
        let mut consumed = 0;
        while let Some(relative_end) = self.line_buffer[consumed..]
            .iter()
            .position(|byte| *byte == b'\n')
        {
            let end = consumed + relative_end;
            let line = self.line_buffer[consumed..end].to_vec();
            self.observe_line(&line);
            consumed = end + 1;
        }
        if consumed > 0 {
            self.line_buffer.drain(..consumed);
        }
        const MAX_LINE_BUFFER: usize = 64 * 1024;
        if self.line_buffer.len() > MAX_LINE_BUFFER {
            let keep_from = self.line_buffer.len() - MAX_LINE_BUFFER;
            self.line_buffer.drain(..keep_from);
        }
    }

    fn time_since_last_chunk_ms(&self) -> Option<u128> {
        self.last_chunk_at.map(|last| last.elapsed().as_millis())
    }

    fn observe_line(&mut self, line: &[u8]) {
        let line = line.strip_suffix(b"\r").unwrap_or(line);
        if let Some(event) = line.strip_prefix(b"event: ") {
            if let Ok(event) = std::str::from_utf8(event) {
                self.last_event = Some(event.trim().to_string());
                self.event_count = self.event_count.saturating_add(1);
            }
        } else if let Some(data) = line.strip_prefix(b"data: ") {
            if let Some(event_type) = extract_json_string_field(data, b"type") {
                self.last_event = Some(event_type);
            }
            if let Some(sequence_number) = find_json_number(data, b"sequence_number") {
                self.last_sequence_number = Some(sequence_number);
            }
        }
    }
}

fn header_value(headers: &HeaderMap, name: &HeaderName) -> Option<String> {
    headers
        .get(name)
        .and_then(|value| value.to_str().ok())
        .map(str::to_string)
}

fn extract_json_string_field(bytes: &[u8], key: &[u8]) -> Option<String> {
    let mut needle = Vec::with_capacity(key.len() + 2);
    needle.push(b'"');
    needle.extend_from_slice(key);
    needle.push(b'"');
    let mut offset = 0;
    while offset + needle.len() <= bytes.len() {
        let relative = bytes[offset..]
            .windows(needle.len())
            .position(|window| window == needle)?;
        let start = offset + relative + needle.len();
        let mut cursor = start;
        while cursor < bytes.len() && bytes[cursor].is_ascii_whitespace() {
            cursor += 1;
        }
        if cursor >= bytes.len() || bytes[cursor] != b':' {
            offset = start;
            continue;
        }
        cursor += 1;
        while cursor < bytes.len() && bytes[cursor].is_ascii_whitespace() {
            cursor += 1;
        }
        if cursor >= bytes.len() || bytes[cursor] != b'"' {
            offset = start;
            continue;
        }
        let value_start = cursor;
        cursor += 1;
        let mut escaped = false;
        while cursor < bytes.len() {
            match (bytes[cursor], escaped) {
                (b'"', false) => {
                    return serde_json::from_slice(&bytes[value_start..=cursor]).ok();
                }
                (b'\\', false) => escaped = true,
                (_, _) => escaped = false,
            }
            cursor += 1;
        }
        return None;
    }
    None
}

fn find_json_number(bytes: &[u8], key: &[u8]) -> Option<i64> {
    let mut needle = Vec::with_capacity(key.len() + 2);
    needle.push(b'"');
    needle.extend_from_slice(key);
    needle.push(b'"');
    let mut offset = 0;
    let mut result = None;
    while offset + needle.len() <= bytes.len() {
        let Some(relative) = bytes[offset..]
            .windows(needle.len())
            .position(|window| window == needle)
        else {
            break;
        };
        let key_end = offset + relative + needle.len();
        let mut cursor = key_end;
        while cursor < bytes.len() && bytes[cursor].is_ascii_whitespace() {
            cursor += 1;
        }
        if cursor >= bytes.len() || bytes[cursor] != b':' {
            offset = key_end;
            continue;
        }
        cursor += 1;
        while cursor < bytes.len() && bytes[cursor].is_ascii_whitespace() {
            cursor += 1;
        }
        let number_start = cursor;
        if cursor < bytes.len() && bytes[cursor] == b'-' {
            cursor += 1;
        }
        let digits_start = cursor;
        while cursor < bytes.len() && bytes[cursor].is_ascii_digit() {
            cursor += 1;
        }
        if cursor == digits_start {
            offset = key_end;
            continue;
        }
        if let Some(value) = std::str::from_utf8(&bytes[number_start..cursor])
            .ok()
            .and_then(|value| value.parse().ok())
        {
            result = Some(value);
        }
        offset = cursor;
    }
    result
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
    response_completed: bool,
    retry_count: u32,
    error: Option<String>,
    request_bytes: Option<u64>,
    model: Option<String>,
    usage: TokenUsage,
    content_capture: Option<Arc<ContentCapture>>,
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
            response_completed: false,
            retry_count: 0,
            error: None,
            request_bytes,
            model: None,
            usage: TokenUsage::default(),
            content_capture: None,
        }
    }

    fn set_status(&mut self, status: StatusCode) {
        self.status_code = Some(status.as_u16());
        self.outcome = if status.is_success() {
            "client_disconnected".to_string()
        } else {
            "upstream_http_error".to_string()
        };
    }

    fn mark_response_completed(&mut self) {
        self.response_completed = true;
    }

    fn record_retry(&mut self) {
        self.retry_count = self.retry_count.saturating_add(1);
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

    fn set_content_capture(&mut self, capture: Arc<ContentCapture>) {
        self.content_capture = Some(capture);
    }

    fn content_capture(&self) -> Option<Arc<ContentCapture>> {
        self.content_capture.clone()
    }

    fn set_model(&mut self, model: Option<String>) {
        self.model = model;
    }

    fn set_usage(&mut self, usage: TokenUsage) {
        self.usage = usage;
    }
}

impl Drop for RequestGuard {
    fn drop(&mut self) {
        let error = self.error.clone();
        self.state.stats.finish(error.clone());
        let outcome = if self.outcome == "client_disconnected" && self.response_completed {
            "completed_client_disconnect".to_string()
        } else {
            self.outcome.clone()
        };
        self.state.record_log(&RequestLog {
            id: self.id.clone(),
            provider_id: self.provider_id.clone(),
            provider_name: self.provider_name.clone(),
            model: self.model.clone(),
            started_at: self.started_at.clone(),
            duration_ms: self.started.elapsed().as_millis().min(i64::MAX as u128) as i64,
            status_code: self.status_code,
            outcome,
            retry_count: self.retry_count,
            error,
            request_bytes: self.request_bytes,
            input_tokens: self.usage.input_tokens,
            output_tokens: self.usage.output_tokens,
            total_tokens: self.usage.total_tokens,
            cached_input_tokens: self.usage.cached_input_tokens,
            reasoning_tokens: self.usage.reasoning_tokens,
            content_captured: false,
        });
        if let Some(capture) = self.content_capture.take() {
            self.state
                .record_content_capture(&self.id, &capture.finish());
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[tokio::test]
    async fn rejects_and_records_existing_provider_self_proxy_loop() {
        use http_body_util::BodyExt;
        use tower::ServiceExt;
        let temp = tempfile::tempdir().unwrap();
        let db =
            Arc::new(crate::storage::Database::open(&temp.path().join("loop.sqlite3")).unwrap());
        let state = crate::state::AppState::new(
            db,
            "127.0.0.1:8787".to_string(),
            crate::codex_oauth::CodexOAuthManager::new(temp.path().join("oauth.json")).unwrap(),
        )
        .unwrap();
        state
            .providers
            .set_active_for_test(crate::state::ProviderRuntime::new_for_test(
                crate::models::Provider {
                    id: "loop".to_string(),
                    name: "Loop".to_string(),
                    base_url: "http://127.0.0.1:8787/v1".to_string(),
                    test_model: String::new(),
                    extra_headers: vec![],
                    auth_type: crate::models::AUTH_TYPE_API_KEY.to_string(),
                    created_at: String::new(),
                    updated_at: String::new(),
                },
                "unused-key".to_string(),
            ));
        for (method, path) in [
            ("POST", "/v1/responses"),
            ("POST", "/v1/responses/compact"),
            ("POST", "/v1/images/generations"),
            ("POST", "/v1/images/edits"),
            ("GET", "/v1/models"),
        ] {
            let request = Request::builder()
                .method(method)
                .uri(path)
                .header(
                    header::AUTHORIZATION,
                    format!("Bearer {}", state.local_token),
                )
                .body(Body::from("{}"))
                .unwrap();
            let response = router(state.clone()).oneshot(request).await.unwrap();
            assert_eq!(response.status(), StatusCode::SERVICE_UNAVAILABLE);
            let bytes = response.into_body().collect().await.unwrap().to_bytes();
            let body: serde_json::Value = serde_json::from_slice(&bytes).unwrap();
            assert_eq!(body["error"]["type"], "easyapi_configuration_error");
        }
        let logs = state.db.list_request_logs(None).unwrap();
        assert_eq!(logs.len(), 4);
        assert!(logs
            .iter()
            .all(|log| log.error.as_deref().unwrap().contains("指向 EasyAPI 自己")));
    }

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
    fn only_server_overloaded_error_code_is_retryable_capacity_error() {
        assert!(is_server_overloaded_error(
            br#"{"error":{"code":"server_is_overloaded","message":"busy"}}"#
        ));
        assert!(!is_server_overloaded_error(
            br#"{"error":{"code":"rate_limit_exceeded","message":"capacity"}}"#
        ));
        assert!(!is_server_overloaded_error(
            br#"{"message":"server_is_overloaded"}"#
        ));
    }

    #[test]
    fn sse_capacity_failure_is_detected_before_output_is_exposed() {
        let mut scanner = CapacitySseScanner::default();
        scanner.observe(b"event: response.created\ndata: {}\n\n");
        assert!(!scanner.capacity_failed);
        assert!(!scanner.output_started);
        scanner.observe(b"data: {\"type\":\"response.failed\",\"sequence_number\":4,\"response\":{\"error\":{\"code\":\"server_is_overloaded\"}}}\n\n");
        assert!(scanner.capacity_failed);
        assert!(!scanner.output_started);
    }

    #[test]
    fn sse_output_event_marks_stream_as_not_safely_replayable() {
        let mut scanner = CapacitySseScanner::default();
        scanner.observe(b"event: response.output_text.delta\ndata: {\"delta\":\"hello\"}\n\n");
        assert!(scanner.output_started);
        assert!(!scanner.capacity_failed);
    }

    #[test]
    fn recognizes_sse_prefix_when_upstream_omits_content_type() {
        assert!(is_sse_prefix(b"event: response.created\n"));
        assert!(is_sse_prefix(b"data: {\"type\":\"response.failed\"}"));
        assert!(is_sse_prefix(b"event:"));
        assert!(!is_sse_prefix(
            b"{\"error\":{\"code\":\"model_not_found\"}}"
        ));
    }

    #[test]
    fn filters_hop_by_hop_headers() {
        assert!(!should_forward_request_header(&header::AUTHORIZATION));
        assert!(!should_forward_request_header(&header::CONNECTION));
        assert!(!should_forward_request_header(&HeaderName::from_static(
            "x-openai-actor-authorization"
        )));
        assert!(should_forward_request_header(&header::CONTENT_TYPE));
        assert!(!should_forward_response_header(&header::TRANSFER_ENCODING));
    }

    #[test]
    fn codex_body_rewrite_drops_the_original_content_length() {
        assert!(should_forward_request_header_for_body(
            &header::CONTENT_LENGTH,
            false
        ));
        assert!(!should_forward_request_header_for_body(
            &header::CONTENT_LENGTH,
            true
        ));
    }

    #[test]
    fn normalizes_codex_request_fields_across_chunk_boundaries() {
        let request = br#"{
            "model":"gpt-5",
            "input":[{"role":"user","content":"keep max_output_tokens and store here"}],
            "max_output_tokens":512,
            "store":true,
            "stream":true
        }"#;
        let expected = serde_json::json!({
            "model": "gpt-5",
            "input": [{"role": "user", "content": "keep max_output_tokens and store here"}],
            "store": false,
            "stream": true
        });

        for chunk_size in 1..=request.len() {
            let mut normalizer = CodexRequestNormalizer::default();
            let mut normalized = Vec::new();
            for chunk in request.chunks(chunk_size) {
                normalized.extend(normalizer.observe(chunk));
            }
            assert_eq!(
                serde_json::from_slice::<serde_json::Value>(&normalized).unwrap(),
                expected,
                "chunk size {chunk_size}"
            );
        }
    }

    #[test]
    fn normalizes_first_middle_last_and_missing_codex_fields() {
        let cases = [
            br#"{"max_output_tokens":128,"model":"gpt-5","store":true}"#.as_slice(),
            br#"{"model":"gpt-5","store":null,"stream":true,"max_output_tokens":128}"#.as_slice(),
            br#"{"model":"gpt-5","max_output_tokens":128}"#.as_slice(),
            br#"{}"#.as_slice(),
        ];

        for request in cases {
            let mut normalizer = CodexRequestNormalizer::default();
            let normalized = request
                .iter()
                .flat_map(|byte| normalizer.observe(std::slice::from_ref(byte)))
                .collect::<Vec<_>>();
            let value = serde_json::from_slice::<serde_json::Value>(&normalized).unwrap();
            assert_eq!(value["store"], false);
            assert!(value.get("max_output_tokens").is_none());
        }
    }

    #[test]
    fn preserves_nested_fields_with_codex_restricted_names() {
        let request = br#"{"input":{"max_output_tokens":64,"store":true},"max_output_tokens":256}"#;
        let mut normalizer = CodexRequestNormalizer::default();
        let normalized = normalizer.observe(request);
        let value = serde_json::from_slice::<serde_json::Value>(&normalized).unwrap();

        assert_eq!(value["input"]["max_output_tokens"], 64);
        assert_eq!(value["input"]["store"], true);
        assert_eq!(value["store"], false);
        assert!(value.get("max_output_tokens").is_none());
    }

    #[test]
    fn extracts_model_across_request_chunks() {
        let mut extractor = RequestModelExtractor::default();
        extractor.observe(br#"{"mo"#);
        extractor.observe(br#"del":"gpt-5"}"#);
        assert_eq!(extractor.finish().as_deref(), Some("gpt-5"));
    }

    #[test]
    fn extracts_usage_across_response_chunks() {
        let mut extractor = TokenUsageExtractor::default();
        extractor.observe(br#"{"usage":{"input_tokens":12,"output_tokens":"#);
        extractor.observe(br#"34,"total_tokens":46,"input_tokens_details":{"cached_tokens":5},"output_tokens_details":{"reasoning_tokens":7}}}"#);
        assert_eq!(
            extractor.finish(),
            TokenUsage {
                input_tokens: Some(12),
                output_tokens: Some(34),
                total_tokens: Some(46),
                cached_input_tokens: Some(5),
                reasoning_tokens: Some(7),
            }
        );
    }

    #[test]
    fn tracks_last_sse_event_and_sequence_across_chunks() {
        let mut diagnostics = ResponseStreamDiagnostics::default();
        diagnostics.observe(b"event: response.output_text.delta\ndata: {\"type\":\"response.output_text.delta\",\"sequence_number\":");
        diagnostics.observe(b"12}\n\nevent: response.completed\ndata: {\"type\":\"response.completed\",\"sequence_number\":13}\n\n");

        assert_eq!(diagnostics.total_bytes, 184);
        assert_eq!(diagnostics.event_count, 2);
        assert_eq!(
            diagnostics.last_event.as_deref(),
            Some("response.completed")
        );
        assert_eq!(diagnostics.last_sequence_number, Some(13));
    }

    #[test]
    fn final_usage_overrides_zero_values_from_earlier_response_events() {
        let mut extractor = TokenUsageExtractor::default();
        extractor.observe(
            br#"event: response.created\ndata: {"response":{"usage":{"input_tokens":0,"output_tokens":0,"total_tokens":0}}}\n\n"#,
        );
        extractor.observe(
            br#"event: response.completed\ndata: {"response":{"usage":{"input_tokens":20698,"input_tokens_details":{"cached_tokens":12032},"output_tokens":251,"output_tokens_details":{"reasoning_tokens":102},"total_tokens":20949}}}\n\n"#,
        );
        assert_eq!(
            extractor.finish(),
            TokenUsage {
                input_tokens: Some(20698),
                output_tokens: Some(251),
                total_tokens: Some(20949),
                cached_input_tokens: Some(12032),
                reasoning_tokens: Some(102),
            }
        );
    }

    #[test]
    fn ignores_nested_token_counters_inside_usage_metadata() {
        let mut extractor = TokenUsageExtractor::default();
        extractor.observe(
            br#"data: {"usage":{"input_tokens":63449,"output_tokens":216,"total_tokens":63665,"input_tokens_details":{"cached_tokens":63232},"output_tokens_details":{"reasoning_tokens":11},"attribution":{"items":{"tool":{"input_tokens":0,"output_tokens":0,"total_tokens":0}}},"tool_usage":{"input_tokens":0,"output_tokens":0,"total_tokens":0}}}"#,
        );
        assert_eq!(
            extractor.finish(),
            TokenUsage {
                input_tokens: Some(63449),
                output_tokens: Some(216),
                total_tokens: Some(63665),
                cached_input_tokens: Some(63232),
                reasoning_tokens: Some(11),
            }
        );
    }

    #[test]
    fn uses_usage_from_terminal_sse_event() {
        let mut extractor = TokenUsageExtractor::default();
        extractor.observe(
            b"event: response.created\ndata: {\"type\":\"response.created\",\"response\":{\"usage\":{\"input_tokens\":0,\"output_tokens\":0,\"total_tokens\":0}}}\n\n",
        );
        extractor.observe(
            b"event: response.completed\ndata: {\"type\":\"response.completed\",\"response\":{\"usage\":{\"input_tokens\":63449,\"output_tokens\":216,\"total_tokens\":63665,\"input_tokens_details\":{\"cached_tokens\":63232},\"output_tokens_details\":{\"reasoning_tokens\":11},\"tool_usage\":{\"input_tokens\":0,\"output_tokens\":0,\"total_tokens\":0}}}}\n\n",
        );
        assert_eq!(
            extractor.terminal_usage().map(|usage| usage.total_tokens),
            Some(Some(63665))
        );
        assert_eq!(
            extractor.finish(),
            TokenUsage {
                input_tokens: Some(63449),
                output_tokens: Some(216),
                total_tokens: Some(63665),
                cached_input_tokens: Some(63232),
                reasoning_tokens: Some(11),
            }
        );
    }

    #[test]
    fn extracts_usage_when_metadata_exceeds_scan_buffer() {
        let mut extractor = TokenUsageExtractor::default();
        let mut response = br#"{"usage":{"input_tokens":63449,"output_tokens":216,"total_tokens":63665,"input_tokens_details":{"cached_tokens":63232},"output_tokens_details":{"reasoning_tokens":11},"attribution":{"items":{"tool":{"input_tokens":0,"output_tokens":0,"total_tokens":0,"padding":"#
            .to_vec();
        response.extend(std::iter::repeat(b'x').take(USAGE_SCAN_BUFFER_LIMIT + 1024));
        response.extend_from_slice(br#""}}}}}"#);
        extractor.observe(&response);
        let usage = extractor.finish();
        assert_eq!(usage.input_tokens, Some(63449));
        assert_eq!(usage.output_tokens, Some(216));
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
                    b"event: response.completed\ndata: {\"type\":\"response.completed\",\"response\":{\"usage\":{\"input_tokens\":12,\"output_tokens\":34,\"total_tokens\":46,\"input_tokens_details\":{\"cached_tokens\":5},\"output_tokens_details\":{\"reasoning_tokens\":7}}}}\n\n",
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
        let state = crate::state::AppState::new(
            db,
            "127.0.0.1:8787".to_string(),
            crate::codex_oauth::CodexOAuthManager::new(temp.path().join("oauth.json")).unwrap(),
        )
        .unwrap();
        state.set_content_capture_enabled(true).unwrap();
        state
            .providers
            .set_active_for_test(crate::state::ProviderRuntime::new_for_test(
                crate::models::Provider {
                    id: "test".to_string(),
                    name: "Test".to_string(),
                    base_url: format!("http://{upstream_address}/v1"),
                    test_model: "test".to_string(),
                    extra_headers: vec![],
                    auth_type: crate::models::AUTH_TYPE_API_KEY.to_string(),
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
        let response = router(state.clone()).oneshot(request).await.unwrap();
        assert_eq!(response.status(), StatusCode::OK);
        assert_eq!(
            response.headers()[header::CONTENT_TYPE],
            "text/event-stream"
        );
        let request_id = response.headers()["x-easyapi-request-id"]
            .to_str()
            .unwrap()
            .to_string();
        let bytes = response.into_body().collect().await.unwrap().to_bytes();
        assert_eq!(
            bytes,
            Bytes::from_static(
                b"event: response.created\ndata: {}\n\nevent: response.completed\ndata: {\"type\":\"response.completed\",\"response\":{\"usage\":{\"input_tokens\":12,\"output_tokens\":34,\"total_tokens\":46,\"input_tokens_details\":{\"cached_tokens\":5},\"output_tokens_details\":{\"reasoning_tokens\":7}}}}\n\n"
            )
        );
        let capture = state.db.get_request_capture(&request_id).unwrap();
        assert_eq!(
            capture.request_content.as_deref(),
            Some(r#"{"model":"test","input":"hello"}"#)
        );
        assert_eq!(
            capture.response_content.as_deref(),
            Some("event: response.created\ndata: {}\n\nevent: response.completed\ndata: {\"type\":\"response.completed\",\"response\":{\"usage\":{\"input_tokens\":12,\"output_tokens\":34,\"total_tokens\":46,\"input_tokens_details\":{\"cached_tokens\":5},\"output_tokens_details\":{\"reasoning_tokens\":7}}}}\n\n")
        );
        assert!(capture.request_complete);
        assert!(capture.response_complete);
        let logs = state.db.list_request_logs(None).unwrap();
        assert_eq!(logs.len(), 1);
        assert_eq!(logs[0].model.as_deref(), Some("test"));
        assert_eq!(logs[0].outcome, "completed");
        assert_eq!(logs[0].retry_count, 0);
        assert_eq!(logs[0].input_tokens, Some(12));
        assert_eq!(logs[0].output_tokens, Some(34));
        assert_eq!(logs[0].total_tokens, Some(46));
        assert_eq!(logs[0].cached_input_tokens, Some(5));
        assert_eq!(logs[0].reasoning_tokens, Some(7));
    }

    #[tokio::test]
    async fn forwards_compact_requests_to_the_upstream_compact_endpoint() {
        use axum::{body::Bytes, routing::post, Router};
        use http_body_util::BodyExt;
        use tempfile::tempdir;
        use tower::ServiceExt;

        async fn upstream(request: Request<Body>) -> Response<Body> {
            assert_eq!(
                request.headers()[header::AUTHORIZATION],
                "Bearer upstream-key"
            );
            let body = request.into_body().collect().await.unwrap().to_bytes();
            assert_eq!(
                body,
                Bytes::from_static(
                    br#"{"model":"test","input":[{"role":"user","content":"hello"}]}"#
                )
            );
            Response::builder()
                .status(StatusCode::OK)
                .header(header::CONTENT_TYPE, "application/json")
                .body(Body::from(
                    r#"{"object":"response.compaction","output":[{"type":"compaction","encrypted_content":"opaque"}]}"#,
                ))
                .unwrap()
        }

        let upstream_listener = tokio::net::TcpListener::bind("127.0.0.1:0").await.unwrap();
        let upstream_address = upstream_listener.local_addr().unwrap();
        tokio::spawn(async move {
            axum::serve(
                upstream_listener,
                Router::new().route("/v1/responses/compact", post(upstream)),
            )
            .await
            .unwrap();
        });

        let temp = tempdir().unwrap();
        let db =
            Arc::new(crate::storage::Database::open(&temp.path().join("compact.sqlite3")).unwrap());
        let state = crate::state::AppState::new(
            db,
            "127.0.0.1:8787".to_string(),
            crate::codex_oauth::CodexOAuthManager::new(temp.path().join("oauth.json")).unwrap(),
        )
        .unwrap();
        state
            .providers
            .set_active_for_test(crate::state::ProviderRuntime::new_for_test(
                crate::models::Provider {
                    id: "compact-test".to_string(),
                    name: "Compact Test".to_string(),
                    base_url: format!("http://{upstream_address}/v1"),
                    test_model: "test".to_string(),
                    extra_headers: vec![],
                    auth_type: crate::models::AUTH_TYPE_API_KEY.to_string(),
                    created_at: Utc::now().to_rfc3339(),
                    updated_at: Utc::now().to_rfc3339(),
                },
                "upstream-key".to_string(),
            ));

        let request = Request::builder()
            .method("POST")
            .uri("/v1/responses/compact")
            .header(
                header::AUTHORIZATION,
                format!("Bearer {}", state.local_token),
            )
            .header(header::CONTENT_TYPE, "application/json")
            .body(Body::from(
                r#"{"model":"test","input":[{"role":"user","content":"hello"}]}"#,
            ))
            .unwrap();
        let response = router(state).oneshot(request).await.unwrap();
        assert_eq!(response.status(), StatusCode::OK);
        assert_eq!(response.headers()[header::CONTENT_TYPE], "application/json");
        let body = response.into_body().collect().await.unwrap().to_bytes();
        assert_eq!(
            body,
            Bytes::from_static(
                br#"{"object":"response.compaction","output":[{"type":"compaction","encrypted_content":"opaque"}]}"#,
            )
        );
    }

    #[tokio::test]
    async fn forwards_image_generation_and_edits_without_rewriting_the_body() {
        use axum::{body::Bytes, routing::post, Router};
        use http_body_util::BodyExt;
        use std::sync::Mutex;
        use tempfile::tempdir;
        use tower::ServiceExt;

        let seen = Arc::new(Mutex::new(Vec::<(String, Bytes)>::new()));
        let seen_for_upstream = seen.clone();
        let upstream = {
            let seen_for_upstream = seen_for_upstream.clone();
            move |request: Request<Body>| {
                let seen_for_upstream = seen_for_upstream.clone();
                async move {
                    assert_eq!(
                        request.headers()[header::AUTHORIZATION],
                        "Bearer upstream-key"
                    );
                    let path = request.uri().path().to_string();
                    let body = request.into_body().collect().await.unwrap().to_bytes();
                    seen_for_upstream.lock().unwrap().push((path, body.clone()));
                    Response::builder()
                        .status(StatusCode::OK)
                        .header(header::CONTENT_TYPE, "application/json")
                        .body(Body::from(
                            r#"{"created":1,"data":[{"b64_json":"aW1hZ2U="}]}"#,
                        ))
                        .unwrap()
                }
            }
        };

        let upstream_listener = tokio::net::TcpListener::bind("127.0.0.1:0").await.unwrap();
        let upstream_address = upstream_listener.local_addr().unwrap();
        tokio::spawn(async move {
            axum::serve(
                upstream_listener,
                Router::new()
                    .route("/v1/images/generations", post(upstream.clone()))
                    .route("/v1/images/edits", post(upstream)),
            )
            .await
            .unwrap();
        });

        let temp = tempdir().unwrap();
        let db =
            Arc::new(crate::storage::Database::open(&temp.path().join("images.sqlite3")).unwrap());
        let state = crate::state::AppState::new(
            db,
            "127.0.0.1:8787".to_string(),
            crate::codex_oauth::CodexOAuthManager::new(temp.path().join("oauth.json")).unwrap(),
        )
        .unwrap();
        state
            .providers
            .set_active_for_test(crate::state::ProviderRuntime::new_for_test(
                crate::models::Provider {
                    id: "images-test".to_string(),
                    name: "Images Test".to_string(),
                    base_url: format!("http://{upstream_address}/v1"),
                    test_model: "gpt-image-1.5".to_string(),
                    extra_headers: vec![],
                    auth_type: crate::models::AUTH_TYPE_API_KEY.to_string(),
                    created_at: Utc::now().to_rfc3339(),
                    updated_at: Utc::now().to_rfc3339(),
                },
                "upstream-key".to_string(),
            ));

        let generation = r#"{"model":"gpt-image-1.5","prompt":"a red fox","store":true,"max_output_tokens":128}"#;
        let edit = r#"{"model":"gpt-image-1.5","prompt":"add a hat","images":[{"image_url":"data:image/png;base64,Zm9v"}],"store":true}"#;
        for (path, body) in [
            ("/v1/images/generations", generation),
            ("/images/edits", edit),
        ] {
            let request = Request::builder()
                .method("POST")
                .uri(path)
                .header(
                    header::AUTHORIZATION,
                    format!("Bearer {}", state.local_token),
                )
                .header(header::CONTENT_TYPE, "application/json")
                .body(Body::from(body))
                .unwrap();
            let response = router(state.clone()).oneshot(request).await.unwrap();
            assert_eq!(response.status(), StatusCode::OK, "{path}");
            let response_body = response.into_body().collect().await.unwrap().to_bytes();
            assert_eq!(
                response_body,
                Bytes::from_static(br#"{"created":1,"data":[{"b64_json":"aW1hZ2U="}]}"#)
            );
        }

        let seen = seen.lock().unwrap();
        assert_eq!(seen.len(), 2);
        assert_eq!(seen[0].0, "/v1/images/generations");
        assert_eq!(seen[0].1, Bytes::from_static(generation.as_bytes()));
        assert_eq!(seen[1].0, "/v1/images/edits");
        assert_eq!(seen[1].1, Bytes::from_static(edit.as_bytes()));
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
        let state = crate::state::AppState::new(
            db,
            "127.0.0.1:8787".to_string(),
            crate::codex_oauth::CodexOAuthManager::new(temp.path().join("oauth.json")).unwrap(),
        )
        .unwrap();
        state
            .providers
            .set_active_for_test(crate::state::ProviderRuntime::new_for_test(
                crate::models::Provider {
                    id: "models-test".to_string(),
                    name: "Models Test".to_string(),
                    base_url: format!("http://{upstream_address}/v1"),
                    test_model: "test".to_string(),
                    extra_headers: vec![],
                    auth_type: crate::models::AUTH_TYPE_API_KEY.to_string(),
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
        let state = crate::state::AppState::new(
            db,
            "127.0.0.1:8787".to_string(),
            crate::codex_oauth::CodexOAuthManager::new(temp.path().join("oauth.json")).unwrap(),
        )
        .unwrap();
        state
            .providers
            .set_active_for_test(crate::state::ProviderRuntime::new_for_test(
                crate::models::Provider {
                    id: "large-test".to_string(),
                    name: "Large Test".to_string(),
                    base_url: format!("http://{upstream_address}/v1"),
                    test_model: "test".to_string(),
                    extra_headers: vec![],
                    auth_type: crate::models::AUTH_TYPE_API_KEY.to_string(),
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
