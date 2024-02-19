import { TypeSafeModel } from '@app/common';
import { z } from 'zod';

export class CreateTransactionResponseDto extends TypeSafeModel {
  public referenceId: string;

  constructor({ referenceId }: { referenceId: string }) {
    super();
    this.referenceId = referenceId;
    CreateTransactionResponseDto.constructorValidator().parse(this);
  }

  public static constructorValidator() {
    return z.object({
      referenceId: z.string(),
    });
  }
}
