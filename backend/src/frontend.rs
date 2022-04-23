use actix_web::{http::header::ContentType, web::Path, HttpResponse};
use rust_embed::RustEmbed;
use std::path::Path as StdPath;
use tokio::fs;

#[derive(RustEmbed)]
#[folder = "$FRONTEND_DIR"]
pub struct FrontendAssets;

pub async fn serve(path: Path<String>) -> HttpResponse {
    let raw_path = path.into_inner();

    let path = StdPath::new(&raw_path);

    if raw_path.contains("..") {
        HttpResponse::Forbidden().body("file paths containing `..` are forbidden")
    } else if path.is_absolute() {
        HttpResponse::Forbidden()
            .reason("absolute path")
            .body("absolute paths are forbidden.")
    } else {
        HttpResponse::Ok()
            .content_type(ContentType::html())
            .body("body")
    }
}
