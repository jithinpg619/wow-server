import { Injectable } from '@nestjs/common';
import { GenderStatus, BodyTypeStatus } from 'src/model/config.enum';

@Injectable()
export class HomeService {
    
    constructor() { }

    async getAllSettings(): Promise<any[]> {
       
        const settings = [{
            "images":  [
                "https://wpstatic.gymbeam.com/blog/wp-content/uploads/mageblog/Phil-Heath-Pictures.jpg", 
                "https://workouttrends.com/wp-content/uploads/2019/01/Phil-Heath-Workout-In-Gym-1150x767.jpg", 
                "https://generationiron.com/wp-content/uploads/2020/04/Phil-Heath-Answers-If-Hell-Compete-at-Athleticon-or-The-Olympia-This-Year.jpg"
            ],
            "rank" : {
                "Bronze": 50,
                "Silver": 250,
                "Gold": 500,
                "Platinum": 1000,
                "Diamond": 2500,
                "Crown": 5000,
                "Ace": 10000
            },
            "gender": GenderStatus,
            "bodyType" : BodyTypeStatus
        }];
        return settings;
    }
}
