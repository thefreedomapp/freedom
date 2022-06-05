use yew::prelude::*;

#[function_component(NotFound)]
pub fn not_found() -> Html {
    html! {
        <h1>{ "404: Not Found" }</h1>
    }
}
