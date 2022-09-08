FROM ubuntu:latest
MAINTAINER ballbot <5252bb@daum.net>

RUN mkdir -p /app
WORKDIR /app
COPY ./ /app

RUN apt-get update
RUN apt-get install curl --yes
RUN curl -sL https://deb.nodesource.com/setup_16.x | bash -
RUN apt-get install nodejs --yes
RUN npm ci --force
RUN npm run build

EXPOSE 3000
CMD ["/usr/bin/npx", "serve", "-s", "/app/build"]
