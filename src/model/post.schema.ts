import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { WorkoutFor, IntensityLevel } from './config.enum';

@Schema()
export class Post extends Document {

  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  subTitle: string;

  @Prop({ required: false })
  bannerImage: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  workoutType: string;

  @Prop({ type: WorkoutFor })
  workoutFor: WorkoutFor;

  @Prop({ type: IntensityLevel })
  intensity: IntensityLevel;

  @Prop({ required: true })
  tickets: string[];

  @Prop({ required: true, default: true })
  isActive: boolean;

  @Prop({ required: true, default: false })
  isDeleted: boolean;
  
}

export const PostSchema = SchemaFactory.createForClass(Post);