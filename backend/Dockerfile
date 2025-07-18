FROM python:3.11-slim

WORKDIR /app

COPY ./backend/requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

RUN apt-get update && apt-get install -y netcat-openbsd && rm -rf /var/lib/apt/lists/*

COPY ./wait_for_it.sh /usr/local/bin/wait_for_it.sh
RUN chmod +x /usr/local/bin/wait_for_it.sh

COPY ./backend/. .

EXPOSE 5000