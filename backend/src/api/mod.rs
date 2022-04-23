pub mod misc;

use actix_web::web;

pub fn configure(cfg: &mut web::ServiceConfig) {
    cfg.service(web::scope("/misc").configure(misc::configure));
}
