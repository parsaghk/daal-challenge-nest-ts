import { z } from 'zod';

export class ChangeBalanceResponseDto {
  userId: string;
  walletBalance: number;

  public constructor({
    walletBalance,
    userId,
  }: {
    userId: string;
    walletBalance: number;
  }) {
    this.userId = userId;
    this.walletBalance = walletBalance;
    ChangeBalanceResponseDto.constructorValidator().parse(this);
  }

  public static constructorValidator() {
    return z.object({
      userId: z.string(),
      walletBalance: z.number(),
    });
  }
}
