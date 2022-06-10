use wasm_bindgen::prelude::*;
use yew::prelude::*;
use yew_router::prelude::*;

mod pages;
use pages::{switch, Routes};

#[function_component(App)]
fn app() -> Html {
    let elem = gloo::utils::document().create_element("style").unwrap();
    elem.set_text_content(Some(include_str!("global.css")));
    gloo::utils::head().append_child(&elem).unwrap();

    html! {
        <BrowserRouter>
            <Switch<Routes> render={Switch::render(switch)} />
        </BrowserRouter>
    }
}

#[wasm_bindgen(start)]
pub fn main() {
    #[cfg(debug_assertions)]
    console_error_panic_hook::set_once();

    yew::start_app_in_element::<App>(gloo::utils::document().get_element_by_id("app").unwrap());
}

#[allow(dead_code, unused_variables)]
fn console_log(msg: &str) {
    #[cfg(debug_assertions)]
    #[allow(unused_unsafe)]
    unsafe {
        gloo::console::log!(msg)
    };
}

#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;
