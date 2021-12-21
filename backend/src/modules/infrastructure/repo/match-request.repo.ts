import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MatchRequest } from '../model';
import { Repository } from 'typeorm';
import { messages } from 'src/config';

@Injectable()
export class MatchRequestRepo {
  constructor(
    @InjectRepository(MatchRequest)
    private matchRequestRepository: Repository<MatchRequest>,
  ) {}

  public async save(matchRequest: MatchRequest): Promise<MatchRequest> {
    return this.matchRequestRepository.save(matchRequest);
  }

  async getOneWithEstablishmentWithEmployeesBy(code: string) {
    const matchRequest = await this.matchRequestRepository.findOne({
      where: {
        code,
      },
      relations: ['establishment', 'establishment.employees'],
    });
    if (!matchRequest)
      throw new BadRequestException(
        messages.repo.matchRequest.cantGetNotFoundBy(code),
      );
    return matchRequest;
  }
}
