use actix_web::{http::header::ContentType, web::Path, HttpResponse};
use rust_embed::RustEmbed;
use std::borrow::Cow;

#[derive(RustEmbed)]
#[folder = "$FRONTEND_DIST"]
pub struct FrontendAssets;

pub async fn serve(path: Path<String>) -> HttpResponse {
    let raw_path = path.into_inner();

    let file = if raw_path.is_empty() {
        (
            ContentType::html(),
            FrontendAssets::get("index.html")
                .map(|file| file.data)
                .unwrap_or(Cow::Borrowed(b"<h1>Index file not found.</h1>")),
        )
    } else {
        match FrontendAssets::get(&raw_path) {
            Some(file) => (
                mime_guess::from_path(&raw_path)
                    .first()
                    .map(ContentType)
                    .unwrap_or_else(ContentType::plaintext),
                file.data,
            ),
            None => (
                ContentType::html(),
                FrontendAssets::get(&format!("{raw_path}.html"))
                    .or_else(|| FrontendAssets::get(&format!("{raw_path}/index.html")))
                    .or_else(|| FrontendAssets::get("404.html"))
                    .map(|file| file.data)
                    .unwrap_or(Cow::Borrowed(b"<h1>404</h1>")),
            ),
        }
    };

    let mut res = HttpResponse::Ok();

    res.content_type(file.0);

    match file.1 {
        Cow::Borrowed(data) => res.body(data),
        Cow::Owned(data) => res.body(data),
    }
}
