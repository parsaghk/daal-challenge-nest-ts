import { AbstractRepository } from '@app/common';
import { TransactionDocument } from './entities';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class TransactionsRepository extends AbstractRepository<TransactionDocument> {
  protected logger = new Logger(TransactionsRepository.name);

  public constructor(
    @InjectModel(TransactionDocument.name)
    transactionModel: Model<TransactionDocument>,
  ) {
    super(transactionModel);
  }
}
