import { TypeSafeModel } from '../models';
import { TJSON } from '@app/common/types';

export class AbstractRequestDto extends TypeSafeModel {
  static fromJSON(_: TJSON) {
    throw new Error('Not implemented');
  }
}
