import { Module } from '@nestjs/common';
import { PaymentsUseCase } from './payments.useCase';
import { PaymentsResolver } from './payments.resolver';
import { ConfigService } from '@nestjs/config';
import { StripeModule } from 'nestjs-stripe';

@Module({
  imports: [
    StripeModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        apiKey:
          (console.log(configService.get('stripeKey')),
          configService.get('stripeKey')),
        apiVersion: '2020-08-27',
      }),
    }),
  ],
  providers: [PaymentsUseCase, PaymentsResolver],
})
export class PaymentsModule {}
