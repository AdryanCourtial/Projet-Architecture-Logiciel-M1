import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RequestRegisterDto {
    @IsNotEmpty()
    @IsEmail()
    email!: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    password!: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    confirmPassword!: string;

    @IsNotEmpty()
    @IsString()
    name!: string;

    @IsNotEmpty()
    @IsString()
    firstname!: string;
}