import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserRequestDto, CreateUserResponseDto } from './dto';

@Injectable()
export class UsersService {
  public constructor(private _usersRepository: UsersRepository) {}

  async createUser(createUserRequestDto: CreateUserRequestDto) {
    const userDocument = await this._usersRepository.create({
      ...createUserRequestDto,
      walletBalance: 0,
    });
    console.log(userDocument);
    return CreateUserResponseDto.fromUserDocument(userDocument);
  }
}
