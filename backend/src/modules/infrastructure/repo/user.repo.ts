import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { messages } from 'src/config';
import { Repository } from 'typeorm';
import { User } from '../model';

@Injectable()
export class UserRepo {
  constructor(
    @InjectRepository(User)
    private repo: Repository<User>,
  ) {}

  getAll() {
    return this.repo.find();
  }

  async getOneById(id: number) {
    const user = await this.repo.findOne(id, {
      relations: [
        'ownEstablishments',
        'employedInEstablishments',
        'receivedTransactions',
        'sentTransactions',
      ],
    });
    if (!user)
      throw new BadRequestException(
        messages.repo.common.cantGetNotFoundById('user', id),
      );
    return user;
  }

  public async getOneByLogin(login: string): Promise<User> {
    return this.repo.findOne({
      where: { email: login },
      relations: [
        'ownEstablishments',
        'employedInEstablishments',
        'receivedTransactions',
        'sentTransactions',
      ],
    });
  }

  public async save(user: User): Promise<User> {
    return this.repo.save(user);
  }

  async delete(id: number) {
    await this.repo.delete(id);
  }
}
