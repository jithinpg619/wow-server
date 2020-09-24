import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, User } from 'src/model/user.schema';
import { Profile, ProfileSchema } from 'src/model/profile.schema';
import { RankSchema, Rank } from 'src/model/rank.schema';

@Module({
  imports: [AuthModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Profile.name, schema: ProfileSchema },
      { name: Rank.name, schema: RankSchema }
    ])
  ],
  controllers: [ProfileController],
  providers: [ProfileService]
})
export class ProfileModule {}
