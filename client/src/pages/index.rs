use std::{cell::RefCell, rc::Rc};

use futures::{SinkExt, StreamExt};
use gloo::{
    net::websocket::{futures::WebSocket, Message},
    utils,
};
use wasm_bindgen::{prelude::Closure, JsCast};
use wasm_bindgen_futures::spawn_local;
use yew::prelude::*;

#[function_component(Index)]
pub fn index() -> Html {
    crate::set_title("Chat");

    let location = utils::window().location();
    let host = location.host().unwrap();
    let is_https = location.protocol().unwrap().contains("https");

    let ws = WebSocket::open(&format!(
        "ws{}://{host}/ws/chat",
        if is_https { "s" } else { "" }
    ))
    .unwrap();

    let (write, mut read) = ws.split();
    let write = Box::leak(Box::new(Rc::new(RefCell::new(write))));

    use_effect(|| {
        utils::document()
            .get_element_by_id("input")
            .unwrap()
            .add_event_listener_with_callback(
                "keydown",
                Closure::wrap(Box::new(|event: KeyboardEvent| {
                    if event.key() == "Enter" {
                        let input = utils::document().get_element_by_id("input").unwrap();
                        let input = input.dyn_ref::<web_sys::HtmlInputElement>().unwrap();

                        let msg = String::from(input.value().trim());
                        if msg.is_empty() {
                            return;
                        }

                        input.set_value("");

                        let write = write.clone();
                        spawn_local(async move {
                            write.borrow_mut().send(Message::Text(msg)).await.unwrap();
                        });
                    }
                }) as Box<dyn FnMut(KeyboardEvent)>)
                .into_js_value()
                .unchecked_ref(),
            )
            .unwrap();
        || {}
    });

    use_effect(|| {
        spawn_local(async move {
            while let Some(Ok(Message::Text(msg))) = read.next().await {
                let messages = utils::document().get_element_by_id("messages").unwrap();
                messages.set_inner_html(&format!("{}<br />{msg}", messages.inner_html()));
            }
            crate::console_log("WebSocket Closed");
        });
        || {}
    });

    html! {
        <>
            <h1>{ "Welcome to Freedom." }</h1>
            <br />
            <input type="text" id="input" />
            <br />
            <br />
            <div id="messages"></div>
        </>
    }
}
