use crate::State;
use axum::{extract::ws::WebSocketUpgrade, response::Response, Extension};
use futures_util::{stream::StreamExt, SinkExt};
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Message {
    pub data: String,
}

pub async fn chat(
    ws: WebSocketUpgrade,
    Extension(State { chat_tx, .. }): Extension<State>,
) -> Response {
    ws.on_upgrade(|socket| async move {
        let (mut sender, mut receiver) = socket.split();

        let mut subscriber = chat_tx.subscribe();

        tokio::spawn(async move {
            while let Some(Ok(msg)) = receiver.next().await {
                let _ = chat_tx.send(msg);
            }
        });

        while let Ok(msg) = subscriber.recv().await {
            let _ = sender.send(msg).await;
        }
    })
}
