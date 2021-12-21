import { MiddlewareConsumer, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { appConfig, dbConfig } from './config';
import { AccessLogMiddleware } from './tools';
import { UserModule } from './modules/user';
import { InfrastructureModule } from './modules/infrastructure';
import { PaymentsModule } from './modules/payments';
import { MatchRequestModule } from './modules/match-request';
import { EstablishmentModule } from './modules/establishment';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      load: [appConfig, dbConfig],
    }),
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      playground: true,
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
      },
    }),
    InfrastructureModule,
    UserModule,
    PaymentsModule,
    MatchRequestModule,
    EstablishmentModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AccessLogMiddleware).forRoutes('*');
  }
}
