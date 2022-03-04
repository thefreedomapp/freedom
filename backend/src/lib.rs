// This only contains the proc macros

use proc_macro::{TokenStream, TokenTree};
use proc_macro2::TokenStream as TokenStream2;

#[proc_macro]
pub fn add_api_route(input: TokenStream) -> TokenStream {
  let input = TokenStream2::from(input).to_string().replace(' ', "");

  let path = input.replace("::", "/");

  let output = quote::quote! {
    let #input = "dw";

    println!("{}", #input);
  };

  TokenStream::from(output)
}
