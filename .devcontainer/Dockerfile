FROM node:24.18.0-bookworm

ENV COREPACK_ENABLE_DOWNLOAD_PROMPT=0
ENV DEBIAN_FRONTEND=noninteractive
ARG ACTIONLINT_VERSION=1.7.12

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        bash-completion \
        build-essential \
        ca-certificates \
        curl \
        dnsutils \
        findutils \
        gawk \
        gh \
        git \
        git-lfs \
        iputils-ping \
        jq \
        less \
        lsof \
        netcat-openbsd \
        nvi \
        openssh-client \
        pkg-config \
        procps \
        python3 \
        ripgrep \
        rsync \
        shellcheck \
        sudo \
        tree \
        unzip \
        xz-utils \
        zip \
    && rm -rf /var/lib/apt/lists/*

RUN set -eux; \
    case "$(uname -m)" in \
        x86_64) actionlint_arch="amd64"; actionlint_sha256="8aca8db96f1b94770f1b0d72b6dddcb1ebb8123cb3712530b08cc387b349a3d8" ;; \
        aarch64|arm64) actionlint_arch="arm64"; actionlint_sha256="325e971b6ba9bfa504672e29be93c24981eeb1c07576d730e9f7c8805afff0c6" ;; \
        *) echo "Unsupported actionlint architecture: $(uname -m)" >&2; exit 1 ;; \
    esac; \
    curl -fsSL "https://github.com/rhysd/actionlint/releases/download/v${ACTIONLINT_VERSION}/actionlint_${ACTIONLINT_VERSION}_linux_${actionlint_arch}.tar.gz" -o /tmp/actionlint.tar.gz; \
    echo "${actionlint_sha256}  /tmp/actionlint.tar.gz" | sha256sum -c -; \
    tar -xzf /tmp/actionlint.tar.gz -C /usr/local/bin actionlint; \
    chmod +x /usr/local/bin/actionlint; \
    rm /tmp/actionlint.tar.gz

RUN corepack enable \
    && corepack prepare pnpm@10.33.2 --activate \
    && usermod -l vscode node \
    && groupmod -n vscode node \
    && usermod -d /home/vscode -m vscode \
    && usermod -aG sudo vscode \
    && echo 'vscode ALL=(ALL) NOPASSWD:ALL' > /etc/sudoers.d/90-vscode \
    && chmod 0440 /etc/sudoers.d/90-vscode \
    && mkdir -p /workspaces/docs \
    && chown -R vscode:vscode /workspaces /home/vscode

WORKDIR /workspaces/docs
