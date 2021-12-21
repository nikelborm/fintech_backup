import { Module } from '@nestjs/common';
import { EstablishmentResolver } from './establishment.resolver';
import { InfrastructureModule } from '../infrastructure';

@Module({
  imports: [InfrastructureModule],
  providers: [EstablishmentResolver],
})
export class EstablishmentModule {}
