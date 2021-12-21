import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { model, repo } from 'src/modules/infrastructure';

@Injectable()
export class LoggedInGuard implements CanActivate {
  constructor(private readonly userRepo: repo.UserRepo) {}

  async canActivate(context: ExecutionContext) {
    const request = context.getArgByIndex<AuthedRequest>(2);
    /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
    // @ts-ignore
    request.user = await this.userRepo.getOneById(request.req.session.userId);
    return GqlExecutionContext.create(context)
      .getContext()
      .req.isAuthenticated();
  }
}

export interface AuthedRequest extends Request {
  user: model.User;
}
