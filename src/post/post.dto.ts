import { IsString, MinLength, MaxLength, IsInt, IsIn, IsObject } from "class-validator";
import { IntensityLevel, WorkoutFor } from "src/model/config.enum";

export class CreatePostValidation {

    @IsString()
    @MinLength(2)
    @MaxLength(40)
    title: string;

    @IsString()
    @MinLength(2)
    @MaxLength(40)
    subTitle: string;

    @IsString()
    @MinLength(2)
    @MaxLength(40)
    description: string;

    @IsInt()
    workoutType: number;

    @IsIn([ WorkoutFor.BULK, WorkoutFor.NORMAL, WorkoutFor.SHREDD ])
    workoutFor: WorkoutFor

    @IsIn([ IntensityLevel.HIGH, IntensityLevel.LOW, IntensityLevel.MEDIUM])
    intensity: IntensityLevel

    @IsObject()
    tickets: string;

    @IsObject()
    bannerImage: object;
}
