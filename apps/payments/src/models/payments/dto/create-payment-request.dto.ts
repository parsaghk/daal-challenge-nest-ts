import { AbstractRequestDto, TJSON } from '@app/common';
import { z } from 'zod';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePaymentRequestDto extends AbstractRequestDto {
  @ApiProperty()
  public userId: string;
  @ApiProperty()
  public amount: number;

  constructor({ amount, userId }: { userId: string; amount: number }) {
    super();
    this.amount = amount;
    this.userId = userId;
  }

  public static constructorValidator() {
    return z.object({
      userId: z.string(),
      amount: z.number(),
    });
  }

  public static fromJSON(json: TJSON): CreatePaymentRequestDto {
    const validJSON = this.constructorValidator().parse(json);
    return new CreatePaymentRequestDto(validJSON);
  }
}
