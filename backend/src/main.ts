import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as pg from 'pg';
import * as passport from 'passport';
import { json, urlencoded } from 'express';
import * as expressSession from 'express-session';
import * as connectPgSimple from 'connect-pg-simple';
import { ConfigService } from '@nestjs/config';
import { logConfig } from './config';

const PgSession = connectPgSimple(expressSession);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const pgPool = new pg.Pool({
    host: configService.get('database.host'),
    port: configService.get('database.port'),

    user: configService.get('database.username'),
    password: configService.get('database.password'),
    database: configService.get('database.name'),
  });


  app.use(json({ limit: '3mb' }));
  app.use(urlencoded({ limit: '3mb', extended: true }));
  app.use(
    expressSession({
      store: new PgSession({ pool: pgPool, tableName: 'session' }),
      cookie: { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: false },
      secret: 'valeryAboba',
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());
  app.enableCors();
  logConfig(configService);
  await app.listen(configService.get('serverPort'));
}
bootstrap();
