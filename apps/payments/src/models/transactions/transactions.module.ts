import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionDocument, TransactionSchema } from './entities';
import { TransactionsRepository } from './transactions.repository';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PaymentsConfigService, PaymentsConfigModule } from '../../config';
import { IDENTITY_SERVICE } from '@app/common';

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
        useFactory: (transactionsConfigService: PaymentsConfigService) => {
          return {
            transport: Transport.TCP,
            options: {
              host: transactionsConfigService.identityHost,
              port: transactionsConfigService.identityPort,
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
