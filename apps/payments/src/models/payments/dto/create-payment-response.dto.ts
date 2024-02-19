import { TypeSafeModel } from '@app/common';
import { z } from 'zod';

export class CreatePaymentResponseDto extends TypeSafeModel {
  public referenceId: string;

  constructor({ referenceId }: { referenceId: string }) {
    super();
    this.referenceId = referenceId;
    CreatePaymentResponseDto.constructorValidator().parse(this);
  }

  public static constructorValidator() {
    return z.object({
      referenceId: z.string(),
    });
  }
}
