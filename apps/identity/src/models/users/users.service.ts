import { Injectable, Logger } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import {
  CreateUserRequestDto,
  CreateUserResponseDto,
  GetBalanceResponseDto,
} from './dto';
import { ChangeBalanceRequestDto, ChangeBalanceResponseDto } from '@app/common';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class UsersService {
  public constructor(private _usersRepository: UsersRepository) {}

  async createUser(createUserRequestDto: CreateUserRequestDto) {
    const userDocument = await this._usersRepository.create({
      ...createUserRequestDto,
      walletBalance: 0,
    });
    return CreateUserResponseDto.fromUserDocument(userDocument);
  }

  public async getBalanceOfUser(userId: string) {
    const userDocument = await this._usersRepository.findOneOrFail({
      _id: userId,
    });
    return new GetBalanceResponseDto(userDocument.walletBalance);
  }

  findUserList() {
    return this._usersRepository.find({});
  }

  public async changeBalance(
    changeBalanceRequestDto: ChangeBalanceRequestDto,
  ): Promise<ChangeBalanceResponseDto> {
    const userDocument = await this._usersRepository.findOne({
      _id: changeBalanceRequestDto.userId,
    });
    if (!userDocument) throw new RpcException('Not found');
    const updatedUserDocument = await this._usersRepository.findOneAndUpdate(
      { _id: changeBalanceRequestDto.userId },
      {
        walletBalance:
          userDocument.walletBalance + changeBalanceRequestDto.amount,
      },
    );
    return new ChangeBalanceResponseDto({
      walletBalance: updatedUserDocument.walletBalance,
      userId: updatedUserDocument._id.toString(),
    });
  }
}
