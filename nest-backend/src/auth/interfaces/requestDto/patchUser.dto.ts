import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsString, MinLength } from "class-validator";

export class PatchUserDto {
    @ApiProperty({ example: "newemail@example.com", required: false })
    @IsOptional()
    @IsEmail()
    email?: string;

    @ApiProperty({ example: "Jean", required: false })
    @IsOptional()
    @IsString()
    @MinLength(1)
    firstname?: string;

    @ApiProperty({ example: "Dupont", required: false })
    @IsOptional()
    @IsString()
    @MinLength(1)
    name?: string;

    @ApiProperty({ example: "0612345678", required: false })
    @IsOptional()
    @IsString()
    @MinLength(8)
    phone?: string;
}
