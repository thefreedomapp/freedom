mod index;
pub use index::Index;
pub mod not_found;
pub use not_found::NotFound;

use yew::prelude::*;
use yew_router::prelude::*;

#[derive(Routable, Clone, PartialEq, Eq, Copy)]
pub enum Routes {
    #[at("/")]
    Index,
    #[not_found]
    #[at("/404")]
    NotFound,
}

pub fn switch(route: &Routes) -> Html {
    match *route {
        Routes::Index => {
            html! {
                <Index />
            }
        }
        Routes::NotFound => {
            html! {
                <NotFound />
            }
        }
    }
}
