import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class RegOTP extends Document {

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  emailOTP: number;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  phoneOTP: number;

  @Prop({ required: true, default: true })
  isActive: boolean;

  @Prop({ required: true, default: false })
  isVerified: boolean;

  @Prop({ required: true, default: false })
  isDeleted: boolean;

}

export const RegOTPSchema = SchemaFactory.createForClass(RegOTP);