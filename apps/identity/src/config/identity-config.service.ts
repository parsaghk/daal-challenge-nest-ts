import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IdentityConfigService {
  public constructor(private readonly _configService: ConfigService) {}

  get mongoUri(): string {
    return this._configService.getOrThrow<string>('identity.mongoUri');
  }

  get httpPort(): number {
    return this._configService.getOrThrow<number>('identity.httpPort');
  }

  get tcpPort(): number {
    return this._configService.getOrThrow<number>('identity.tcpPort');
  }

  get tcpHost(): string {
    return this._configService.getOrThrow<string>('identity.tcpHost');
  }
}
