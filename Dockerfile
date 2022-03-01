FROM rust:slim

USER 0

RUN apt-get update && apt-get install -y curl \
  && curl -fsSL https://deb.nodesource.com/setup_16.x | bash - \
  && apt-get install -y nodejs

ADD . /src
WORKDIR /src

RUN npm install --path /src/frontend
RUN cargo build --release --manifest-path=/src/backend/Cargo.toml
