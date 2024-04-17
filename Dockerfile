FROM ubuntu

# Install dependencies (replace with your actual dependencies)
RUN apt-get update && apt-get install -y nodejs

WORKDIR /app
COPY . /app/

# Remove the ./frontend folder
RUN rm -rf /app/frontend

CMD ["node", "server.js"]

