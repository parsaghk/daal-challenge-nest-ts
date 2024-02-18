import { z } from 'zod';

export class GeneralResponseDto {
  public message: string;
  public isSuccess: boolean;

  constructor() {}

  static constructValidator() {
    return z.object({
      message: z.string(),
      isSuccess: z.boolean(),
    });
  }
}
