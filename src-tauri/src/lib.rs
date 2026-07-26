mod commands;
mod models;
mod proxy;
mod state;
mod storage;

use std::{net::TcpListener as StdTcpListener, sync::Arc};

use tauri::{
    menu::{MenuBuilder, MenuItemBuilder},
    tray::TrayIconBuilder,
    Manager, WindowEvent,
};

use crate::{state::AppState, storage::Database};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tracing_subscriber::fmt()
        .with_env_filter(
            tracing_subscriber::EnvFilter::try_from_default_env()
                .unwrap_or_else(|_| "easyapi=info,tower_http=info".into()),
        )
        .with_target(false)
        .compact()
        .init();

    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .setup(|app| {
            let app_data_dir = app.path().app_data_dir()?;
            let db = Arc::new(Database::open(&app_data_dir.join("easyapi.sqlite3"))?);
            let listen_address = "127.0.0.1:8787".to_string();
            let std_listener = StdTcpListener::bind(&listen_address)
                .map_err(|error| format!("无法监听 {listen_address}，端口可能已被占用: {error}"))?;
            std_listener.set_nonblocking(true)?;

            let state = AppState::new(db, listen_address.clone())?;
            app.manage(state.clone());

            let proxy_state = state.clone();
            tauri::async_runtime::spawn(async move {
                let listener = match tokio::net::TcpListener::from_std(std_listener) {
                    Ok(listener) => listener,
                    Err(error) => {
                        tracing::error!(%error, "failed to create async listener");
                        return;
                    }
                };
                tracing::info!(address = %listen_address, "EasyAPI proxy started");
                if let Err(error) = axum::serve(listener, proxy::router(proxy_state)).await {
                    tracing::error!(%error, "EasyAPI proxy stopped");
                }
            });

            let show = MenuItemBuilder::with_id("show", "显示 EasyAPI").build(app)?;
            let quit = MenuItemBuilder::with_id("quit", "退出").build(app)?;
            let menu = MenuBuilder::new(app).items(&[&show, &quit]).build()?;
            TrayIconBuilder::new()
                .icon(
                    app.default_window_icon()
                        .cloned()
                        .expect("default icon exists"),
                )
                .menu(&menu)
                .show_menu_on_left_click(false)
                .on_menu_event(|app, event| match event.id.as_ref() {
                    "show" => {
                        if let Some(window) = app.get_webview_window("main") {
                            let _ = window.show();
                            let _ = window.set_focus();
                        }
                    }
                    "quit" => app.exit(0),
                    _ => {}
                })
                .build(app)?;

            if let Some(window) = app.get_webview_window("main") {
                let window_for_event = window.clone();
                window.on_window_event(move |event| {
                    if let WindowEvent::CloseRequested { api, .. } = event {
                        api.prevent_close();
                        let _ = window_for_event.hide();
                    }
                });
            }

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            commands::list_providers,
            commands::save_provider,
            commands::delete_provider,
            commands::switch_provider,
            commands::get_status,
            commands::list_request_logs,
            commands::get_codex_setup,
            commands::test_provider,
            commands::list_provider_models,
        ])
        .run(tauri::generate_context!())
        .expect("error while running EasyAPI");
}
