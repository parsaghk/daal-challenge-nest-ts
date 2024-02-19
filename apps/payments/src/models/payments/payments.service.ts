import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreatePaymentRequestDto, CreatePaymentResponseDto } from './dto';
import { PaymentsRepository } from './payments.repository';
import { Types } from 'mongoose';
import {
  ChangeBalanceRequestDto,
  ChangeBalanceResponseDto,
  IDENTITY_SERVICE,
} from '@app/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { lastValueFrom, map, Observable, tap } from 'rxjs';
import * as Crypto from 'node:crypto';

@Injectable()
export class PaymentsService {
  public constructor(
    private readonly _paymentsRepository: PaymentsRepository,
    @Inject(IDENTITY_SERVICE) private readonly _client: ClientProxy,
  ) {}

  public async createPayment(
    createPaymentRequestDto: CreatePaymentRequestDto,
  ): Promise<CreatePaymentResponseDto> {
    const changeBalanceResponseDto = await lastValueFrom(
      this._client.send<ChangeBalanceResponseDto, ChangeBalanceRequestDto>(
        'change-balance',
        new ChangeBalanceRequestDto({
          amount: createPaymentRequestDto.amount,
          userId: createPaymentRequestDto.userId,
        }),
      ),
    ).catch((err: RpcException) => {
      throw new BadRequestException(err.message);
    });
    const payment = await this._paymentsRepository.create({
      amount: createPaymentRequestDto.amount,
      userId: new Types.ObjectId(changeBalanceResponseDto.userId),
      referenceId: Crypto.randomUUID(),
    });
    return new CreatePaymentResponseDto({
      referenceId: payment.referenceId,
    });
  }
}
