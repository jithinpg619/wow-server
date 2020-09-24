import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { HomeModule } from './home/home.module';
import { ProfileModule } from './profile/profile.module';
import { Rank, RankSchema } from './model/rank.schema';
import { WorkoutModule } from './workout/workout.module';
import { WorkoutType, WorkoutTypeSchema } from './model/workoutType.schema';
import { Workout, WorkoutSchema } from './model/workout.schema';
import { PostModule } from './post/post.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forRoot('mongodb+srv://WorkOrWalkout:YETBvmnILXOV3utx@cluster0-ow3xk.mongodb.net/testDB?retryWrites=true&w=majority', {useFindAndModify: false, useCreateIndex: true}),
    MongooseModule.forFeature([
      { name: Rank.name, schema: RankSchema },
      { name: WorkoutType.name, schema: WorkoutTypeSchema },
      { name: Workout.name, schema: WorkoutSchema }
    ]),
    HomeModule,
    ProfileModule,
    WorkoutModule,
    PostModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
