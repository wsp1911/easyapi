use std::{
    fs::{self, File},
    io::{BufWriter, Write},
    path::{Path, PathBuf},
    sync::Mutex,
};

use chrono::Utc;
use rusqlite::{params, Connection, OptionalExtension};

use crate::models::{HeaderPair, Provider, ProviderInput, RequestCapture, RequestLog};

pub struct Database {
    conn: Mutex<Connection>,
    captures_dir: PathBuf,
}

impl Database {
    pub fn open(path: &Path) -> Result<Self, String> {
        if let Some(parent) = path.parent() {
            std::fs::create_dir_all(parent).map_err(|e| e.to_string())?;
        }
        let captures_dir = path
            .parent()
            .unwrap_or_else(|| Path::new("."))
            .join("captures");
        let conn = Connection::open(path).map_err(|e| e.to_string())?;
        conn.execute_batch(
            r#"
            PRAGMA journal_mode = WAL;
            PRAGMA foreign_keys = ON;

            CREATE TABLE IF NOT EXISTS providers (
                id TEXT PRIMARY KEY,
                name TEXT NOT NULL,
                base_url TEXT NOT NULL,
                test_model TEXT NOT NULL DEFAULT '',
                extra_headers_json TEXT NOT NULL DEFAULT '[]',
                created_at TEXT NOT NULL,
                updated_at TEXT NOT NULL
            );

            CREATE TABLE IF NOT EXISTS settings (
                key TEXT PRIMARY KEY,
                value TEXT NOT NULL
            );

            CREATE TABLE IF NOT EXISTS request_logs (
                id TEXT PRIMARY KEY,
                provider_id TEXT,
                provider_name TEXT,
                started_at TEXT NOT NULL,
                duration_ms INTEGER NOT NULL,
                status_code INTEGER,
                outcome TEXT NOT NULL,
                error TEXT,
                request_bytes INTEGER
            );

            CREATE INDEX IF NOT EXISTS idx_request_logs_started_at
            ON request_logs(started_at DESC);

            CREATE TABLE IF NOT EXISTS request_captures (
                request_id TEXT PRIMARY KEY,
                request_content_type TEXT,
                response_content_type TEXT,
                request_path TEXT,
                response_path TEXT,
                request_captured_bytes INTEGER NOT NULL,
                response_captured_bytes INTEGER NOT NULL,
                request_complete INTEGER NOT NULL,
                response_complete INTEGER NOT NULL,
                capture_error TEXT,
                FOREIGN KEY(request_id) REFERENCES request_logs(id) ON DELETE CASCADE
            );
            "#,
        )
        .map_err(|e| e.to_string())?;
        Ok(Self {
            conn: Mutex::new(conn),
            captures_dir,
        })
    }

    pub fn list_providers(&self) -> Result<Vec<Provider>, String> {
        let conn = self.conn.lock().map_err(|e| e.to_string())?;
        let mut stmt = conn
            .prepare(
                "SELECT id, name, base_url, test_model, extra_headers_json, created_at, updated_at
                 FROM providers ORDER BY created_at ASC",
            )
            .map_err(|e| e.to_string())?;
        let rows = stmt
            .query_map([], |row| {
                let headers_json: String = row.get(4)?;
                let headers: Vec<HeaderPair> =
                    serde_json::from_str(&headers_json).unwrap_or_default();
                Ok(Provider {
                    id: row.get(0)?,
                    name: row.get(1)?,
                    base_url: row.get(2)?,
                    test_model: row.get(3)?,
                    extra_headers: headers,
                    created_at: row.get(5)?,
                    updated_at: row.get(6)?,
                })
            })
            .map_err(|e| e.to_string())?;
        rows.collect::<Result<Vec<_>, _>>()
            .map_err(|e| e.to_string())
    }

    pub fn get_provider(&self, id: &str) -> Result<Option<Provider>, String> {
        let conn = self.conn.lock().map_err(|e| e.to_string())?;
        conn.query_row(
            "SELECT id, name, base_url, test_model, extra_headers_json, created_at, updated_at
             FROM providers WHERE id = ?1",
            [id],
            |row| {
                let headers_json: String = row.get(4)?;
                Ok(Provider {
                    id: row.get(0)?,
                    name: row.get(1)?,
                    base_url: row.get(2)?,
                    test_model: row.get(3)?,
                    extra_headers: serde_json::from_str(&headers_json).unwrap_or_default(),
                    created_at: row.get(5)?,
                    updated_at: row.get(6)?,
                })
            },
        )
        .optional()
        .map_err(|e| e.to_string())
    }

