import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Rating extends Document {

  @Prop({ required: true })
  postId: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  rating: string;

  @Prop({ required: true })
  comment: string;

  @Prop({ required: true, default: true })
  isActive: boolean;

  @Prop({ required: true, default: false })
  isDeleted: boolean;
  
}

export const RatingSchema = SchemaFactory.createForClass(Rating);