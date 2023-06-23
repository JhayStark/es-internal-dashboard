FROM node:alpine as build-stage

RUN mkdir -p /srv
WORKDIR /srv
RUN apk add bash netcat-openbsd
COPY package*.json .
COPY yarn.lock .
COPY tsconfig.json .
RUN npm install
COPY . .
RUN npm run build


# production stage
FROM nginx:stable-alpine as production-stage
WORKDIR /srv
RUN apk add bash netcat-openbsd
COPY --from=build-stage /srv/out /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]




