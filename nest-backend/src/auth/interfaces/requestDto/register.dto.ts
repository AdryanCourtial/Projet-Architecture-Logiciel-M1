import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RequestRegisterDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email!: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    password!: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    confirmPassword!: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name!: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    firstname!: string;
}