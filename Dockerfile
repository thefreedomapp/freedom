FROM ubuntu:20.04
MAINTAINER TheBotlyNoob <thebotlynoob@gmail.com>

# Become the root user
USER root

# Update, so that we can install the packages
RUN apt-get update -q \
  # Add deadsnakes ppa
  && apt-get install -qy software-properties-common \
  && add-apt-repository ppa:deadsnakes/ppa \
  && apt-get update \
  # Install python
	&& apt-get install -qy python3 curl python3-pip \
  # Get latest version of node 16
  && curl -sL https://deb.nodesource.com/setup_16.x | bash \
  && apt-get update -q \
  # Install Nodejs, and npm
  && apt-get install -qy nodejs \
  # Install packages
  && pip install -r requirements.txt \
  && npm install

# Run: npm run production 
CMD ['npm', 'run', 'production']
