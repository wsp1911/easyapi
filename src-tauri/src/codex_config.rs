use std::{
    env, fs,
    io::{ErrorKind, Write},
    path::{Component, Path, PathBuf},
    sync::Mutex,
};

use serde::{Deserialize, Serialize};
use tempfile::NamedTempFile;
use toml_edit::{DocumentMut, Item, Table, TableLike, Value};

#[derive(Clone, Copy, Debug, Deserialize, Serialize, PartialEq, Eq)]
#[serde(rename_all = "snake_case")]
pub enum ConnectionMode {
    Easyapi,
    Official,
}

impl ConnectionMode {
    fn provider(self) -> &'static str {
        match self {
            Self::Easyapi => "easyapi",
            Self::Official => "openai",
        }
    }
}

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct ConnectionStatus {
    pub config_path: String,
    pub exists: bool,
    pub provider: String,
    pub profile: Option<String>,
}

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct SwitchResult {
    pub status: ConnectionStatus,
    pub changed: bool,
    pub backup_paths: Vec<String>,
}

pub struct CodexConfigManager {
    path: PathBuf,
    lock: Mutex<()>,
}

impl CodexConfigManager {
    pub fn new(home: PathBuf) -> Self {
        let codex_home = env::var_os("CODEX_HOME")
            .filter(|value| !value.is_empty())
            .map(PathBuf::from)
            .unwrap_or_else(|| home.join(".codex"));
        Self::at(codex_home.join("config.toml"))
    }

    fn at(path: PathBuf) -> Self {
        Self {
            path,
            lock: Mutex::new(()),
        }
    }

    pub fn status(&self) -> Result<ConnectionStatus, String> {
        let _lock = self.lock.lock().map_err(|_| "无法锁定 Codex 配置")?;
        let files = self.load()?;
        Ok(self.describe(&files))
    }

    // Only the user configuration and its default profile are edited. Explicit
    // CLI --profile / -c overrides belong to the process that supplies them.
    fn load(&self) -> Result<Vec<ConfigFile>, String> {
        let root = ConfigFile::read(&self.path)?;
        let profile = root.doc.get("profile").and_then(Item::as_str);
        let profile_path = profile
            .map(|name| {
                if name.is_empty()
                    || Path::new(name).components().count() != 1
                    || !matches!(
                        Path::new(name).components().next(),
                        Some(Component::Normal(_))
                    )
                    || name.contains(['/', '\\'])
                {
                    return Err("Codex 默认 profile 名称无效，无法安全切换配置".to_string());
                }
                Ok(self.path.with_file_name(format!("{name}.config.toml")))
            })
            .transpose()?;
        let mut files = vec![root];
        if let Some(path) = profile_path {
            let profile_file = ConfigFile::read(&path)?;
            if profile_file.original.is_some() {
                if profile_file.path == files[0].path {
                    return Err("Codex profile 与主配置指向同一文件，无法切换".to_string());
                }
                files.push(profile_file);
            }
        }
        Ok(files)
    }

    fn describe(&self, files: &[ConfigFile]) -> ConnectionStatus {
        let root = &files[0];
        let profile = root.doc.get("profile").and_then(Item::as_str);
        let inline = profile.and_then(|name| root.doc.get("profiles")?.get(name));
        let provider = files
            .get(1)
            .and_then(|file| file.doc.get("model_provider"))
            .or_else(|| inline.and_then(|item| item.get("model_provider")))
            .or_else(|| root.doc.get("model_provider"))
            .and_then(Item::as_str)
            .unwrap_or("openai");
        ConnectionStatus {
            config_path: self.path.to_string_lossy().into_owned(),
            exists: root.original.is_some(),
            provider: provider.to_string(),
            profile: profile.map(str::to_string),
        }
    }

