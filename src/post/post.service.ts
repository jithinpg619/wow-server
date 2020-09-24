import { Injectable, InternalServerErrorException, HttpStatus } from '@nestjs/common';
import { CreatePostValidation } from './post.dto';
import { User } from 'src/model/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from 'src/model/post.schema';

@Injectable()
export class PostService {
    
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        @InjectModel(Post.name) private postModel: Model<Post>
    ) { }

    async getMyPost(user: User): Promise<any> {
        
        const postData = await this.postModel.find({
            userId: user._id,
            isActive: true,
            isDeleted: false
        }).select('title subTitle bannerImage description workoutType workoutFor intensity tickets')
        .exec().catch((err) => {
            throw new InternalServerErrorException(HttpStatus.INTERNAL_SERVER_ERROR);
        });
        
        return postData;
    }

    async createPost(post: CreatePostValidation, user: User, file: any): Promise<any> {
        
        console.log('reached 2');
        console.log(post);
        console.log(user);
        console.log(file);
        
        const tickets = post.tickets.split(',');

        await new this.postModel({
            userId: user._id,
            title: post.title,
            subTitle: post.subTitle,
            bannerImage: file.filename,
            description: post.description,
            workoutType: post.workoutType,
            workoutFor: post.workoutFor,
            intensity: post.intensity,
            tickets: tickets
            }).save().catch(() => {
                throw new InternalServerErrorException(HttpStatus.INTERNAL_SERVER_ERROR);
            });
        
        return {user, post, file};
    }
}
