import { Establishment } from '.';

export type MatchRequest = {
  establishment: Establishment;
  code: string;
  expiresAt: Date;
};
