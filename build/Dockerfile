FROM dockcross/linux-s390x

RUN echo "deb http://archive.debian.org/debian jessie main contrib non-free" > /etc/apt/sources.list \
    && curl -sL https://deb.nodesource.com/setup_10.x | bash - \
    && apt install -y nano nodejs
