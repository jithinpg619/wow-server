import { Injectable, InternalServerErrorException, HttpStatus } from '@nestjs/common';
import { WorkoutType } from 'src/model/workoutType.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Workout } from 'src/model/workout.schema';
import { IntensityLevel, WorkoutFor } from 'src/model/config.enum';

@Injectable()
export class WorkoutService {
    constructor(
        @InjectModel(WorkoutType.name) private workoutTypeModel: Model<WorkoutType>,
        @InjectModel(Workout.name) private workoutModel: Model<WorkoutType>
    ) { }

    async getWorkoutSettings(): Promise<any> {
        const WorkoutType = await this.getWorkoutType();
        return { IntensityLevel, WorkoutFor, WorkoutType }
    }

    async getWorkoutType(): Promise<any> {

        return await this.workoutTypeModel.find({
            isActive: true,
            isDeleted: false
        }).select('type name point image')
            .exec().catch((err) => {
                throw new InternalServerErrorException(HttpStatus.INTERNAL_SERVER_ERROR);
            });
    }

    async getAllCollection(): Promise<any> {

        return await this.workoutModel.find({
            isActive: true,
            isDeleted: false
        }).select('staticId name url thumbnail')
            .exec().catch((err) => {
                throw new InternalServerErrorException(HttpStatus.INTERNAL_SERVER_ERROR);
            });
    }
}
