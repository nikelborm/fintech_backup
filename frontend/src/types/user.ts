import { Establishment, TransactionLog } from '.';

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  middleName?: string;
  email: string;
  isCustomer: boolean;
  isEmployer: boolean;
  isOwner: boolean;
  password: string;
  establishments: Establishment[];
  recievedTransactions: TransactionLog[];
  ownEstablishments: Establishment[];
};
