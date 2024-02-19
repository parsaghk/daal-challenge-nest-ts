import { Module } from '@nestjs/common';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PaymentDocument, PaymentSchema } from './entities';
import { PaymentsRepository } from './payments.repository';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PaymentsConfigModule, PaymentsConfigService } from '../../config';
import { IDENTITY_SERVICE } from '@app/common';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PaymentDocument.name, schema: PaymentSchema },
    ]),
    ClientsModule.registerAsync([
      {
        imports: [PaymentsConfigModule],
        inject: [PaymentsConfigService],
        name: IDENTITY_SERVICE,
        useFactory: (paymentsConfigService: PaymentsConfigService) => {
          return {
            transport: Transport.TCP,
            options: {
              host: paymentsConfigService.identityHost,
              port: paymentsConfigService.identityPort,
            },
          };
        },
      },
    ]),
  ],
  controllers: [PaymentsController],
  providers: [PaymentsService, PaymentsRepository],
})
export class PaymentsModule {}
