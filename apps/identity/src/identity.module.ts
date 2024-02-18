import { Module } from '@nestjs/common';
import { IdentityConfigModule, IdentityConfigService } from './config';
import { ModelsModule } from './models/models.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    IdentityConfigModule,
    MongooseModule.forRootAsync({
      imports: [IdentityConfigModule],
      inject: [IdentityConfigService],
      useFactory: (identityConfigService: IdentityConfigService) => {
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
export class IdentityModule {}
