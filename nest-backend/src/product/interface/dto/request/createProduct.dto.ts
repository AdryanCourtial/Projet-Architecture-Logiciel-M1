import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNumber, IsOptional, MinLength, MaxLength, Min } from "class-validator";

export class CreateProductDto {
    @ApiProperty()
    @IsString()
    @MinLength(1)
    @MaxLength(100)
    name!: string;

    @ApiProperty()
    @IsString()
    @MinLength(1)
    @MaxLength(500)
    description!: string;

    @ApiProperty()
    @IsNumber()
    @Min(0)
    price!: number;

    @ApiProperty()
    @IsNumber()
    categoryId!: number;

    @ApiProperty()
    @IsNumber()
    @Min(0)
    @IsOptional()
    stock?: number;
}

export class UpdateProductDto {
    @ApiProperty()
    @IsString()
    @MinLength(1)
    @MaxLength(100)
    @IsOptional()
    name?: string;

    @ApiProperty()
    @IsString()
    @MinLength(1)
    @MaxLength(500)
    @IsOptional()
    description?: string;

    @ApiProperty()
    @IsNumber()
    @Min(0)
    @IsOptional()
    price?: number;

    @ApiProperty()
    @IsNumber()
    @Min(0)
    @IsOptional()
    stock?: number;
}
