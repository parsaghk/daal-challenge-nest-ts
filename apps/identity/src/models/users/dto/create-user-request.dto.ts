import { z } from 'zod';
import { TJSON } from '@app/common';
import { ApiProperty } from '@nestjs/swagger';
import { AbstractRequestDto } from '@app/common';

export class CreateUserRequestDto extends AbstractRequestDto {
  @ApiProperty()
  public fullName: string;

  constructor({ fullName }: { fullName: string }) {
    super();
    this.fullName = fullName;
  }

  static constructorValidator() {
    return z.object({ fullName: z.string().min(1) });
  }

  static fromJSON(json: TJSON): CreateUserRequestDto {
    const validJSON = this.constructorValidator().parse(json);
    return new CreateUserRequestDto(validJSON);
  }
}
