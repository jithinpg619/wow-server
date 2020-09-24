import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class WorkoutType extends Document {

  @Prop({ required: true })
  type: number;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  point: number;

  @Prop({ required: true })
  image: string;

  @Prop({ required: true, default: true })
  isActive: boolean;

  @Prop({ required: true, default: false })
  isDeleted: boolean;
  
}

export const WorkoutTypeSchema = SchemaFactory.createForClass(WorkoutType);