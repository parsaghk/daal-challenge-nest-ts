import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import {
  CreateTransactionRequestDto,
  CreateTransactionResponseDto,
} from './dto';
import { TransactionsRepository } from './transactions.repository';
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
export class TransactionsService {
  public constructor(
    private readonly _transactionsRepository: TransactionsRepository,
    @Inject(IDENTITY_SERVICE) private readonly _client: ClientProxy,
  ) {}

  public async createTransaction(
    createTransactionRequestDto: CreateTransactionRequestDto,
  ): Promise<CreateTransactionResponseDto> {
    const changeBalanceResponseDto = await lastValueFrom(
      this._client.send<ChangeBalanceResponseDto, ChangeBalanceRequestDto>(
        'change-balance',
        new ChangeBalanceRequestDto({
          amount: createTransactionRequestDto.amount,
          userId: createTransactionRequestDto.userId,
        }),
      ),
    ).catch((err: RpcException) => {
      throw new BadRequestException(err.message);
    });
    const transaction = await this._transactionsRepository.create({
      amount: createTransactionRequestDto.amount,
      userId: new Types.ObjectId(changeBalanceResponseDto.userId),
      referenceId: Crypto.randomUUID(),
    });
    return new CreateTransactionResponseDto({
      referenceId: transaction.referenceId,
    });
  }
}
