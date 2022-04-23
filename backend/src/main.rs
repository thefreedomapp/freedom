#![feature(panic_info_message)]
#![feature(type_alias_impl_trait)]

use actix_web::{web, App, HttpServer};
use once_cell::sync::Lazy;
use std::{env, io::Result as IoResult, path::PathBuf, sync::Once};

pub mod api;
pub mod frontend;

pub static FRONTEND_DIR: Lazy<PathBuf> = Lazy::new(|| PathBuf::from(env!("FRONTEND_DIR")));
pub const DISCORD: &str = "TheBotlyNoob#9594";
pub const GITHUB: &str = "https://github.com/freedom-app/freedom";

#[tokio::main]
async fn main() -> IoResult<()> {
    set_panic_hook_once();

    let port = env::var("PORT")
        .ok()
        .and_then(|_| env::args().nth(1))
        .and_then(|port| port.parse().ok())
        .unwrap_or(3000_u16);

    println!("Listening on http://127.0.0.1:{}", port);

    HttpServer::new(|| App::new().route("/{file:.*}", web::get().to(frontend::serve)))
        .bind(("127.0.0.1", port))?
        .run()
        .await
}

fn set_panic_hook_once() {
    static SET_PANIC_HOOK: Once = Once::new();

    SET_PANIC_HOOK.call_once(|| {
        std::panic::set_hook(Box::new(move |panic_info| {
            eprintln!(
                "Error: \"{}\" At {}",
                panic_info.payload().downcast_ref::<&str>().unwrap_or(
                    &&*panic_info
                        .message()
                        .unwrap_or(&format_args!("(Failed to get panic message)"))
                        .to_string()
                ),
                if let Some(location) = panic_info.location() {
                    format!(
                        "{}:{}:{}",
                        location.file(),
                        location.line(),
                        location.column()
                    )
                } else {
                    "(Failed to get panic location)".into()
                }
            );

            eprintln!(
                "Please DM me at {} (Discord), or create an issue on GitHub ({})",
                DISCORD, GITHUB
            );
        }))
    });
}
