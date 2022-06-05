FROM rust:slim

EXPOSE 3000

RUN apt-get update && apt-get install -y perl build-essential

ADD . /src
WORKDIR /src

RUN cargo build --release

ENTRYPOINT [ "/src/target/release/server" ]
