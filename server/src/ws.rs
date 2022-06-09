use axum::{
    extract::ws::{Message, WebSocket, WebSocketUpgrade},
    response::Response,
};
use futures_util::{
    stream::{SplitSink, StreamExt},
    SinkExt,
};
use once_cell::sync::Lazy;
use tokio::sync::Mutex;

static CLIENTS: Lazy<Mutex<Vec<SplitSink<WebSocket, Message>>>> =
    Lazy::new(|| Mutex::new(Vec::new()));

pub async fn chat(ws: WebSocketUpgrade) -> Response {
    ws.on_upgrade(|socket| async move {
        let (sender, mut receiver) = socket.split();

        CLIENTS.lock().await.push(sender);

        while let Some(Ok(msg)) = receiver.next().await {
            for client in CLIENTS.lock().await.iter_mut() {
                if let Message::Text(_) = msg {
                    let _ = client.send(msg.clone()).await;
                }
            }
        }
    })
}
