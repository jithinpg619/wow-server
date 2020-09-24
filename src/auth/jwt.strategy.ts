import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JwtPayload } from './jwtPayload.interface';
import { UnauthorizedException } from '@nestjs/common';
import { User } from 'src/model/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'topSecret51'
        });
    }

    async validate(payload: JwtPayload): Promise<User> {
        const { userId } = payload;
        console.log(userId);
        
        const user = await this.userModel.findOne({
            _id: userId,
            isActive: true
        }).select('_id firstName lastName email phone gender bodyType userName aboutMe profileImage').exec();
        
        if(!user) throw new UnauthorizedException();

        return user;
    }
}