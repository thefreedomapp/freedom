// This only contains the proc macros

use proc_macro::TokenStream;
use proc_macro2::TokenStream as TokenStream2;

#[proc_macro]
pub fn add_api_route(original_input: TokenStream) -> TokenStream {
  let original_input = TokenStream2::from(original_input);

  let path = original_input.to_string().replace(' ', "");

  let req_path = path.replace("::", "/");

  let output = quote::quote! {
    let #original_input = #path;

    println!("{}", #original_input);
  };

  TokenStream::from(output)
}
