import { Controller, Get, UseGuards, Post, Req, Body, UseInterceptors, UploadedFile } from '@nestjs/common';
import {FileInterceptor} from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { PostService } from './post.service';
import { CreatePostValidation } from './post.dto';

@Controller('post')
@UseGuards(AuthGuard())
export class PostController {
    constructor(private postService: PostService) { }

    @Get()
    async getMyPost(@Req() req) {
        
        try {
            return await this.postService.getMyPost(req.user);
        } catch (error) {
            console.log(error);
            
        }
    }

    @Post()
    @UseInterceptors(FileInterceptor('bannerImage'))
    async createPost(@Req() req, @Body() createPostDto: CreatePostValidation, @UploadedFile() file) {
        
        try {
            console.log('reached');
            
            return await this.postService.createPost(createPostDto, req.user, file);
        } catch (error) {
            console.log(error);
            
        }
    }
}
