import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionDocument, TransactionSchema } from './entities';
import { TransactionsRepository } from './transactions.repository';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PaymentsConfigService, PaymentsConfigModule } from '../../config';
import { IDENTITY_QUEUE, IDENTITY_SERVICE } from '@app/common';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TransactionDocument.name, schema: TransactionSchema },
    ]),
    ClientsModule.registerAsync([
      {
        imports: [PaymentsConfigModule],
        inject: [PaymentsConfigService],
        name: IDENTITY_SERVICE,
        useFactory: (paymentsConfigService: PaymentsConfigService) => {
          return {
            transport: Transport.RMQ,
            options: {
              urls: [paymentsConfigService.rabbitmqUri],
              queue: IDENTITY_QUEUE,
            },
          };
        },
      },
    ]),
  ],
  controllers: [TransactionsController],
  providers: [TransactionsService, TransactionsRepository],
})
export class TransactionsModule {}
