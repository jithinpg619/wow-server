import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { GenderStatus, BodyTypeStatus } from './config.enum';

@Schema()
export class User extends Document {

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  userName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, unique: true })
  phone: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: GenderStatus })
  gender: GenderStatus;

  @Prop({ type: BodyTypeStatus })
  bodyType: BodyTypeStatus;

  @Prop({ required: false })
  aboutMe: string;

  @Prop({ required: false })
  profileImage: string;

  @Prop({ required: true })
  salt: string;

  @Prop({ required: true, default: true })
  isActive: boolean;

  @Prop({ required: true, default: false })
  isVerified: boolean;

  @Prop({ required: true, default: false })
  isDeleted: boolean;
  
}

export const UserSchema = SchemaFactory.createForClass(User);