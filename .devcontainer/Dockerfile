FROM mcr.microsoft.com/vscode/devcontainers/universal:linux

RUN echo $HOME
RUN curl -fsSL https://deno.land/x/install/install.sh | sh
RUN ~/.deno/bin/deno completions bash >> ~/.bashrc &&  \
    echo 'export DENO_INSTALL="/home/$USER/.deno"' >> ~/.bashrc && \ 
    echo 'export PATH="$DENO_INSTALL/bin:$PATH"' >> ~/.bashrc