    pub fn switch(
        &self,
        mode: ConnectionMode,
        easyapi_template: &str,
    ) -> Result<SwitchResult, String> {
        let _lock = self.lock.lock().map_err(|_| "无法锁定 Codex 配置")?;
        let mut files = self.load()?;
        let template = parse(easyapi_template)?;
        // Do not claim subscription access while an explicit API-only login
        // restriction or custom ChatGPT endpoint would prevent that behavior.
        if mode == ConnectionMode::Official {
            for file in &files {
                check_official_settings(file.doc.as_table())?;
            }
        }
        for file in &mut files {
            let profile = file
                .doc
                .get("profile")
                .and_then(Item::as_str)
                .map(str::to_string);
            if let Some(profile) = profile {
                if let Some(item) = file
                    .doc
                    .get_mut("profiles")
                    .and_then(|p| p.get_mut(&profile))
                {
                    let table = item
                        .as_table_like_mut()
                        .ok_or("Codex 默认 profile 必须是 TOML 表")?;
                    if mode == ConnectionMode::Official {
                        check_official_settings(table)?;
                    }
                    if table.contains_key("model_provider") {
                        set_string(table, "model_provider", mode.provider());
                    }
                    if mode == ConnectionMode::Easyapi
                        && table
                            .get("model_providers")
                            .and_then(|p| p.get("easyapi"))
                            .is_some()
                    {
                        install_easyapi(table, &template)?;
                    }
                }
            }
            set_string(file.doc.as_table_mut(), "model_provider", mode.provider());
            if mode == ConnectionMode::Easyapi {
                install_easyapi(file.doc.as_table_mut(), &template)?;
            }
        }
        let changed = files.iter().any(ConfigFile::changed);
        let backup_paths = commit(&files)?;
        let mut status = self.describe(&files);
        status.exists = true;
        Ok(SwitchResult {
            status,
            changed,
            backup_paths,
        })
    }
}

fn check_official_settings(table: &dyn TableLike) -> Result<(), String> {
    if table.get("forced_login_method").and_then(Item::as_str) == Some("api") {
        return Err("当前配置 forced_login_method = \"api\" 限制了订阅登录，请先移除该限制再切换（原配置未修改）".to_string());
    }
    if table
        .get("chatgpt_base_url")
        .and_then(Item::as_str)
        .is_some_and(|url| {
            !matches!(
                url.trim_end_matches('/'),
                "https://chatgpt.com/backend-api" | "https://chatgpt.com/backend-api/codex"
            )
        })
    {
        return Err(
            "当前配置使用自定义 chatgpt_base_url，请先恢复官方地址再切换订阅直连（原配置未修改）"
                .to_string(),
        );
    }
    Ok(())
}

fn parse(text: &str) -> Result<DocumentMut, String> {
    // Parser errors can include source lines containing credentials.
    text.parse()
        .map_err(|_| "Codex 配置不是有效的 TOML，请先修复配置（原文件未修改）".to_string())
}

fn set_string(table: &mut dyn TableLike, key: &str, text: &str) {
    if table.get(key).and_then(Item::as_str) == Some(text) {
        return;
    }
    set_value(table, key, Value::from(text));
}

fn set_value(table: &mut dyn TableLike, key: &str, mut value: Value) {
    if let Some(old) = table.get(key).and_then(Item::as_value) {
        *value.decor_mut() = old.decor().clone();
    }
    // Replacing through get_mut retains the original key's prefix comments
    // and spelling; TableLike::insert replaces the decorated key as well.
    if let Some(item) = table.get_mut(key) {
        *item = Item::Value(value);
    } else {
        table.insert(key, Item::Value(value));
    }
}

fn child_table<'a>(
    parent: &'a mut dyn TableLike,
    key: &str,
) -> Result<&'a mut dyn TableLike, String> {
    if !parent.contains_key(key) {
        let mut table = Table::new();
        table.set_implicit(true);
        parent.insert(key, Item::Table(table));
    }
    parent
        .get_mut(key)
        .and_then(Item::as_table_like_mut)
        .ok_or_else(|| format!("Codex 配置中的 {key} 必须是 TOML 表（原文件未修改）"))
}

fn install_easyapi(root: &mut dyn TableLike, template: &DocumentMut) -> Result<(), String> {
    let providers = child_table(root, "model_providers")?;
    let provider = child_table(providers, "easyapi")?;
    let source = template["model_providers"]["easyapi"]
        .as_table_like()
        .ok_or("EasyAPI 配置模板无效")?;
    for key in ["env_key", "experimental_bearer_token", "auth"] {
        provider.remove(key);
    }
    for (key, item) in source.iter().filter(|(key, _)| *key != "http_headers") {
        let value = item.as_value().ok_or("EasyAPI 配置模板无效")?;
        if let Some(text) = value.as_str() {
            set_string(provider, key, text);
        } else {
            set_value(provider, key, value.clone());
        }
    }
    // Retain user headers, but remove competing authentication headers.
    if let Some(headers) = provider.get_mut("env_http_headers") {
        let headers = headers
            .as_table_like_mut()
            .ok_or("env_http_headers 必须是 TOML 表")?;
        remove_auth_headers(headers, false);
    }
    let headers = child_table(provider, "http_headers")?;
    remove_auth_headers(headers, true);
    let source_headers = source
        .get("http_headers")
        .and_then(Item::as_table_like)
        .ok_or("EasyAPI 配置模板无效")?;
    for (key, item) in source_headers.iter() {
        set_string(headers, key, item.as_str().ok_or("EasyAPI 请求头模板无效")?);
    }
    Ok(())
}

