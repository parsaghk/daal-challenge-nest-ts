import { Module } from '@nestjs/common';
import { ModelsModule } from './models/models.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PaymentsConfigModule, PaymentsConfigService } from './config';

@Module({
  imports: [
    PaymentsConfigModule,
    MongooseModule.forRootAsync({
      imports: [PaymentsConfigModule],
      inject: [PaymentsConfigService],
      useFactory: (identityConfigService: PaymentsConfigService) => {
        return {
          uri: identityConfigService.mongoUri,
        };
      },
    }),
    ModelsModule,
  ],
  controllers: [],
  providers: [],
})
export class PaymentsModule {}
