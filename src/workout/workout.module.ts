import { Module } from '@nestjs/common';
import { WorkoutService } from './workout.service';
import { WorkoutController } from './workout.controller';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { WorkoutType, WorkoutTypeSchema } from 'src/model/workoutType.schema';
import { Workout, WorkoutSchema } from 'src/model/workout.schema';

@Module({
    imports: [AuthModule,
        MongooseModule.forFeature([
            { name: WorkoutType.name, schema: WorkoutTypeSchema },
            { name: Workout.name, schema: WorkoutSchema }
        ])
    ],
    controllers: [WorkoutController],
    providers: [WorkoutService]
})
export class WorkoutModule { }