    pub fn save_provider(&self, input: &ProviderInput, id: &str) -> Result<Provider, String> {
        let now = Utc::now().to_rfc3339();
        let headers = serde_json::to_string(&input.extra_headers).map_err(|e| e.to_string())?;
        let conn = self.conn.lock().map_err(|e| e.to_string())?;
        let created_at: Option<String> = conn
            .query_row(
                "SELECT created_at FROM providers WHERE id = ?1",
                [id],
                |row| row.get(0),
            )
            .optional()
            .map_err(|e| e.to_string())?;
        let created_at = created_at.unwrap_or_else(|| now.clone());
        conn.execute(
            "INSERT INTO providers (id, name, base_url, test_model, extra_headers_json, created_at, updated_at)
             VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)
             ON CONFLICT(id) DO UPDATE SET
                name = excluded.name,
                base_url = excluded.base_url,
                test_model = excluded.test_model,
                extra_headers_json = excluded.extra_headers_json,
                updated_at = excluded.updated_at",
            params![id, input.name, input.base_url, input.test_model, headers, created_at, now],
        )
        .map_err(|e| e.to_string())?;
        drop(conn);
        self.get_provider(id)?
            .ok_or_else(|| "Provider 保存后无法读取".to_string())
    }

    pub fn delete_provider(&self, id: &str) -> Result<(), String> {
        let conn = self.conn.lock().map_err(|e| e.to_string())?;
        conn.execute("DELETE FROM providers WHERE id = ?1", [id])
            .map_err(|e| e.to_string())?;
        Ok(())
    }

    pub fn get_setting(&self, key: &str) -> Result<Option<String>, String> {
        let conn = self.conn.lock().map_err(|e| e.to_string())?;
        conn.query_row("SELECT value FROM settings WHERE key = ?1", [key], |row| {
            row.get(0)
        })
        .optional()
        .map_err(|e| e.to_string())
    }

    pub fn set_setting(&self, key: &str, value: &str) -> Result<(), String> {
        let conn = self.conn.lock().map_err(|e| e.to_string())?;
        conn.execute(
            "INSERT INTO settings (key, value) VALUES (?1, ?2)
             ON CONFLICT(key) DO UPDATE SET value = excluded.value",
            params![key, value],
        )
        .map_err(|e| e.to_string())?;
        Ok(())
    }

    pub fn delete_setting(&self, key: &str) -> Result<(), String> {
        let conn = self.conn.lock().map_err(|e| e.to_string())?;
        conn.execute("DELETE FROM settings WHERE key = ?1", [key])
            .map_err(|e| e.to_string())?;
        Ok(())
    }

    pub fn insert_request_log(&self, log: &RequestLog) -> Result<(), String> {
        let conn = self.conn.lock().map_err(|e| e.to_string())?;
        conn.execute(
            "INSERT INTO request_logs
             (id, provider_id, provider_name, started_at, duration_ms, status_code, outcome, error, request_bytes)
             VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9)",
            params![
                log.id,
                log.provider_id,
                log.provider_name,
                log.started_at,
                log.duration_ms,
                log.status_code,
                log.outcome,
                log.error,
                log.request_bytes
            ],
        )
        .map_err(|e| e.to_string())?;
        Ok(())
    }

    pub fn list_request_logs(&self, limit: Option<usize>) -> Result<Vec<RequestLog>, String> {
        let limit = limit
            .map(|limit| limit.min(i64::MAX as usize) as i64)
            .unwrap_or(-1);
        let conn = self.conn.lock().map_err(|e| e.to_string())?;
        let mut stmt = conn
            .prepare(
                "SELECT id, provider_id, provider_name, started_at, duration_ms,
                        status_code, outcome, error, request_bytes,
                        EXISTS(SELECT 1 FROM request_captures WHERE request_id = request_logs.id)
                 FROM request_logs ORDER BY started_at DESC LIMIT ?1",
            )
            .map_err(|e| e.to_string())?;
        let rows = stmt
            .query_map([limit], |row| {
                Ok(RequestLog {
                    id: row.get(0)?,
                    provider_id: row.get(1)?,
                    provider_name: row.get(2)?,
                    started_at: row.get(3)?,
                    duration_ms: row.get(4)?,
                    status_code: row.get::<_, Option<u16>>(5)?,
                    outcome: row.get(6)?,
                    error: row.get(7)?,
                    request_bytes: row.get(8)?,
                    content_captured: row.get(9)?,
                })
            })
            .map_err(|e| e.to_string())?;
        rows.collect::<Result<Vec<_>, _>>()
            .map_err(|e| e.to_string())
    }

    pub fn start_content_capture(
        &self,
        request_id: &str,
        request_content_type: Option<String>,
    ) -> Result<ContentCapture, String> {
        ContentCapture::new(&self.captures_dir, request_id, request_content_type)
    }

    pub fn insert_request_capture(
        &self,
        request_id: &str,
        data: &CaptureData,
    ) -> Result<(), String> {
        let conn = self.conn.lock().map_err(|e| e.to_string())?;
        conn.execute(
            "INSERT INTO request_captures
             (request_id, request_content_type, response_content_type, request_path, response_path,
              request_captured_bytes, response_captured_bytes, request_complete, response_complete, capture_error)
             VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10)",
            params![
                request_id,
                data.request_content_type.as_deref(),
                data.response_content_type.as_deref(),
                data.request_path.as_deref(),
                data.response_path.as_deref(),
                data.request_captured_bytes,
                data.response_captured_bytes,
                data.request_complete,
                data.response_complete,
                data.capture_error.as_deref(),
            ],
        )
        .map_err(|e| e.to_string())?;
        Ok(())
    }

    pub fn get_request_capture(&self, request_id: &str) -> Result<RequestCapture, String> {
        let row = {
            let conn = self.conn.lock().map_err(|e| e.to_string())?;
            conn.query_row(
                "SELECT request_content_type, response_content_type, request_path, response_path,
                        request_captured_bytes, response_captured_bytes, request_complete, response_complete, capture_error
                 FROM request_captures WHERE request_id = ?1",
                [request_id],
                |row| {
                    Ok(CaptureRow {
                        request_content_type: row.get(0)?,
                        response_content_type: row.get(1)?,
                        request_path: row.get(2)?,
                        response_path: row.get(3)?,
                        request_captured_bytes: row.get(4)?,
                        response_captured_bytes: row.get(5)?,
                        request_complete: row.get(6)?,
                        response_complete: row.get(7)?,
                        capture_error: row.get(8)?,
                    })
                },
            )
            .optional()
            .map_err(|e| e.to_string())?
        };
        let Some(row) = row else {
            return Err("未找到该请求的内容记录".to_string());
        };
        Ok(RequestCapture {
            request_content_type: row.request_content_type,
            response_content_type: row.response_content_type,
            request_content: read_capture_file(row.request_path.as_deref())?,
            response_content: read_capture_file(row.response_path.as_deref())?,
            request_captured_bytes: row.request_captured_bytes,
            response_captured_bytes: row.response_captured_bytes,
            request_complete: row.request_complete,
            response_complete: row.response_complete,
            capture_error: row.capture_error,
        })
    }

    pub fn clear_request_captures(&self) -> Result<(), String> {
        let paths = {
            let conn = self.conn.lock().map_err(|e| e.to_string())?;
            let mut stmt = conn
                .prepare("SELECT request_path, response_path FROM request_captures")
                .map_err(|e| e.to_string())?;
            let rows = stmt
                .query_map([], |row| {
                    Ok((
                        row.get::<_, Option<String>>(0)?,
                        row.get::<_, Option<String>>(1)?,
                    ))
                })
                .map_err(|e| e.to_string())?;
            rows.collect::<Result<Vec<_>, _>>()
                .map_err(|e| e.to_string())?
        };
        for (request_path, response_path) in paths {
            for path in [request_path, response_path].into_iter().flatten() {
                match fs::remove_file(&path) {
                    Ok(()) => {}
                    Err(error) if error.kind() == std::io::ErrorKind::NotFound => {}
                    Err(error) => return Err(format!("无法删除内容记录文件: {error}")),
                }
            }
        }
        let conn = self.conn.lock().map_err(|e| e.to_string())?;
        conn.execute("DELETE FROM request_captures", [])
            .map_err(|e| e.to_string())?;
        Ok(())
    }
}

