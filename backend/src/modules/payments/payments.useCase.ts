import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectStripe } from 'nestjs-stripe';
import { Currency } from 'src/types';
import Stripe from 'stripe';
import { URL } from 'url';
import { model, repo } from '../infrastructure';

@Injectable()
export class PaymentsUseCase {
  private readonly successRedirectUrl: string;
  private readonly cancelRedirectUrl: string;
  constructor(
    @InjectStripe() private readonly stripeClient: Stripe,
    private readonly configService: ConfigService,
    private readonly transactionLogRepository: repo.TransactionLogRepo,
  ) {
    const redirectUrl = new URL(this.configService.get('paymentsRedirectUrl'));
    redirectUrl.searchParams.set('success', 'true');
    this.successRedirectUrl = redirectUrl.href;
    redirectUrl.searchParams.set('success', 'false');
    this.cancelRedirectUrl = redirectUrl.href;
  }

  public async createPrice(unitAmount: number) {
    const product = await this.createProduct();

    return this.stripeClient.prices.create({
      unit_amount: unitAmount,
      currency: 'rub',
      product: product.id,
    });
  }

  public async createProduct() {
    return this.stripeClient.products.create({ name: 'tips' });
  }

  public async checkout(unitAmount: number) {
    const price = await this.createPrice(unitAmount);

    const session = await this.stripeClient.checkout.sessions.create({
      line_items: [
        {
          amount: unitAmount,
          quantity: 1,
          currency: Currency.CZK,
          name: 'tips',
        },
      ],
      mode: 'payment',
      success_url: this.successRedirectUrl,
      cancel_url: this.cancelRedirectUrl,
    });

    return session.url;
  }

  public async createPaymentIntent(
    tipAmount: number,
    comment: string,
    recipientId: number,
    senderId?: number,
  ) {
    const paymentIntent = await this.stripeClient.paymentIntents.create({
      amount: tipAmount,
      currency: Currency.CZK,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    const transactionLog = new model.TransactionLog();
    transactionLog.recipientId = recipientId;
    transactionLog.comment = comment || '  ';
    transactionLog.moneyAmount = tipAmount;
    transactionLog.createdAt = new Date();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // TODO: не фиксировать одну валюту
    transactionLog.currency = Currency.CZK;
    transactionLog.senderId = senderId;

    await this.transactionLogRepository.save(transactionLog);

    return paymentIntent.client_secret;
  }
}
