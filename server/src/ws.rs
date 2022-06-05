use axum::extract::ws::{WebSocket, WebSocketUpgrade};

pub async fn chat(ws: WebSocketUpgrade) {
    ws.on_upgrade(inner);
    async fn inner(mut socket: WebSocket) {
        println!("Hi!");
        while let Some(msg) = socket.recv().await {
            let msg = if let Ok(msg) = msg {
                msg
            } else {
                println!("err1 {:#?}", msg.unwrap_err());
                // client disconnected
                return;
            };

            if socket.send(msg).await.is_err() {
                println!("err2");
                // client disconnected
                return;
            }
        }
    }
}
