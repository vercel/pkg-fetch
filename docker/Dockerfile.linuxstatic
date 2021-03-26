ARG TARGET_TOOLCHAIN_ARCH

FROM muslcc/x86_64:$TARGET_TOOLCHAIN_ARCH-linux-musl

ARG TARGET_NODE_ARCH

WORKDIR /root/pkg-fetch/

RUN apk add --no-cache build-base git linux-headers npm python2 python3

# https://gitlab.alpinelinux.org/alpine/aports/-/issues/8626
ENV CFLAGS=-U_FORTIFY_SOURCE
ENV CFLAGS_host=-U_FORTIFY_SOURCE
ENV CXXFLAGS=-U_FORTIFY_SOURCE
ENV CXXFLAGS_host=-U_FORTIFY_SOURCE

ENV CC=/bin/gcc
ENV CXX=/bin/g++
ENV AR=/bin/ar
ENV NM=/bin/nm
ENV READELF=/bin/readelf

ENV CC_host=/usr/bin/gcc
ENV CXX_host=/usr/bin/g++
ENV AR_host=/usr/bin/ar
ENV NM_host=/usr/bin/nm
ENV READELF_host=/usr/bin/readelf

COPY . ./

RUN npm install

ENV TARGET_ARCH=$TARGET_NODE_ARCH
ENV DESTCPU=$TARGET_NODE_ARCH

RUN npm run start

RUN /bin/strip /root/pkg-fetch/dist/*
