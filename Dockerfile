FROM node:alpine

RUN mkdir -p /usr/src/
WORKDIR /usr/src/

COPY package.json /usr/src/

RUN yarn

COPY . /usr/src/
RUN yarn build
EXPOSE 3000
CMD yarn start




