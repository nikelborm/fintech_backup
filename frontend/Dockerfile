FROM node:12-alpine3.12 AS prepare
ENV TZ=Europe/Moscow
ENV DANGEROUSLY_DISABLE_HOST_CHECK=true
WORKDIR /app

RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime \
    && echo $TZ > /etc/timezone

COPY package.json package-lock.json .eslintrc.js tsconfig.json ./

RUN npm i

COPY public public/
COPY src src/

CMD ["npm", "run", "start"]
EXPOSE 3000

FROM prepare as build
RUN npm run build

FROM nginx:1.18.0-alpine as static
ENV TZ=Europe/Moscow
RUN rm -rf /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY .htpasswd /etc/nginx/.htpasswd
COPY --from=build /app/build /usr/share/nginx/html/
COPY default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
