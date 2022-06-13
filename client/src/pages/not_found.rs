use yew::prelude::*;

#[function_component(NotFound)]
pub fn not_found() -> Html {
    crate::set_title("Where am I?");

    html! {
        <h1>{ "404: Not Found" }</h1>
    }
}
