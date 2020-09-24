import { Controller, ValidationPipe, Body, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CheckUserExistValidation, VerifyOTPValidation, SignUpValidation, SignInValidation } from './auth.dto';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @Post('/checkUserExist')
    async checkUserExist(@Body(ValidationPipe) checkUserExist: CheckUserExistValidation): Promise<any> {
        return await this.authService.checkUserExist(checkUserExist);
    }

    @Post('/verifyOTP')
    async verifyOTP(@Body(ValidationPipe) verifyOTP: VerifyOTPValidation): Promise<any> {
        return await this.authService.verifyOTP(verifyOTP);
    }
    
    @Post('/signUp')
    async signUp(@Body(ValidationPipe) signUpData: SignUpValidation, @Req() req): Promise<any> {
        return await this.authService.signUp(signUpData, req);
    }  
    
    @Post('/logIn')
    async logIn(@Body(ValidationPipe) loginData: SignInValidation): Promise<any> {
        return await this.authService.signIn(loginData);
    }
}
