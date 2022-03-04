pub mod quote;

#[poem_openapi::OpenApi(prefix_path = "/misc")]
impl crate::api::Api {}
