import { Injectable, InternalServerErrorException, HttpStatus } from '@nestjs/common';
import { User } from 'src/model/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Profile } from 'src/model/profile.schema';
import { Model } from 'mongoose';
import { Rank } from 'src/model/rank.schema';

@Injectable()
export class ProfileService {

    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        @InjectModel(Profile.name) private profileModel: Model<Profile>,
        @InjectModel(Rank.name) private rankModel: Model<Rank>
    ) { }

    async getMyProfile(user: User): Promise<any> {
        const userData = user;
        console.log(userData);
        
        const profileData = await this.profileModel.findOne({
            userId: user._id,
            isActive: true,
            isDeleted: false
        }).select('rank age bodyFat height weight')
        .exec().catch((err) => {
            throw new InternalServerErrorException(HttpStatus.INTERNAL_SERVER_ERROR);
        });
        console.log(profileData);

        const rankData = await this.rankModel.findOne({
            value: { $lte: profileData.rank},
            isActive: true,
            isDeleted: false
        }).select('image name value')
        .exec().catch((err) => {
            throw new InternalServerErrorException(HttpStatus.INTERNAL_SERVER_ERROR);
        });
        console.log(rankData);

        return { userData, profileData, rankData };
    }
}
