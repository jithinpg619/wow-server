import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Rank } from './model/rank.schema';
import { WorkoutType } from './model/workoutType.schema';
import { Workout } from './model/workout.schema';

@Controller()
export class AppController {
  constructor(
    @InjectModel(Rank.name) private rankModel: Model<Rank>,
    @InjectModel(WorkoutType.name) private workoutTypeModel: Model<WorkoutType>,
    @InjectModel(Workout.name) private workoutModel: Model<WorkoutType>,
     private readonly appService: AppService) {

      // this.rankModel.collection.drop();
      // this.rankModel.insertMany([
      //   {
      //     name: 'Bronze',
      //     value: 50,
      //     image: 'wqe'
      //   },
      //   {
      //     name: 'Silver',
      //     value: 250,
      //     image: 'wqe'
      //   },
      //   {
      //     name: 'Gold',
      //     value: 500,
      //     image: 'wqe'
      //   },
      //   {
      //     name: 'Platinum',
      //     value: 1000,
      //     image: 'wqe'
      //   },
      //   {
      //     name: 'Diamond',
      //     value: 2500,
      //     image: 'wqe'
      //   },
      //   {
      //     name: 'Crown',
      //     value: 5000,
      //     image: 'wqe'
      //   },
      //   {
      //     name: 'Ace',
      //     value: 10000,
      //     image: 'wqe'
      //   },
      //   {
      //     name: 'Conqour',
      //     value: 25000,
      //     image: 'wqe'
      //   }
      // ]);

      // this.workoutTypeModel.collection.drop();
      // this.workoutTypeModel.insertMany([
      //   {
      //     type: 1,
      //     name: 'Cardio',
      //     point: 25,
      //     image: 'https://cdn2.iconfinder.com/data/icons/sport-8/70/cardio_heart-512.png'
      //   },
      //   {
      //     type: 2,
      //     name: 'Single',
      //     point: 10,
      //     image: 'https://png.pngtree.com/png-vector/20190612/ourmid/pngtree-bicepsbodybuildinggrowthmuscleworkout--flat-color-icon-png-image_1351060.jpg'
      //   },
      //   {
      //     type: 3,
      //     name: 'Combo',
      //     point: 50,
      //     image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQsOMvucq2iG-WMWjYch9moc4ipURIOB2wR3w&usqp=CAU'
      //   },
      //   {
      //     type: 4,
      //     name: 'Tripple',
      //     point: 100,
      //     image: 'https://i.pinimg.com/736x/3f/87/d4/3f87d40040a276d00ac786e0a403b281.jpg'
      //   },
      // ]);

      // this.workoutModel.collection.drop();
      // this.workoutModel.insertMany([
      //   {
      //     staticId: 1,
      //     name: 'Dumbell Press',
      //     url: 'https://www.youtube.com/watch?v=VmB1G1K7v94',
      //     thumbnail: 'https://cdn2.iconfinder.com/data/icons/sport-8/70/cardio_heart-512.png'
      //   },
      //   {
      //     staticId: 2,
      //     name: 'Dumbell Curl',
      //     url: 'https://www.youtube.com/watch?v=yTWO2th-RIY',
      //     thumbnail: 'https://cdn2.iconfinder.com/data/icons/sport-8/70/cardio_heart-512.png'
      //   },
      //   {
      //     staticId: 3,
      //     name: 'Dumbell Press Shoulder',
      //     url: 'https://www.youtube.com/watch?v=0JfYxMRsUCQ',
      //     thumbnail: 'https://cdn2.iconfinder.com/data/icons/sport-8/70/cardio_heart-512.png'
      //   },
      //   {
      //     staticId: 4,
      //     name: 'Dumbell Squat',
      //     url: 'https://www.youtube.com/watch?v=v_c67Omje48',
      //     thumbnail: 'https://cdn2.iconfinder.com/data/icons/sport-8/70/cardio_heart-512.png'
      //   },

      // ]);
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
