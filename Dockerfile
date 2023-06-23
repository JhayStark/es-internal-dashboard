FROM node:alpine as build

RUN mkdir -p /srv
WORKDIR /srv
COPY . .
RUN npm install


# production stage
FROM nginx:stable-alpine as production-stage
RUN apk add bash netcat-openbsd
COPY --from=build-stage /srv/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]




