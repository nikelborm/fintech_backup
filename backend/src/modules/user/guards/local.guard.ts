import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class LocalGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    await super.canActivate(context);
    const request = context.getArgByIndex<Request>(2);
    /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
    // @ts-ignore
    request.req.session.user = JSON.stringify(request.user || null);

    return true;
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext();
    request.body = ctx.getArgs();
    return request;
  }
}
