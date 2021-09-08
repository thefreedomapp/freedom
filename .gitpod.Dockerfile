FROM gitpod/workspace-base:latest
MAINTAINER TheBotlyNoob <thebotlynoob@gmail.com>

# Become the root user
USER root

# Set PATH environment variable
ENV PATH="/app/poetry/bin/:$PATH"

# Copy all files into the Home directory
ADD . /app/

# Update, so that we can install the packages
RUN cd /app/ \
  && apt-get update -q \
  # Add deadsnakes ppa for Python
  && apt-get install -qy software-properties-common \
  && add-apt-repository ppa:deadsnakes/ppa \
  && apt-get -q update \
  # Install python
	&& apt-get install -qy python python-pip python3 python3-pip curl \
  && pip install virtualenv \
  && curl -sSL https://raw.githubusercontent.com/python-poetry/poetry/master/install-poetry.py | POETRY_HOME=/app/poetry python3 - \
  # Get latest version of node 16
  && curl -sSL https://deb.nodesource.com/setup_16.x | bash  \
  # Install Nodejs, and npm
  && apt-get install -qy nodejs


# Copy all files into the Home directory
ADD . /app/
