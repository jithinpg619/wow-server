import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Follower extends Document {

  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  followerId: string;

  @Prop({ required: true, default: true })
  isActive: boolean;

  @Prop({ required: true, default: false })
  isDeleted: boolean;
  
}

export const FollowerSchema = SchemaFactory.createForClass(Follower);