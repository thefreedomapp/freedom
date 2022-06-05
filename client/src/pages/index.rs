use futures::{SinkExt, StreamExt};
use gloo::{
    net::websocket::{futures::WebSocket, Message},
    utils,
};
use wasm_bindgen_futures::spawn_local;
use yew::prelude::*;

#[function_component(Index)]
pub fn index() -> Html {
    let location = utils::window().location();
    let host = location.host().unwrap();
    let is_https = location.protocol().unwrap() == "https:";
    let ws = WebSocket::open(&format!(
        "ws{}://{host}/ws/chat",
        if is_https { "s" } else { "" }
    ))
    .unwrap();

    let (mut write, mut read) = ws.split();

    spawn_local(async move {
        write
            .send(Message::Text(String::from("test")))
            .await
            .unwrap();
    });

    spawn_local(async move {
        while let Some(msg) = read.next().await {
            crate::console_log(&format!("1. {:?}", msg));
        }
        crate::console_log("WebSocket Closed");
    });

    html! {
        <>
            <h1>{ "Welcome to Freedom." }</h1>
        </>
    }
}