struct CaptureRow {
    request_content_type: Option<String>,
    response_content_type: Option<String>,
    request_path: Option<String>,
    response_path: Option<String>,
    request_captured_bytes: i64,
    response_captured_bytes: i64,
    request_complete: bool,
    response_complete: bool,
    capture_error: Option<String>,
}

pub struct ContentCapture {
    request: Mutex<CaptureFile>,
    response: Mutex<CaptureFile>,
}

impl ContentCapture {
    fn new(
        captures_dir: &Path,
        request_id: &str,
        request_content_type: Option<String>,
    ) -> Result<Self, String> {
        fs::create_dir_all(captures_dir).map_err(|e| format!("无法创建内容记录目录: {e}"))?;
        let request = CaptureFile::new(captures_dir, request_id, "request", request_content_type)?;
        let response = match CaptureFile::new(captures_dir, request_id, "response", None) {
            Ok(response) => response,
            Err(error) => {
                request.discard();
                return Err(error);
            }
        };
        Ok(Self {
            request: Mutex::new(request),
            response: Mutex::new(response),
        })
    }

    pub fn write_request(&self, bytes: &[u8]) {
        if let Ok(mut request) = self.request.lock() {
            request.write(bytes);
        }
    }

    pub fn write_response(&self, bytes: &[u8]) {
        if let Ok(mut response) = self.response.lock() {
            response.write(bytes);
        }
    }

