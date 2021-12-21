import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { createParamDecorator, UseGuards } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Currency, Language } from 'src/types';
import { CreateUserInput } from 'src/graphql';
import { model, repo } from '../infrastructure';
import { LocalGuard } from './guards/local.guard';
import { Request } from 'express';

export const CurrentUser = createParamDecorator((_, ctx) =>
  // @ts-expect-error тут всё хорошо
  JSON.parse(ctx.getArgByIndex<Request>(2).req.session.user || 'null'),
);

@Resolver('User')
export class UserResolver {
  constructor(private userRepository: repo.UserRepo) {}

  @Query('user')
  public async getUser(@Args('id') id: number): Promise<model.User> {
    return this.userRepository.getOneById(id);
  }

  @UseGuards(LocalGuard)
  @Mutation('login')
  public async loginUser(
    @Args('username') username: string,
    @Args('password') password: string,
  ) {
    return this.userRepository.getOneByLogin(username);
  }

  @Query('currentUser')
  public async getCurrentUser(@CurrentUser() shituser) {
    return this.userRepository.getOneById(shituser?.id);
  }

  @Mutation('createUser')
  public async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ) {
    const user = new model.User();
    user.password = await bcrypt.hash(createUserInput.password, 8);
    user.email = createUserInput.email;
    user.firstName = createUserInput.firstName;
    user.middleName = createUserInput.middleName;
    user.lastName = createUserInput.lastName;
    user.preferredCurrency = Currency.RUB;
    user.preferredLanguage = Language.RU;
    user.isCustomer = createUserInput.isCustomer;
    user.isEmployer = createUserInput.isEmployer;
    user.isOwner = createUserInput.isOwner;
    user.billingInfo = createUserInput.billingInfo;
    return this.userRepository.save(user);
  }
}
