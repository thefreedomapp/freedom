FROM ubuntu:20.04

# Become the root user
USER root

# Copy all files into the Home directory
ADD . /app/
WORKDIR /app

# Update, so that we can install the packages
RUN apt-get update -q \
  # Add deadsnakes ppa for Python
  && apt-get install -qy rust \
  && npm install \
  && npm run compress \
  && npm dedupe --production


# Copy all files into the Home directory
ADD . /app/

# Run: npm run production, after build 
ENTRYPOINT cd /app/ && /app/poetry/bin/poetry run npm run production
