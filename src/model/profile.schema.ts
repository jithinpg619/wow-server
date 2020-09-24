import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Profile extends Document {

    @Prop({ required: true })
    userId: string;

    @Prop({ required: true })
    rank: number;

    @Prop({ required: true })
    height: string;

    @Prop({ required: true })
    weight: string;

    @Prop({ required: true })
    bodyFat: string;

    @Prop({ required: true, unique: true })
    age: number;

    @Prop({ required: true, default: true })
    isActive: boolean;

    @Prop({ required: true, default: false })
    isDeleted: boolean;

}

export const ProfileSchema = SchemaFactory.createForClass(Profile);