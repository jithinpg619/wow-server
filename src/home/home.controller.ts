import { Controller, Get, Req } from '@nestjs/common';
import { HomeService } from './home.service'; 

@Controller('home')
export class HomeController {
    constructor(private homeService: HomeService) { }

    @Get()
    async getAllTask(@Req() req) {
        try {
            return await this.homeService.getAllSettings();
        } catch (error) {
            return error;
        }
        
    }
}
