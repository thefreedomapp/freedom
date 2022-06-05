use std::{env, path::Path};

use wasm_pack::{
    command::build::{Build, BuildOptions, Target},
    install::InstallMode,
};

fn main() {
    let manifest_dir = env::var("CARGO_MANIFEST_DIR").unwrap();
    let manifest_dir = Path::new(&manifest_dir).parent().unwrap();

    println!(
        "cargo:rerun-if-changed={}",
        manifest_dir.join("client").display()
    );

    env::set_var("CARGO_TARGET_DIR", manifest_dir.join("web-target"));

    let opts = BuildOptions {
        path: Some(manifest_dir.join("client")),
        scope: None,
        mode: InstallMode::Normal,
        disable_dts: true,
        target: Target::Web,
        debug: cfg!(debug_assertions),
        dev: cfg!(debug_assertions),
        release: !cfg!(debug_assertions),
        profiling: false,
        out_dir: env::var("OUT_DIR").unwrap(),
        out_name: None,
        extra_options: Vec::new(),
    };

    Build::try_from_opts(opts).unwrap().run().unwrap();
}
