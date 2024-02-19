import { Module } from '@nestjs/common';
import {
  ConfigModule as NestConfigModule,
  ConfigService as NestConfigService,
} from '@nestjs/config';
import { identityConfiguration } from './identity.configuration';
import { z } from 'zod';
import { IdentityConfigService } from './identity-config.service';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      load: [identityConfiguration],
      validate: (config) => {
        return z
          .object({
            MONGODB_URI: z.string(),
            RABBITMQ_URI: z.string(),
            HTTP_PORT: z.preprocess((v) => Number(v), z.number()),
          })
          .parse(config);
      },
    }),
  ],
  providers: [IdentityConfigService, NestConfigService],
  exports: [IdentityConfigService],
})
export class IdentityConfigModule {}
