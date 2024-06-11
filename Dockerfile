FROM node:latest
COPY ./package.json /
RUN npm i --registry=https://registry.npm.taobao.org
RUN npm run build

FROM nginx:latest

COPY ./dist/ /usr/share/nginx/html/
COPY ./nginx.conf /etc/nginx/conf.d/

EXPOSE 80