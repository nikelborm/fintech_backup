import { MatchRequest, User } from '../../types';

export interface CreateEstablishmentInput {
  ownersIds?: Nullable<number[]>;
  employersIds?: Nullable<number[]>;
  address: string;
  ITN: string;
  name: string;
}

type Nullable<T> = T | null;
