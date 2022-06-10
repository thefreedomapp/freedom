use axum::{
    extract::ws::{Message, WebSocket, WebSocketUpgrade},
    response::Response,
    Extension,
};
use futures_util::{
    stream::{SplitSink, StreamExt},
    SinkExt,
};
use std::sync::Arc;
use tokio::sync::Mutex;

pub type Clients = Arc<Mutex<Vec<SplitSink<WebSocket, Message>>>>;

pub async fn chat(ws: WebSocketUpgrade, Extension(clients): Extension<Clients>) -> Response {
    ws.on_upgrade(|socket| async move {
        let (sender, mut receiver) = socket.split();

        clients.lock().await.push(sender);

        while let Some(Ok(msg)) = receiver.next().await {
            for client in clients.lock().await.iter_mut() {
                if let Message::Text(_) = msg {
                    let _ = client.send(msg.clone()).await;
                }
            }
        }
    })
}
