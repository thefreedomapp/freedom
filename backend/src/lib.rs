// This only contains the proc macros

use proc_macro::TokenStream;

#[proc_macro]
pub fn add_api_route(input: TokenStream) -> TokenStream {
  let input = syn::parse_macro_input!(input as syn::Path);

  let output = quote::quote! {
    println!("{}", stringify!(#input))
  };

  TokenStream::from(output)
}
