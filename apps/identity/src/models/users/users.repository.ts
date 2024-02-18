import { AbstractRepository } from '@app/common';
import { UserDocument } from './entities';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersRepository extends AbstractRepository<UserDocument> {
  protected logger = new Logger(UsersRepository.name);

  constructor(
    @InjectModel(UserDocument.name) private _userModel: Model<UserDocument>,
  ) {
    super(_userModel);
  }
}
