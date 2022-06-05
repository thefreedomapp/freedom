use axum::{
    http::{header, StatusCode},
    routing::get,
    Router,
};

mod ws;

static CLIENT_WASM: &[u8] = include_bytes!(concat!(env!("OUT_DIR"), "/client_bg.wasm"));
static CLIENT_JS: &[u8] = include_bytes!(concat!(env!("OUT_DIR"), "/client.js"));

#[tokio::main]
async fn main() {
    tracing_subscriber::fmt().without_time().init();

    let port = std::env::var("PORT")
        .ok()
        .and_then(|p| p.parse().ok())
        .unwrap_or(3000);

    let addr = std::net::SocketAddr::from(([0, 0, 0, 0], port));
    tracing::info!("listening on http://127.0.0.1:{port}");

    axum::Server::bind(&addr)
        .serve(
            Router::new()
                .route("/ws/chat", get(ws::chat))
                .route(
                    "/assets/client.wasm",
                    get(|| async { ([(header::CONTENT_TYPE, "application/wasm")], CLIENT_WASM) }),
                )
                .route(
                    "/assets/client.js",
                    get(|| async { ([(header::CONTENT_TYPE, "text/javascript")], CLIENT_JS) }),
                )
                // FIXME: add a logo
                .route("/favicon.ico", get(|| async { StatusCode::NOT_FOUND }))
                .fallback(get(|| async {
                    (
                        [(header::CONTENT_TYPE, "text/html")],
                        include_str!("../../client/src/index.html"),
                    )
                }))
                .into_make_service(),
        )
        .await
        .unwrap();
}