    pub fn set_response_content_type(&self, content_type: Option<String>) {
        if let Ok(mut response) = self.response.lock() {
            response.content_type = content_type;
        }
    }

    pub fn mark_request_complete(&self) {
        if let Ok(mut request) = self.request.lock() {
            request.complete = true;
        }
    }

    pub fn mark_response_complete(&self) {
        if let Ok(mut response) = self.response.lock() {
            response.complete = true;
        }
    }

    pub fn finish(&self) -> CaptureData {
        let request = self
            .request
            .lock()
            .map(|mut request| request.finish())
            .unwrap_or_else(|_| CaptureFileData::lock_error("请求内容记录锁异常"));
        let response = self
            .response
            .lock()
            .map(|mut response| response.finish())
            .unwrap_or_else(|_| CaptureFileData::lock_error("响应内容记录锁异常"));
        let capture_error = [request.error.as_deref(), response.error.as_deref()]
            .into_iter()
            .flatten()
            .collect::<Vec<_>>()
            .join("；");
        CaptureData {
            request_content_type: request.content_type,
            response_content_type: response.content_type,
            request_path: request.path,
            response_path: response.path,
            request_captured_bytes: request.bytes.min(i64::MAX as u64) as i64,
            response_captured_bytes: response.bytes.min(i64::MAX as u64) as i64,
            request_complete: request.complete,
            response_complete: response.complete,
            capture_error: (!capture_error.is_empty()).then_some(capture_error),
        }
    }
}

pub struct CaptureData {
    pub request_content_type: Option<String>,
    pub response_content_type: Option<String>,
    pub request_path: Option<String>,
    pub response_path: Option<String>,
    pub request_captured_bytes: i64,
    pub response_captured_bytes: i64,
    pub request_complete: bool,
    pub response_complete: bool,
    pub capture_error: Option<String>,
}

struct CaptureFile {
    content_type: Option<String>,
    temp_path: PathBuf,
    final_path: PathBuf,
    writer: Option<BufWriter<File>>,
    bytes: u64,
    complete: bool,
    error: Option<String>,
}

