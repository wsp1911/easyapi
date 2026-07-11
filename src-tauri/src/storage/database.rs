use std::{path::Path, sync::Mutex};

use chrono::Utc;
use rusqlite::{params, Connection, OptionalExtension};

use crate::models::{HeaderPair, Provider, ProviderInput, RequestLog};

pub struct Database {
    conn: Mutex<Connection>,
}

impl Database {
    pub fn open(path: &Path) -> Result<Self, String> {
        if let Some(parent) = path.parent() {
            std::fs::create_dir_all(parent).map_err(|e| e.to_string())?;
        }
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
            "#,
        )
        .map_err(|e| e.to_string())?;
        Ok(Self {
            conn: Mutex::new(conn),
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
        conn.execute(
            "DELETE FROM request_logs WHERE id NOT IN
             (SELECT id FROM request_logs ORDER BY started_at DESC LIMIT 500)",
            [],
        )
        .map_err(|e| e.to_string())?;
        Ok(())
    }

    pub fn list_request_logs(&self, limit: usize) -> Result<Vec<RequestLog>, String> {
        let limit = limit.clamp(1, 500) as i64;
        let conn = self.conn.lock().map_err(|e| e.to_string())?;
        let mut stmt = conn
            .prepare(
                "SELECT id, provider_id, provider_name, started_at, duration_ms,
                        status_code, outcome, error, request_bytes
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
                })
            })
            .map_err(|e| e.to_string())?;
        rows.collect::<Result<Vec<_>, _>>()
            .map_err(|e| e.to_string())
    }
}
