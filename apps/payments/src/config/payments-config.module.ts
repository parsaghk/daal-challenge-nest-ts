import { Module } from '@nestjs/common';
import {
  ConfigModule as NestConfigModule,
  ConfigService as NestConfigService,
} from '@nestjs/config';
import { paymentsConfiguration } from './payments.configuration';
import { z } from 'zod';
import { PaymentsConfigService } from './payments-config.service';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      load: [paymentsConfiguration],
      validate: (config) => {
        return z
          .object({
            MONGODB_URI: z.string(),
            HTTP_PORT: z.preprocess((v) => Number(v), z.number()),
            TCP_PORT: z.preprocess((v) => Number(v), z.number()),
            TCP_HOST: z.string(),
            IDENTITY_PORT: z.preprocess((v) => Number(v), z.number()),
            IDENTITY_HOST: z.string(),
          })
          .parse(config);
      },
    }),
  ],
  providers: [PaymentsConfigService, NestConfigService],
  exports: [PaymentsConfigService],
})
export class PaymentsConfigModule {}
