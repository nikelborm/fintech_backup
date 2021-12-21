import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { repo } from '../../infrastructure';

@Injectable()
export class LocalSerializer extends PassportSerializer {
  constructor(private readonly userRepository: repo.UserRepo) {
    super();
  }

  serializeUser(user: any, done: (err: Error, user: any) => void) {
    done(null, user.id);
  }

  async deserializeUser(userId: number, done: CallableFunction) {
    const user = await this.userRepository.getOneById(userId);
    done(null, user);
  }
}
