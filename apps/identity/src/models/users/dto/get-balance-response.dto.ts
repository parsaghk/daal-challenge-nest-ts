import { z } from 'zod';

export class GetBalanceResponseDto {
  balance: number;

  constructor(balance: number) {
    this.balance = balance;
    GetBalanceResponseDto.constructorValidator().parse(this);
  }

  public static constructorValidator() {
    return z.object({
      balance: z.number(),
    });
  }
}
