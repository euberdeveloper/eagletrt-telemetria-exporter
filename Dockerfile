FROM ubuntu
WORKDIR /eagletrt-telemetria-exporter-demo

# Copying server files
COPY ./package.json ./
COPY ./package-lock.json ./
COPY ./config.js ./
COPY ./main.js ./
COPY ./utils/ ./utils/
COPY ./temp/ ./temp/
COPY ./routes/ ./routes/
COPY ./frontend/ ./frontend/

# Updating apt
RUN apt-get update

# Installing curl, wget and gnupg
RUN apt-get install -y curl wget gnupg

# Installing nodejs
RUN curl -sL https://deb.nodesource.com/setup_12.x | bash - \
    && apt-get install -y nodejs

# Installing mongodb tools
RUN wget -qO - https://www.mongodb.org/static/pgp/server-4.2.asc | apt-key add - \
    && echo "deb [ arch=amd64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.2 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-4.2.list \
    && apt-get update \
    && apt-get install -y mongodb-org-tools

# Installing node modules
RUN npm i

# Exposing port 8000
EXPOSE 8000

# Run server
CMD [ "npm", "start" ]
