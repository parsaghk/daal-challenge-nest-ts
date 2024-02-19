import { AbstractRequestDto } from '@app/common';
import { z } from 'zod';

export class ChangeBalanceRequestDto {
  userId: string;
  amount: number;

  public constructor({ amount, userId }: { userId: string; amount: number }) {
    this.userId = userId;
    this.amount = amount;
    ChangeBalanceRequestDto.constructorValidator().parse(this);
  }

  public static constructorValidator() {
    return z.object({
      userId: z.string(),
      amount: z.number(),
    });
  }
}
