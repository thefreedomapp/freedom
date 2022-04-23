use std::{path::Path, process::Command};

fn build_frontend(frontend_dir: &Path) -> Result<(), std::io::Error> {
  println!("cargo:rerun-if-changed={}", frontend_dir.display());
  println!("cargo:rerun-if-changed=build.rs");

  let npm = &*which::which("npm").unwrap();

  if !frontend_dir.join("node_modules").exists()
    && !Command::new(npm)
      .arg("install")
      .current_dir(frontend_dir)
      .spawn()?
      .wait()?
      .success()
  {
    panic!("non successful exit code, see above for details");
  }

  if !Command::new(npm)
    .arg("run")
    .arg("build")
    .current_dir(frontend_dir)
    .spawn()?
    .wait()?
    .success()
  {
    panic!("non successful exit code, see above for details");
  };

  Ok(())
}

fn main() {
  let frontend_dir = Path::new(env!("CARGO_MANIFEST_DIR"))
    .parent()
    .unwrap()
    .join("frontend");

  println!(
    "cargo:rustc-env=FRONTEND_DIR={}",
    frontend_dir.join("dist").display()
  );

  build_frontend(&frontend_dir).unwrap();
}
