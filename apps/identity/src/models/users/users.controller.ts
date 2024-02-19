import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserRequestDto } from './dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ChangeBalanceRequestDto, ChangeBalanceResponseDto } from '@app/common';

@ApiTags()
@Controller('users')
export class UsersController {
  constructor(private _usersService: UsersService) {}

  @ApiOperation({ summary: 'Get balance of user by id' })
  @Get('/:userId/balance')
  getBalanceOfUser(@Param('userId') userId: string) {
    return this._usersService.getBalanceOfUser(userId);
  }

  @ApiOperation({ summary: 'Get list of all users' })
  @ApiOperation({ summary: 'Create a new user' })
  @Get()
  findUserList() {
    return this._usersService.findUserList();
  }

  @ApiOperation({ summary: 'Create a new user' })
  @Post()
  createUser(@Body() createUserRequestDto: CreateUserRequestDto) {
    return this._usersService.createUser(createUserRequestDto);
  }

  @MessagePattern('change-balance')
  changeBalance(
    @Payload() changeBalanceRequestDto: ChangeBalanceRequestDto,
  ): Promise<ChangeBalanceResponseDto> {
    return this._usersService.changeBalance(changeBalanceRequestDto);
  }
}
