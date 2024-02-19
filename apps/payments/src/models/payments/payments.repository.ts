import { AbstractRepository } from '@app/common';
import { PaymentDocument } from './entities';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class PaymentsRepository extends AbstractRepository<PaymentDocument> {
  protected logger = new Logger(PaymentsRepository.name);

  public constructor(
    @InjectModel(PaymentDocument.name) paymentModel: Model<PaymentDocument>,
  ) {
    super(paymentModel);
  }
}
