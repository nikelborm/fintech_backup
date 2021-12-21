FROM node:14.17.0-alpine3.13 AS build

ENV TZ=Europe/Moscow
ENV TYPEORM_DATABASE=fintech
ENV TYPEORM_USERNAME=fntch
ENV TYPEORM_CONNECTION=postgres
ENV STRIPE_KEY=sk_test_51K5VYgHRk3l5AM536vgtvTJYSZu0AdLxXn2VTLTWV0qOmL5ozjMyle0FRiKhMSUcp0iXOe4VU7JcFNdVenajbTV0004ftv6mrV
ENV TYPEORM_MIGRATIONS=./dist/modules/infrastructure/migrations/*.js
ENV TYPEORM_ENTITIES=./dist/modules/infrastructure/model/*.model.js
ENV TYPEORM_MIGRATIONS_DIR=./src/modules/infrastructure/migrations
ENV TYPEORM_ENTITIES_DIR=./src/modules/infrastructure/model
WORKDIR /app
COPY package.json package-lock.json ./



COPY tsconfig.json tsconfig.build.json .eslintrc.js ormconfig.js ./
COPY src src/

RUN npm i

RUN npm run build

CMD npm run migrate && exec npm run start:dev

EXPOSE 3000

FROM build as release

RUN npm i --production

RUN addgroup -S fntch && \
    adduser -S -h /app -G fntch fntch
RUN mkdir -p /app/.yarn /app/.cache/yarn && \
     chown fntch:fntch /app/.yarn /app/.cache/yarn

USER fntch
CMD npm run migrate && exec node dist/main
EXPOSE 3000
