use axum::{
    extract::ws::{WebSocket, WebSocketUpgrade},
    response::Response,
};

pub async fn chat(ws: WebSocketUpgrade) -> Response {
    async fn inner(mut socket: WebSocket) {
        while let Some(msg) = socket.recv().await {
            let msg = if let Ok(msg) = msg {
                msg
            } else {
                // client disconnected
                return;
            };

            if socket.send(msg).await.is_err() {
                // client disconnected
                return;
            }
        }
    }

    ws.on_upgrade(inner)
}
