import { IsString, MinLength, MaxLength, Matches, IsNumber, Length, IsInt, IsIn } from "class-validator";
import { GenderStatus, BodyTypeStatus } from "src/model/config.enum";

export class SignUpValidation {

    @IsString()
    @MinLength(2)
    @MaxLength(20)
    firstName: string;

    @IsString()
    @MinLength(1)
    @MaxLength(20)
    lastName: string;

    @IsString()
    @MinLength(6)
    @MaxLength(40)
    email: string;

    @IsString()
    @MinLength(10)
    @MaxLength(10)
    phone: string;

    @IsString()
    @MinLength(2)
    @MaxLength(20)
    @Matches(
        /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        { message: 'Password too weak' }
    )
    password: string;

    @IsIn([ GenderStatus.MALE, GenderStatus.FEMALE, GenderStatus.OTHER ])
    gender: GenderStatus

    @IsIn([ BodyTypeStatus.ECTOMORPH, BodyTypeStatus.ENDOMORPH, BodyTypeStatus.MESOMORPH])
    bodyType: BodyTypeStatus
}

export class SignInValidation {

    @IsString()
    @MinLength(2)
    @MaxLength(40)
    username: string;

    @IsString()
    @MinLength(2)
    @MaxLength(20)
    @Matches(
        /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        { message: 'Password too weak' }
    )
    password: string;
}

export class CheckUserExistValidation {
    @IsString()
    @MinLength(6)
    @MaxLength(40)
    email: string;

    @IsString()
    @MinLength(10)
    @MaxLength(10)
    phone: string;
}

export class VerifyOTPValidation {
    @IsString()
    @MinLength(6)
    @MaxLength(40)
    email: string;

    @IsString()
    @MinLength(10)
    @MaxLength(10)
    phone: string;

    @IsInt()
    // @MinLength(4)
    // @MaxLength(4)
    emailOTP: number;

    @IsInt()
    // @MinLength(4)
    // @MaxLength(4)
    phoneOTP: number;
}