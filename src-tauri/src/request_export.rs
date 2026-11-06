use serde::Deserialize;
use tauri::Manager;
use tauri_plugin_clipboard_manager::ClipboardExt;
use tauri_plugin_dialog::DialogExt;

#[derive(Clone, Copy, Deserialize)]
#[serde(rename_all = "lowercase")]
pub enum ExportFormat {
    Json,
    Csv,
    Txt,
}

#[tauri::command]
pub fn copy_request_content(app: tauri::AppHandle, content: String) -> Result<(), String> {
    app.clipboard()
        .write_text(content)
        .map_err(|error| format!("无法复制到剪贴板: {error}"))
}

#[tauri::command]
pub async fn save_request_export(
    app: tauri::AppHandle,
    content: String,
    format: ExportFormat,
) -> Result<Option<String>, String> {
    // Native dialogs and disk writes must not block the UI thread.
    tauri::async_runtime::spawn_blocking(move || {
        let (extension, label) = match format {
            ExportFormat::Json => ("json", "JSON 文件"),
            ExportFormat::Csv => ("csv", "CSV 文件"),
            ExportFormat::Txt => ("txt", "文本文件"),
        };
        let filename = format!(
            "easyapi-requests-{}.{}",
            chrono::Local::now().format("%Y%m%d-%H%M%S"),
            extension
        );
        let mut dialog = app
            .dialog()
            .file()
            .set_title("导出请求记录")
            .set_file_name(filename)
            .add_filter(label, &[extension]);
        if let Some(window) = app.get_webview_window("main") {
            dialog = dialog.set_parent(&window);
        }
        let Some(file) = dialog.blocking_save_file() else {
            return Ok(None);
        };
        let path = file.into_path().map_err(|error| error.to_string())?;
        std::fs::write(&path, content).map_err(|error| format!("无法保存导出文件: {error}"))?;
        Ok(Some(path.to_string_lossy().into_owned()))
    })
    .await
    .map_err(|error| error.to_string())?
}
