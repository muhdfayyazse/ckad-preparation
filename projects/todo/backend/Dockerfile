# syntax=docker/dockerfile:1.4

FROM node:lts-buster-slim AS development

# Create app directory
WORKDIR /usr/src/app
RUN mkdir -p config
RUN mkdir -p db
RUN mkdir -p logs
RUN mkdir -p models/todos
RUN mkdir -p routes
RUN mkdir -p utils/helpers

COPY package.json /usr/src/app/package.json
COPY package-lock.json /usr/src/app/package-lock.json
RUN npm ci

COPY config/ /usr/src/app/config
COPY db/ /usr/src/app/db
COPY logs/ /usr/src/app/logs
COPY models/todos/ /usr/src/app/models/todos
COPY routes/ /usr/src/app/routes
COPY utils/helpers/ /usr/src/app/utils/helpers
COPY server.js /usr/src/app

CMD [ "npm", "run", "start" ]