impl CaptureFile {
    fn new(
        captures_dir: &Path,
        request_id: &str,
        kind: &str,
        content_type: Option<String>,
    ) -> Result<Self, String> {
        let temp_path = captures_dir.join(format!("{request_id}.{kind}.partial"));
        let final_path = captures_dir.join(format!("{request_id}.{kind}"));
        let file = File::create(&temp_path).map_err(|e| format!("无法创建内容记录文件: {e}"))?;
        Ok(Self {
            content_type,
            temp_path,
            final_path,
            writer: Some(BufWriter::new(file)),
            bytes: 0,
            complete: false,
            error: None,
        })
    }

    fn write(&mut self, bytes: &[u8]) {
        match self.writer.as_mut().map(|writer| writer.write_all(bytes)) {
            Some(Ok(())) => self.bytes = self.bytes.saturating_add(bytes.len() as u64),
            Some(Err(error)) => {
                self.error = Some(format!("写入内容记录失败: {error}"));
                self.writer = None;
            }
            None => {}
        }
    }

    fn finish(&mut self) -> CaptureFileData {
        if let Some(mut writer) = self.writer.take() {
            if let Err(error) = writer.flush() {
                self.error = Some(format!("写入内容记录失败: {error}"));
            }
        }
        let path = if self.error.is_none() {
            match fs::rename(&self.temp_path, &self.final_path) {
                Ok(()) => Some(self.final_path.to_string_lossy().into_owned()),
                Err(error) => {
                    self.error = Some(format!("完成内容记录失败: {error}"));
                    None
                }
            }
        } else {
            let _ = fs::remove_file(&self.temp_path);
            None
        };
        CaptureFileData {
            content_type: self.content_type.clone(),
            path,
            bytes: self.bytes,
            complete: self.complete,
            error: self.error.clone(),
        }
    }

    fn discard(&self) {
        let _ = fs::remove_file(&self.temp_path);
    }
}

struct CaptureFileData {
    content_type: Option<String>,
    path: Option<String>,
    bytes: u64,
    complete: bool,
    error: Option<String>,
}

impl CaptureFileData {
    fn lock_error(message: &str) -> Self {
        Self {
            content_type: None,
            path: None,
            bytes: 0,
            complete: false,
            error: Some(message.to_string()),
        }
    }
}

fn read_capture_file(path: Option<&str>) -> Result<Option<String>, String> {
    let Some(path) = path else {
        return Ok(None);
    };
    let bytes = fs::read(path).map_err(|e| format!("无法读取内容记录文件: {e}"))?;
    Ok(Some(String::from_utf8_lossy(&bytes).into_owned()))
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn stores_complete_request_and_response_content_without_truncation() {
        let temp = tempfile::tempdir().unwrap();
        let db = Database::open(&temp.path().join("test.sqlite3")).unwrap();
        let capture = db
            .start_content_capture("capture-test", Some("application/json".to_string()))
            .unwrap();
        capture.write_request(br#"{"model":"test","input":"hello "#);
        capture.write_request(br#"world"}"#);
        capture.mark_request_complete();
        capture.set_response_content_type(Some("text/event-stream".to_string()));
        capture.write_response(b"event: response.completed\ndata: ");
        capture.write_response(b"{}\n\n");
        capture.mark_response_complete();
        let data = capture.finish();

        db.insert_request_log(&RequestLog {
            id: "capture-test".to_string(),
            provider_id: None,
            provider_name: None,
            started_at: Utc::now().to_rfc3339(),
            duration_ms: 1,
            status_code: Some(200),
            outcome: "completed".to_string(),
            error: None,
            request_bytes: None,
            content_captured: false,
        })
        .unwrap();
        db.insert_request_capture("capture-test", &data).unwrap();

        let stored = db.get_request_capture("capture-test").unwrap();
        assert_eq!(
            stored.request_content.as_deref(),
            Some(r#"{"model":"test","input":"hello world"}"#)
        );
        assert_eq!(
            stored.response_content.as_deref(),
            Some("event: response.completed\ndata: {}\n\n")
        );
        assert!(stored.request_complete);
        assert!(stored.response_complete);
        assert_eq!(
            stored.request_content_type.as_deref(),
            Some("application/json")
        );
        assert_eq!(
            stored.response_content_type.as_deref(),
            Some("text/event-stream")
        );

        db.clear_request_captures().unwrap();
        assert!(db.get_request_capture("capture-test").is_err());
    }
}
