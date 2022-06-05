use axum::{
    http::{header, StatusCode},
    routing::get,
    Router,
};

#[derive(rust_embed::RustEmbed)]
#[folder = "$OUT_DIR"]
struct Frontend;

#[tokio::main]
async fn main() {
    tracing_subscriber::fmt().without_time().init();

    let addr = std::net::SocketAddr::from(([0, 0, 0, 0], 3000));
    tracing::info!("listening on http://localhost:3000");

    axum::Server::bind(&addr)
        .serve(
            Router::new()
                .route(
                    "/assets/client.wasm",
                    get(|| async {
                        (
                            [(header::CONTENT_TYPE, "application/wasm")],
                            Frontend::get("client_bg.wasm").unwrap().data,
                        )
                    }),
                )
                .route(
                    "/assets/client.js",
                    get(|| async {
                        (
                            [(header::CONTENT_TYPE, "text/javascript")],
                            Frontend::get("client.js").unwrap().data,
                        )
                    }),
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
