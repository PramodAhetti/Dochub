# Base image
FROM node:18-alpine AS builder

# Install dependencies (replace with your actual dependencies)
WORKDIR /app
COPY . /app/

CMD node server.js