fn remove_auth_headers(headers: &mut dyn TableLike, keep_canonical: bool) {
    let keys: Vec<String> = headers
        .iter()
        .filter(|(key, _)| {
            (key.eq_ignore_ascii_case("authorization")
                || key.eq_ignore_ascii_case("x-openai-actor-authorization"))
                && !(keep_canonical
                    && matches!(*key, "Authorization" | "x-openai-actor-authorization"))
        })
        .map(|(key, _)| key.to_string())
        .collect();
    for key in keys {
        headers.remove(&key);
    }
}

struct ConfigFile {
    path: PathBuf,
    original: Option<Vec<u8>>,
    doc: DocumentMut,
}

impl ConfigFile {
    fn read(path: &Path) -> Result<Self, String> {
        // Follow existing symlinks so atomic replacement preserves the link.
        let path = match fs::symlink_metadata(path) {
            Ok(meta) if meta.file_type().is_symlink() => {
                fs::canonicalize(path).map_err(|e| format!("无法解析 Codex 配置链接: {e}"))?
            }
            Ok(_) => path.to_path_buf(),
            Err(e) if e.kind() == ErrorKind::NotFound => path.to_path_buf(),
            Err(e) => return Err(format!("无法检查 Codex 配置: {e}")),
        };
        let original = read_optional(&path)?;
        let text = std::str::from_utf8(original.as_deref().unwrap_or_default())
            .map_err(|_| "Codex 配置必须使用 UTF-8 编码（原文件未修改）")?;
        let doc = parse(text)?;
        Ok(Self {
            path,
            original,
            doc,
        })
    }

    fn changed(&self) -> bool {
        self.original.as_deref() != Some(self.doc.to_string().as_bytes())
    }
}

fn read_optional(path: &Path) -> Result<Option<Vec<u8>>, String> {
    match fs::read(path) {
        Ok(bytes) => Ok(Some(bytes)),
        Err(e) if e.kind() == ErrorKind::NotFound => Ok(None),
        Err(e) => Err(format!("无法读取 Codex 配置: {e}")),
    }
}

fn stage(path: &Path, bytes: &[u8]) -> Result<NamedTempFile, String> {
    let parent = path.parent().ok_or("Codex 配置路径无效")?;
    fs::create_dir_all(parent).map_err(|e| format!("无法创建 Codex 配置目录: {e}"))?;
    let mut file = NamedTempFile::new_in(parent).map_err(|e| format!("无法创建临时配置: {e}"))?;
    file.write_all(bytes)
        .and_then(|_| file.as_file().sync_all())
        .map_err(|e| format!("无法写入临时配置: {e}"))?;
    // NamedTempFile defaults to owner-only access on Unix. Configs and backups
    // can contain local tokens, so do not copy more permissive source modes.
    Ok(file)
}

