import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/model/user.schema';
import { MulterModule } from '@nestjs/platform-express';
import { Post, PostSchema } from 'src/model/post.schema';

@Module({
  imports: [AuthModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Post.name, schema: PostSchema }
    ]),
    MulterModule.register({
      dest: './files',
    })
],
  providers: [PostService],
  controllers: [PostController]
})
export class PostModule {}
