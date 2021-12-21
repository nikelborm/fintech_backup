import { Module } from '@nestjs/common';
import { MatchRequestResolver } from './match-request.resolver';

@Module({
  providers: [MatchRequestResolver],
})
export class MatchRequestModule {}
