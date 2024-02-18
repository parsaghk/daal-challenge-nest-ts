import { z } from 'zod';
import { UserDocument } from '../entities';

export class CreateUserResponseDto {
  public id: string;

  public fullName: string;

  public walletBalance: number;

  constructor({
    id,
    fullName,
    walletBalance,
  }: {
    id: string;
    fullName: string;
    walletBalance: number;
  }) {
    this.id = id;
    this.fullName = fullName;
    this.walletBalance = walletBalance;
  }

  static constructorValidator() {
    return z.object({
      id: z.string(),
      fullName: z.string(),
      walletBalance: z.number(),
    });
  }

  static fromUserDocument(userDocument: UserDocument): CreateUserResponseDto {
    return new CreateUserResponseDto({
      fullName: userDocument.fullName,
      id: userDocument._id.toString(),
      walletBalance: userDocument.walletBalance,
    });
  }
}
