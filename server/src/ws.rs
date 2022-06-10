use crate::State;
use axum::{
    extract::ws::{Message, WebSocketUpgrade},
    response::Response,
    Extension,
};
use futures_util::{stream::StreamExt, SinkExt};

pub async fn chat(
    ws: WebSocketUpgrade,
    Extension(State { clients, .. }): Extension<State>,
) -> Response {
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
