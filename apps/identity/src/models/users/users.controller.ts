import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserRequestDto } from './dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags()
@Controller('users')
export class UsersController {
  constructor(private _usersService: UsersService) {}

  @Post()
  createUser(@Body() createUserRequestDto: CreateUserRequestDto) {
    return this._usersService.createUser(createUserRequestDto);
  }
}
