#FROM node:lts-buster AS development
FROM node:alpine AS builder

WORKDIR /usr/src/app
RUN mkdir -p src
RUN mkdir -p public

COPY package.json /usr/src/app
COPY package-lock.json /usr/src/app
RUN npm ci

COPY public/ /usr/src/app/public
COPY src/ /usr/src/app/src

RUN npm run build

FROM nginx:alpine
COPY --from=builder /usr/src/app/build /usr/share/nginx/html/todo
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d

CMD ["nginx", "-g", "daemon off;"]

