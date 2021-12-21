import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { BadRequestException } from '@nestjs/common';
import { nanoid } from 'nanoid';
import { repo, model } from '../infrastructure';
import { messages } from 'src/config';
import {
  CreateMatchRequestInput,
  MatchRequest,
  ConnectToEstablishmentInput,
} from 'src/graphql';
import { CurrentUser } from '../user';

@Resolver('MatchRequest')
export class MatchRequestResolver {
  constructor(
    private readonly matchRequestRepository: repo.MatchRequestRepo,
    private readonly establishmentRepository: repo.EstablishmentRepo,
  ) {}

  @Mutation('createMatchRequest')
  public async createMatchRequest(
    @Args('createMatchRequestInput')
    { establishmentId }: CreateMatchRequestInput,
    @CurrentUser() user: model.User,
  ): Promise<MatchRequest> {
    const matchRequest = new model.MatchRequest();
    matchRequest.code = nanoid(8);
    matchRequest.establishmentId = establishmentId;
    matchRequest.createdByUserId = user.id;

    matchRequest.willExpireAt = new Date(
      new Date().setMinutes(new Date().getMinutes() + 10),
    );
    const { id, code, createdAt, willExpireAt, wasUsedAt } =
      await this.matchRequestRepository.save(matchRequest);
    return {
      id,
      code,
      createdAt,
      willExpireAt,
      wasUsedAt,
    };
  }

  @Mutation('connectToEstablishment')
  public async connectToEstablishment(
    @Args('connectToEstablishmentInput')
    { matchRequestCode }: ConnectToEstablishmentInput,
    @CurrentUser() user: model.User,
  ): Promise<MatchRequest> {
    const { id, wasUsedToInviteUser, establishment, willExpireAt, createdAt } =
      await this.matchRequestRepository.getOneWithEstablishmentWithEmployeesBy(
        matchRequestCode,
      );
    // TODO: проверка на то истёк ли этот запрос
    if (wasUsedToInviteUser) {
      throw new BadRequestException(
        messages.matchRequest.alreadyUsed(matchRequestCode),
      );
    }

    const matchRequestToUpdate = new model.MatchRequest();
    matchRequestToUpdate.id = id;
    matchRequestToUpdate.wasUsedToInviteUserId = user.id;
    matchRequestToUpdate.wasUsedAt = new Date();
    await this.matchRequestRepository.save(matchRequestToUpdate);

    const establishmentToUpdate = new model.Establishment();
    establishmentToUpdate.id = establishment.id;
    establishmentToUpdate.employees = [...establishment.employees, user];
    await this.establishmentRepository.save(establishmentToUpdate);

    return {
      id,
      code: matchRequestCode,
      willExpireAt,
      createdAt,
    };
  }
}
