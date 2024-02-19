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

  get tcpPort(): number {
    return this._configService.getOrThrow<number>('payments.tcpPort');
  }

  get tcpHost(): string {
    return this._configService.getOrThrow<string>('payments.tcpHost');
  }
  get identityPort(): number {
    return this._configService.getOrThrow<number>('payments.identityPort');
  }

  get identityHost(): string {
    return this._configService.getOrThrow<string>('payments.identityHost');
  }
}
