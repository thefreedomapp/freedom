use warp::Filter;

pub fn filter() -> impl Filter<Extract = impl warp::Reply, Error = warp::Rejection> + Clone {
  warp::path("api")
    .and(warp::path::peek())
    .map(|api_path| format!("{:?}", api_path))
}