fn commit(files: &[ConfigFile]) -> Result<Vec<String>, String> {
    let changed: Vec<_> = files.iter().filter(|file| file.changed()).collect();
    let mut staged = Vec::new();
    let mut backups = Vec::new();
    // Prepare every write and backup before replacing any configuration.
    for file in &changed {
        staged.push(stage(&file.path, file.doc.to_string().as_bytes())?);
        if let Some(original) = &file.original {
            let backup_path = file.path.with_file_name(format!(
                "{}.easyapi-{}-{}.bak",
                file.path
                    .file_name()
                    .ok_or("Codex 配置路径无效")?
                    .to_string_lossy(),
                chrono::Utc::now().format("%Y%m%dT%H%M%SZ"),
                uuid::Uuid::new_v4()
            ));
            stage(&file.path, original)?
                .persist_noclobber(&backup_path)
                .map_err(|e| format!("无法备份 Codex 配置，未执行切换: {}", e.error))?;
            backups.push(backup_path.to_string_lossy().into_owned());
        }
    }
    // Check all sources, including inherited config that did not need editing.
    for file in files {
        if read_optional(&file.path)? != file.original {
            return Err("Codex 配置已被其他程序修改，请刷新后重试（未执行切换）".to_string());
        }
    }
    for (index, (file, temp)) in changed.iter().zip(staged).enumerate() {
        if let Err(error) = temp.persist(&file.path) {
            let mut rollback_errors = Vec::new();
            for previous in &changed[..index] {
                let result = match &previous.original {
                    Some(bytes) => stage(&previous.path, bytes).and_then(|temp| {
                        temp.persist(&previous.path)
                            .map(|_| ())
                            .map_err(|e| e.error.to_string())
                    }),
                    None => fs::remove_file(&previous.path).map_err(|e| e.to_string()),
                };
                if let Err(e) = result {
                    rollback_errors.push(e);
                }
            }
            return Err(format!(
                "无法替换 Codex 配置: {}。{}备份：{}",
                error.error,
                if rollback_errors.is_empty() {
                    "已恢复原配置。".to_string()
                } else {
                    format!("部分配置恢复失败：{}。", rollback_errors.join("；"))
                },
                backups.join("、")
            ));
        }
    }
    Ok(backups)
}

#[cfg(test)]
mod tests {
    use super::*;

    const TEMPLATE: &str = r#"model_provider = "easyapi"
[model_providers.easyapi]
name = "EasyAPI Local Proxy"
base_url = "http://127.0.0.1:8787/v1"
wire_api = "responses"
supports_websockets = false
requires_openai_auth = false
http_headers = { Authorization = "Bearer test-local-token", "x-openai-actor-authorization" = "easyapi" }
"#;

    fn fixture(text: Option<&str>) -> (tempfile::TempDir, CodexConfigManager) {
        let dir = tempfile::tempdir().unwrap();
        let manager = CodexConfigManager::at(dir.path().join("config.toml"));
        if let Some(text) = text {
            fs::write(&manager.path, text).unwrap();
        }
        (dir, manager)
    }

    fn document(path: &Path) -> DocumentMut {
        parse(&fs::read_to_string(path).unwrap()).unwrap()
    }

    #[test]
    fn creates_missing_config_and_switches_without_environment_token() {
        let (_dir, manager) = fixture(None);
        assert!(!manager.status().unwrap().exists);
        assert!(!manager.path.exists()); // Status is read-only.
        let result = manager.switch(ConnectionMode::Easyapi, TEMPLATE).unwrap();
        assert!(result.changed);
        assert!(result.status.exists);
        assert!(result.backup_paths.is_empty());
        assert_eq!(result.status.provider, "easyapi");
        let doc = document(&manager.path);
        assert_eq!(
            doc["model_providers"]["easyapi"]["http_headers"]["Authorization"].as_str(),
            Some("Bearer test-local-token")
        );
        assert!(doc["model_providers"]["easyapi"].get("env_key").is_none());
        let direct = manager.switch(ConnectionMode::Official, TEMPLATE).unwrap();
        assert_eq!(direct.status.provider, "openai");
        assert_eq!(
            document(&manager.path)["model_providers"]["easyapi"].to_string(),
            doc["model_providers"]["easyapi"].to_string()
        );
    }

    #[test]
    fn preserves_other_settings_comments_and_exact_backup_with_noop_repeat() {
        let original = r#"# My Codex configuration
model_provider = 'other' # Keep this comment
model = 'my-model'
model_reasoning_effort = 'high'
[mcp_servers.local]
command = 'my-server' # Keep MCP comment
args = ['--stdio']
[model_providers.other]
base_url = 'https://example.test/v1'
[profiles.unused]
model_provider = 'other'
"#;
        let (_dir, manager) = fixture(Some(original));
        let result = manager.switch(ConnectionMode::Easyapi, TEMPLATE).unwrap();
        assert_eq!(result.backup_paths.len(), 1);
        assert_eq!(
            fs::read_to_string(&result.backup_paths[0]).unwrap(),
            original
        );
        let text = fs::read_to_string(&manager.path).unwrap();
        assert!(text.contains("# My Codex configuration"));
        assert!(text.contains("# Keep this comment"));
        assert!(text.contains("command = 'my-server' # Keep MCP comment"));
        let doc = parse(&text).unwrap();
        assert_eq!(doc["model"].as_str(), Some("my-model"));
        assert_eq!(
            doc["profiles"]["unused"]["model_provider"].as_str(),
            Some("other")
        );
        assert_eq!(
            doc["model_providers"]["other"]["base_url"].as_str(),
            Some("https://example.test/v1")
        );
        let repeat = manager.switch(ConnectionMode::Easyapi, TEMPLATE).unwrap();
        assert!(!repeat.changed);
        assert!(repeat.backup_paths.is_empty());
        assert_eq!(fs::read_to_string(&manager.path).unwrap(), text);
        let direct = manager.switch(ConnectionMode::Official, TEMPLATE).unwrap();
        assert_ne!(direct.backup_paths[0], result.backup_paths[0]);
        assert_eq!(
            fs::read_to_string(&result.backup_paths[0]).unwrap(),
            original
        );
    }

