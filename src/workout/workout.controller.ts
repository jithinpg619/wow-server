import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { WorkoutService } from './workout.service';

@Controller('workout')
@UseGuards(AuthGuard())
export class WorkoutController {

    constructor(private workoutService: WorkoutService) { }

    @Get()
    async getWorkoutSettings() {
        try {
            return await this.workoutService.getWorkoutSettings();
        } catch (error) {
            console.log(error);
            
        }
    }

    @Get('/type')
    async getWorkoutType() {
        try {
            return await this.workoutService.getWorkoutType();
        } catch (error) {
            console.log(error);
            
        }
    }

    @Get('/collection')
    async getAllCollection() {
        try {
            return await this.workoutService.getAllCollection();
        } catch (error) {
            console.log(error);
            
        }
    }
}
