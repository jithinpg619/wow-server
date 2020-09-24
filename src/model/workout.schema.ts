import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Workout extends Document {

  @Prop({ required: true, unique: true })
  staticId: number;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  url: string;

  @Prop({ required: true })
  thumbnail: string;

  @Prop({ required: true, default: true })
  isActive: boolean;

  @Prop({ required: true, default: false })
  isDeleted: boolean;
  
}

export const WorkoutSchema = SchemaFactory.createForClass(Workout);