import { Controller, UseGuards, Get, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ProfileService } from './profile.service';

@Controller('profile')
@UseGuards(AuthGuard())
export class ProfileController {

    constructor(private profileService: ProfileService) { }

    @Get()
    async getMyProfile(@Req() req) {
        
        const result = await this.profileService.getMyProfile(req.user);
        return result;
    }

}
