use axum::{
    extract::ws::Message,
    http::{header, StatusCode},
    response::Html,
    routing::get,
    Extension, Router,
};
use mongodb::{options::ClientOptions, Client};
use tokio::sync::broadcast;

mod ws;

static CLIENT_WASM: &[u8] = include_bytes!(concat!(env!("OUT_DIR"), "/client_bg.wasm"));
static CLIENT_JS: &[u8] = include_bytes!(concat!(env!("OUT_DIR"), "/client.js"));

#[derive(Debug, Clone)]
pub struct State {
    pub chat_tx: broadcast::Sender<Message>,
    pub db_client: Client,
}

#[tokio::main]
async fn main() {
    let _ = dotenv::dotenv();

    tracing_subscriber::fmt().without_time().init();

    let port = std::env::var("PORT")
        .ok()
        .and_then(|p| p.parse().ok())
        .unwrap_or(3000);

    let mongo_client_opts = ClientOptions::parse(
        &std::env::var("MONGO_URL").expect("Expected a MONGO_URL environment variable"),
    )
    .await
    .expect("Failed to parse MONGO_URL");

    let mongo_client =
        Client::with_options(mongo_client_opts).expect("Failed to connect to MongoDB");

    let (tx, _) = broadcast::channel(u16::MAX as usize);

    let state = State {
        chat_tx: tx,
        db_client: mongo_client,
    };

    let addr = std::net::SocketAddr::from(([0, 0, 0, 0], port));
    tracing::info!("listening on http://127.0.0.1:{port}");

    axum::Server::bind(&addr)
        .serve(
            Router::new()
                .route("/ws/chat", get(ws::chat))
                .layer(Extension(state))
                // static assets
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
                    Html(include_str!("../../client/src/index.html"))
                }))
                .into_make_service(),
        )
        .await
        .unwrap();
}
