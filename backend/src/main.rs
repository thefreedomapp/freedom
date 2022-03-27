#![feature(panic_info_message)]

use once_cell::sync::Lazy;
use rweb::*;
use std::{
  env,
  path::{Path, PathBuf},
  sync::Once,
};

// pub mod api;

pub static FRONTEND_DIST: Lazy<PathBuf> = Lazy::new(|| Path::new(env!("FRONTEND_DIST")).to_owned());
pub const DISCORD: &str = "TheBotlyNoob#1553";
pub const GITHUB: &str = "https://github.com/freedom-app/freedom";

#[tokio::main]
async fn main() {
  set_panic_hook_once(DISCORD.into(), GITHUB.into());

  let port = env::var("PORT").map_or_else(
    |_| {
      env::args()
        .nth(1)
        .map_or(3000, |port| port.parse::<u16>().unwrap_or(3000))
    },
    |port| port.parse::<u16>().unwrap_or(3000),
  );

  println!("Listening on http://127.0.0.1:{}", port);

  serve(filters::fs::dir(&*FRONTEND_DIST))
    .run(([127, 0, 0, 1], port))
    .await;
}

fn set_panic_hook_once(discord: String, github: String) {
  static SET_PANIC_HOOK: Once = Once::new();

  SET_PANIC_HOOK.call_once(|| {
    std::panic::set_hook(Box::new(move |panic_info| {
      eprintln!(
        "Error: \"{}\" At {}",
        panic_info.payload().downcast_ref::<&str>().unwrap_or(
          &&*panic_info
            .message()
            .unwrap_or(&format_args!("(Failed to get panic message)"))
            .as_str()
            .unwrap()
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
        discord, github
      );
    }))
  });
}
