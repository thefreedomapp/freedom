use poem_openapi::{param::Query, payload::PlainText, OpenApi};

pub struct Api;

#[OpenApi]
impl Api {
  #[oai(path = "/misc", method = "get")]
  async fn index(&self, name: Query<Option<String>>) -> PlainText<String> {
    match name.0 {
      Some(name) => PlainText(format!("hello, {}!", name)),
      None => PlainText("hello!".to_string()),
    }
  }
}
