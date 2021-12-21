import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Establishment } from '../model';
import { Repository } from 'typeorm';

@Injectable()
export class EstablishmentRepo {
  constructor(
    @InjectRepository(Establishment)
    private establishmentRepository: Repository<Establishment>,
  ) {}

  public async save(establishment: Establishment): Promise<Establishment> {
    return this.establishmentRepository.save(establishment);
  }
}
