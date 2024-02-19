import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '@app/common';
import { SchemaTypes, Types } from 'mongoose';

@Schema({ versionKey: false, timestamps: true, collection: 'transactions' })
export class TransactionDocument extends AbstractDocument {
  @Prop({ type: SchemaTypes.ObjectId })
  public userId: Types.ObjectId;

  @Prop()
  public amount: number;

  @Prop()
  public referenceId: string;
}

export const TransactionSchema =
  SchemaFactory.createForClass(TransactionDocument);
