import { Injectable, HttpException, HttpStatus, MethodNotAllowedException } from '@nestjs/common';
import { UnauthorizedException, ConflictException, InternalServerErrorException } from "@nestjs/common";
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/model/user.schema';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SignUpValidation, CheckUserExistValidation, VerifyOTPValidation, SignInValidation } from './auth.dto';
import { RegOTP } from 'src/model/regOTP.schema';
import { JwtPayload } from './jwtPayload.interface';
import { Profile } from 'src/model/profile.schema';
import { Rank } from 'src/model/rank.schema';

@Injectable()
export class AuthService {

    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        @InjectModel(RegOTP.name) private regOTPModel: Model<RegOTP>,
        @InjectModel(Profile.name) private profileModel: Model<RegOTP>,
        @InjectModel(Rank.name) private rankModel: Model<RegOTP>,
        private jwtService: JwtService) { }

    async checkUserExist(checkUserExist: CheckUserExistValidation): Promise<any> {

        const userQuery = await this.userModel.find(checkUserExist).exec().catch(() => {
            throw new InternalServerErrorException(HttpStatus.INTERNAL_SERVER_ERROR);
        });

        if(userQuery.length > 0) {
            throw new ConflictException('User already exist');
        }

        await this.regOTPModel.updateMany({ 
            email:checkUserExist.email,
            phone: checkUserExist.phone,
            isActive: true
        }, {isActive: false, isVerified: false, isDeleted: true}).exec().catch(() => {
            throw new InternalServerErrorException(HttpStatus.INTERNAL_SERVER_ERROR);
        });

        const otpQuery = new this.regOTPModel();
        otpQuery.email = checkUserExist.email;
        otpQuery.emailOTP = 1234;
        otpQuery.phone = checkUserExist.phone;
        otpQuery.phoneOTP = 1234;

        return otpQuery.save().catch(() => {
            throw new InternalServerErrorException(HttpStatus.INTERNAL_SERVER_ERROR);
        });
    }

    async verifyOTP(verifyOTP: VerifyOTPValidation): Promise<any> {
        
        const otpQuery = await this.regOTPModel.findOneAndUpdate({
                email: verifyOTP.email,
                emailOTP: verifyOTP.emailOTP,
                phone: verifyOTP.phone,
                phoneOTP: verifyOTP.phoneOTP,
                isActive: true, 
                isVerified: false, 
                isDeleted: false
            }, {isVerified: true}).exec().catch(() => {
            throw new InternalServerErrorException(HttpStatus.INTERNAL_SERVER_ERROR);
        });

        if(!otpQuery) {
            throw new ConflictException('OTP is not verified');
        }

        await this.regOTPModel.updateMany({
                email: verifyOTP.email,
                emailOTP: verifyOTP.emailOTP,
                phone: verifyOTP.phone,
                phoneOTP: verifyOTP.phoneOTP,
                isVerified: false
            }, { isActive: false, isDeleted: true }).exec().catch(() => {
                throw new InternalServerErrorException(HttpStatus.INTERNAL_SERVER_ERROR);
            });
        
        return;
    }

    async signUp(item: SignUpValidation, req): Promise<User | null> {

        const checkUser = await this.userModel.findOne({
            email: item.email,
            phone: item.phone,
            isActive: true
        }).exec().catch(() => {
            throw new InternalServerErrorException(HttpStatus.INTERNAL_SERVER_ERROR);
        });

        if(checkUser) {
            throw new ConflictException('User already exist');
        }

        const otpQuery = await this.regOTPModel.findOne({
                email: item.email,
                phone: item.phone,
                isActive: true, 
                isVerified: true, 
                isDeleted: false
            }).exec().catch((err) => {
            throw new InternalServerErrorException(HttpStatus.INTERNAL_SERVER_ERROR);
        });

        if(!otpQuery) {
            throw new ConflictException('OTP is not verified');
        }

        const userQuery = new this.userModel(item);

        const salt = await bcrypt.genSalt().catch(() => { 
            throw new ConflictException(HttpStatus.CONFLICT);
        });
        userQuery.salt = salt;

        userQuery.password = await this.hashPassword(item.password, salt).catch(() => {
            throw new MethodNotAllowedException(HttpStatus.METHOD_NOT_ALLOWED);
        });

        userQuery.userName = `${item.firstName.toLocaleLowerCase()}${item.lastName.toLocaleLowerCase()}${Math.floor(Math.random() * Math.floor(10000))}`;
        userQuery.aboutMe = `Say something about you!`;

        const url = req.protocol + "://" + req.get("host");
        console.log(url);
        userQuery.profileImage = `${url}/assets/icons/user.png`;
        console.log(userQuery.profileImage);

        new this.profileModel({
            userId: userQuery._id,
            rank: 50,
            height: '0',
            weight: '0',
            bodyFat: '0',
            age: 0
        }).save().catch(() => {
            throw new InternalServerErrorException(HttpStatus.INTERNAL_SERVER_ERROR);
        });

        return userQuery.save().catch(() => {
            throw new InternalServerErrorException(HttpStatus.INTERNAL_SERVER_ERROR);
        });

    }

    async signIn(data: SignInValidation): Promise<{accessToken: string, expiresIn: number}> {
        const userId = await this.validateUserPassword(data);
        if(!userId) { 
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload: JwtPayload = { userId };
        const accessToken = await this.jwtService.sign(payload);

        return { accessToken, expiresIn: 60000 };
    }

    async validateUserPassword(data: SignInValidation): Promise<string> {
        const user = await this.userModel.findOne({ $or: [{ email: data.username }, { phone: data.username }]}).exec().catch(() => {
            throw new InternalServerErrorException(HttpStatus.INTERNAL_SERVER_ERROR);
        });
        console.log(user);
        
        if (user && await this.validatePassword(data.password, user.password, user.salt)) {
            return `${user._id}`;
        } else {
            return null;
        }
    }

    private async validatePassword(password: string, userPassword: string, salt: string): Promise<boolean> {
        const hash = await bcrypt.hash(password, salt);
        return hash === userPassword;
    }

    private async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
    }
}
