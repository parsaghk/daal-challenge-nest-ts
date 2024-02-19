import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PaymentsConfigService {
  public constructor(private readonly _configService: ConfigService) {}

  get mongoUri(): string {
    return this._configService.getOrThrow<string>('payments.mongoUri');
  }

  get httpPort(): number {
    return this._configService.getOrThrow<number>('payments.httpPort');
  }

  get rabbitmqUri(): string {
    return this._configService.getOrThrow<string>('payments.rabbitmqUri');
  }
}
