use crate::State;
use axum::{
    extract::ws::{Message as WsMessage, WebSocketUpgrade},
    response::Response,
    Extension,
};
use futures_util::{stream::StreamExt, SinkExt};
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Message {
    pub data: String,
}

pub async fn chat(
    ws: WebSocketUpgrade,
    Extension(State { clients, db_client }): Extension<State>,
) -> Response {
    ws.on_upgrade(|socket| async move {
        let (mut sender, mut receiver) = socket.split();

        let collection = db_client
            .database("messages")
            .collection::<Message>("messages");

        if let Ok(mut messages) = collection.find(None, None).await {
            while let Some(Ok(message)) = messages.next().await {
                let _ = sender.send(WsMessage::Text(message.data)).await;
            }
        }

        clients.lock().await.push(sender);

        while let Some(Ok(msg)) = receiver.next().await {
            for client in clients.lock().await.iter_mut() {
                if let WsMessage::Text(data) = msg.clone() {
                    let _ = client.send(msg.clone()).await;
                    let _ = collection.insert_one(Message { data }, None).await;
                }
            }
        }
    })
}
