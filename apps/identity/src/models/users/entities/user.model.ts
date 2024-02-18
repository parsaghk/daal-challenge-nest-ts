import { AbstractDocument } from '@app/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false, timestamps: true })
export class UserDocument extends AbstractDocument {
  @Prop({ required: true })
  fullName: string;

  @Prop({ default: 0, required: true })
  walletBalance: number = 0;
}

export const UserSchema = SchemaFactory.createForClass(UserDocument);