    #[test]
    fn updates_existing_provider_and_preserves_custom_headers_and_options() {
        for original in [
            r#"[model_providers.easyapi]
base_url = 'http://old.test/v1'
env_key = 'OLD_TOKEN'
experimental_bearer_token = 'old'
auth = { command = 'old-auth' }
request_max_retries = 2
http_headers = { authorization = 'old', 'X-Custom' = 'keep' }
env_http_headers = { AUTHORIZATION = 'OLD_AUTH', 'X-Trace' = 'TRACE_ID' }
"#,
            r#"model_providers = { easyapi = { env_key = 'OLD_TOKEN', http_headers = { 'X-Custom' = 'keep', authorization = 'old' }, env_http_headers = { AUTHORIZATION = 'OLD_AUTH', 'X-Trace' = 'TRACE_ID' }, request_max_retries = 2 } }
"#,
        ] {
            let (_dir, manager) = fixture(Some(original));
            manager.switch(ConnectionMode::Easyapi, TEMPLATE).unwrap();
            let doc = document(&manager.path);
            let provider = &doc["model_providers"]["easyapi"];
            assert_eq!(
                provider["base_url"].as_str(),
                Some("http://127.0.0.1:8787/v1")
            );
            assert_eq!(provider["request_max_retries"].as_integer(), Some(2));
            assert_eq!(provider["http_headers"]["X-Custom"].as_str(), Some("keep"));
            assert_eq!(
                provider["env_http_headers"]["X-Trace"].as_str(),
                Some("TRACE_ID")
            );
            for key in ["env_key", "experimental_bearer_token", "auth"] {
                assert!(provider.get(key).is_none());
            }
            assert!(provider["http_headers"].get("authorization").is_none());
            assert!(provider["env_http_headers"].get("AUTHORIZATION").is_none());
            assert!(
                !manager
                    .switch(ConnectionMode::Easyapi, TEMPLATE)
                    .unwrap()
                    .changed
            );
        }
    }

    #[test]
    fn switches_selected_profiles_and_leaves_other_profiles_and_auth_untouched() {
        let (_dir, manager) = fixture(Some(
            r#"profile = 'work'
model_provider = 'other'
[profiles.work]
model_provider = 'inline-provider' # profile provider
model = 'profile-model'
[profiles.work.model_providers.easyapi]
base_url = 'http://stale.test'
env_key = 'STALE'
[profiles.other]
model_provider = 'keep'
"#,
        ));
        let profile_path = manager.path.with_file_name("work.config.toml");
        let profile_original =
            "# Separate profile\nmodel_provider = 'external-provider'\nmodel = 'external-model'\n";
        fs::write(&profile_path, profile_original).unwrap();
        let auth_path = manager.path.with_file_name("auth.json");
        fs::write(&auth_path, "do not touch auth").unwrap();
        assert_eq!(manager.status().unwrap().provider, "external-provider");
        let result = manager.switch(ConnectionMode::Easyapi, TEMPLATE).unwrap();
        assert_eq!(result.backup_paths.len(), 2);
        let root = document(&manager.path);
        assert_eq!(
            root["profiles"]["work"]["model_provider"].as_str(),
            Some("easyapi")
        );
        assert_eq!(
            root["profiles"]["work"]["model_providers"]["easyapi"]["base_url"].as_str(),
            Some("http://127.0.0.1:8787/v1")
        );
        assert_eq!(
            root["profiles"]["other"]["model_provider"].as_str(),
            Some("keep")
        );
        assert_eq!(
            document(&profile_path)["model"].as_str(),
            Some("external-model")
        );
        manager.switch(ConnectionMode::Official, TEMPLATE).unwrap();
        assert_eq!(
            document(&profile_path)["model_provider"].as_str(),
            Some("openai")
        );
        assert_eq!(manager.status().unwrap().provider, "openai");
        assert_eq!(fs::read_to_string(auth_path).unwrap(), "do not touch auth");
    }

