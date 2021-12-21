import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { repo, model } from '../infrastructure';
import { CreateEstablishmentInput } from 'src/graphql';
import { ForbiddenException } from '@nestjs/common';
import { CurrentUser } from '../user';

@Resolver('Establishment')
export class EstablishmentResolver {
  constructor(
    private readonly establishmentRepo: repo.EstablishmentRepo,
    private readonly userRepo: repo.UserRepo,
  ) {}

  @Mutation('createEstablishment')
  public async createEstablishment(
    @Args('createEstablishmentInput')
    createEstablishmentInput: CreateEstablishmentInput,
    @CurrentUser() user: model.User,
  ) {
    console.log(user);
    if (user.isOwner) {
      const establishment = new model.Establishment();
      establishment.address = createEstablishmentInput.address;
      establishment.ITN = Number(createEstablishmentInput.ITN);
      establishment.matchRequests = [];
      establishment.name = createEstablishmentInput.name;
      establishment.owners = [user];
      establishment.employees = [];
      console.log(establishment);
      return this.establishmentRepo.save(establishment);
    } else {
      throw new ForbiddenException('you need to be owner');
    }
  }

  @Query('establishments')
  public async getCurrentUserEstablishments(@CurrentUser() user: model.User) {
    const userWithRelations = await this.userRepo.getOneById(user.id);
    console.log('userWithRelations: ', userWithRelations);
    if (userWithRelations.isOwner) {
      return userWithRelations.ownEstablishments;
    } else if (userWithRelations.isEmployer) {
      return userWithRelations.employedInEstablishments;
    }
  }
}
