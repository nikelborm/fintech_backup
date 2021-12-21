import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TransactionLog } from '../model';
import { Repository } from 'typeorm';

@Injectable()
export class TransactionLogRepo {
  constructor(
    @InjectRepository(TransactionLog)
    private transactionLogRepository: Repository<TransactionLog>,
  ) {}

  public async save(transactionLog: TransactionLog): Promise<TransactionLog> {
    return this.transactionLogRepository.save(transactionLog);
  }
}
