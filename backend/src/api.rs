use once_cell::sync::Lazy;
use warp::{filters::BoxedFilter, Filter};

pub mod quote;

pub fn filter() -> impl Filter<Extract = impl warp::Reply, Error = warp::Rejection> + Clone {
  warp::path("api")
    .and(warp::path::peek())
    .map(|api_path| format!("{:?}", api_path))
}

#[allow(clippy::type_complexity)]
pub static ROUTES: Lazy<&[fn() -> BoxedFilter<()>]> = Lazy::new(|| &[]);
