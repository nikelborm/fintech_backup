import { User } from '.';

export type TransactionLog = {
  id: number;
  recipient: User;
  sender: User;
  moneyAmount: number;
  currency: Currency;
  comment?: string;
  creationDate: Date;
};

export enum Currency {
  XCD = 'xcd',
  BBD = 'bbd',
  USD = 'usd',
  CNY = 'cny',
  COP = 'cop',
  CRC = 'crc',
  DOP = 'dop',
  GTQ = 'gtq',
  HNL = 'hnl',
  HKD = 'hkd',
  JMD = 'jmd',
  NIO = 'nio',
  PYQ = 'pyg',
  PEN = 'pen',
  EUR = 'eur',
  TWD = 'twd',
  TTD = 'ttd',
  MXN = 'mxn',
  RUB = 'rub',
}
