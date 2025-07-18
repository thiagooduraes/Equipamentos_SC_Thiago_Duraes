FROM node:20-alpine

WORKDIR /app

COPY ./frontend/package.json ./frontend/yarn.lock* ./

RUN npm install

RUN apk add --no-cache netcat-openbsd bash

COPY ./wait_for_it.sh /usr/local/bin/wait_for_it.sh
RUN chmod +x /usr/local/bin/wait_for_it.sh

COPY ./frontend/. .

EXPOSE 3000