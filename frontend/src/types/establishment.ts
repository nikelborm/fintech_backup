import { MatchRequest, User } from '.';

export type Establishment = {
  id: number;
  owners?: User[];
  employers?: User[];
  address: string;
  ITN: string;
  name: string;
  matchRequests?: MatchRequest[];
};
