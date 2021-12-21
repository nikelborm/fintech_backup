import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentUser } from '../user';
import { PaymentsUseCase } from './payments.useCase';

@Resolver('Tip')
export class PaymentsResolver {
  constructor(private readonly paymentsUseCase: PaymentsUseCase) {}

  @Mutation('sendTipAttempt')
  public async attemptSendTip(@Args('tipAmount') tipAmount: number) {
    return this.paymentsUseCase.checkout(tipAmount);
  }

  @Mutation('createPaymentIntent')
  public async sendPaymentAttempt(
    @Args('tipAmount') tipAmount: number,
    @Args('recipientUserId') recipientUserId: number,
    @Args('comment') comment: string,
    @CurrentUser() shituser,
  ) {
    return this.paymentsUseCase.createPaymentIntent(
      tipAmount,
      comment,
      recipientUserId,
      shituser?.id || null,
    );
  }
}
