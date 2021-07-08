FROM ubuntu:20.04
MAINTAINER TheBotlyNoob <thebotlynoob@gmail.com>

# Become the root user
USER root

# Copy all files into the Home directory
ADD . $HOME

# Update, so that we can install the packages
RUN apt-get update -q \
  # Add deadsnakes ppa
  && apt-get install -qy software-properties-common \
  && add-apt-repository ppa:deadsnakes/ppa \
  && apt-get -q update \
  # Install python
	&& apt-get install -qy python3 python3 pip curl \
  && pip install virtualenv \
  && curl -sSL https://raw.githubusercontent.com/python-poetry/poetry/master/install-poetry.py | python3 - \
  # Get latest version of node 16
  && curl -sL https://deb.nodesource.com/setup_16.x | bash \
  && apt-get update -q \
  # Install Nodejs, and npm
  && apt-get install -qy nodejs \
  # Install packages
  && $HOME/.local/bin/poetry install  \
  && npm install

# Copy all files into the Home directory
ADD . $HOME

# Add installed applications to PATH
RUN echo "export $PATH=\"$HOME/.local/bin/:/usr/bin/:/usr/local/:$PATH\"" >> $HOME/.bashrc

# Run: npm run production, after build 
CMD ['echo', '$PATH']
