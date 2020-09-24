import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../model/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { RegOTP, RegOTPSchema } from '../model/regOTP.schema';
import { JwtStrategy } from './jwt.strategy';
import { ProfileSchema, Profile } from 'src/model/profile.schema';
import { Rank, RankSchema } from 'src/model/rank.schema';

@Module({
    imports: [MongooseModule.forFeature([
        { name: User.name, schema: UserSchema },
        { name: RegOTP.name, schema: RegOTPSchema },
        { name: Profile.name, schema: ProfileSchema },
        { name: Rank.name, schema: RankSchema }
    ]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'topSecret51',
      signOptions: {
        expiresIn: 60000
      }
    }),],
    controllers: [AuthController],
    providers: [
        AuthService,
        JwtStrategy,
    ],
    exports: [
        JwtStrategy,
        PassportModule
      ]
})
export class AuthModule {}
