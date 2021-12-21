import { Currency } from '../../types';

export interface CreateTransactionInput {
  recipientId: number;
  moneyAmount: number;
  currency: Currency;
  comment: string;
}
