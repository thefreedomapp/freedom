use std::{path::Path, process::Command};

fn build_frontend(project_root: &Path) -> Result<(), std::io::Error> {
    println!("cargo:rerun-if-changed={}", project_root.display());
    println!("cargo:rerun-if-changed=build.rs");

    let npm = &*which::which("npm").unwrap();

    if !project_root.join("node_modules").exists()
        && !Command::new(npm)
            .arg("install")
            .arg("--no-scripts")
            .current_dir(project_root)
            .spawn()?
            .wait()?
            .success()
    {
        panic!("non successful exit code, see above for details");
    }

    if !Command::new(npm)
        .arg("run")
        .arg("build")
        .current_dir(project_root)
        .spawn()?
        .wait()?
        .success()
    {
        panic!("non successful exit code, see above for details");
    };

    Ok(())
}

fn main() {
    let manifest_dir = Path::new(env!("CARGO_MANIFEST_DIR"));
    let project_root = manifest_dir.parent().unwrap();

    println!(
        "cargo:rustc-env=FRONTEND_DIST={}",
        project_root.join("dist").display()
    );

    build_frontend(project_root).unwrap();
}