    #[test]
    fn inline_profile_override_is_reported_and_switched() {
        let (_dir, manager) = fixture(Some(
            "profile = 'work'\n[profiles.work]\nmodel_provider = 'other'\n",
        ));
        assert_eq!(manager.status().unwrap().provider, "other");
        manager.switch(ConnectionMode::Official, TEMPLATE).unwrap();
        assert_eq!(manager.status().unwrap().provider, "openai");
        assert_eq!(
            document(&manager.path)["profiles"]["work"]["model_provider"].as_str(),
            Some("openai")
        );
    }

    #[test]
    fn refuses_invalid_configuration_without_overwriting_or_leaking_source() {
        for original in [
            "model_provider = 'easyapi'\ninvalid = [ # secret-local-token",
            "model_providers = 'wrong-type'\n",
            "profile = '../outside'\n",
        ] {
            let (dir, manager) = fixture(Some(original));
            let error = manager
                .switch(ConnectionMode::Easyapi, TEMPLATE)
                .unwrap_err();
            assert!(!error.contains("secret-local-token"));
            assert_eq!(fs::read_to_string(&manager.path).unwrap(), original);
            assert_eq!(fs::read_dir(dir.path()).unwrap().count(), 1);
        }
    }

    #[test]
    fn refuses_subscription_when_auth_or_endpoint_settings_conflict() {
        for original in [
            "forced_login_method = 'api'\n",
            "chatgpt_base_url = 'https://custom.test'\n",
            "profile = 'work'\n[profiles.work]\nforced_login_method = 'api'\n",
        ] {
            let (_dir, manager) = fixture(Some(original));
            assert!(manager.switch(ConnectionMode::Official, TEMPLATE).is_err());
            assert_eq!(fs::read_to_string(&manager.path).unwrap(), original);
        }
    }

    #[test]
    fn refuses_concurrent_external_edits() {
        let (_dir, manager) = fixture(Some("model = 'old'\n"));
        let mut files = manager.load().unwrap();
        set_string(files[0].doc.as_table_mut(), "model_provider", "easyapi");
        fs::write(&manager.path, "model = 'external-edit'\n").unwrap();
        assert!(commit(&files).unwrap_err().contains("其他程序修改"));
        assert_eq!(
            fs::read_to_string(&manager.path).unwrap(),
            "model = 'external-edit'\n"
        );
    }

    #[test]
    fn prepares_every_file_before_changing_any_config() {
        let (dir, manager) = fixture(Some("model = 'keep'\n"));
        let mut files = manager.load().unwrap();
        set_string(files[0].doc.as_table_mut(), "model_provider", "easyapi");
        let blocker = dir.path().join("not-a-directory");
        fs::write(&blocker, "block writes").unwrap();
        files.push(ConfigFile {
            path: blocker.join("profile.config.toml"),
            original: None,
            doc: parse("model_provider = 'easyapi'\n").unwrap(),
        });
        assert!(commit(&files).is_err());
        assert_eq!(
            fs::read_to_string(&manager.path).unwrap(),
            "model = 'keep'\n"
        );
    }

    #[cfg(unix)]
    #[test]
    fn preserves_symlink_and_keeps_config_and_backups_private() {
        use std::os::unix::{fs::symlink, fs::PermissionsExt};
        let (dir, manager) = fixture(None);
        let target = dir.path().join("real-config.toml");
        fs::write(&target, "model = 'keep'\n").unwrap();
        symlink(&target, &manager.path).unwrap();
        let result = manager.switch(ConnectionMode::Easyapi, TEMPLATE).unwrap();
        assert!(fs::symlink_metadata(&manager.path)
            .unwrap()
            .file_type()
            .is_symlink());
        assert_eq!(
            document(&target)["model_provider"].as_str(),
            Some("easyapi")
        );
        for path in [&target, Path::new(&result.backup_paths[0])] {
            assert_eq!(
                fs::metadata(path).unwrap().permissions().mode() & 0o777,
                0o600
            );
        }
    }
}
