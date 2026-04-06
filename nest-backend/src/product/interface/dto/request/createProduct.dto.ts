import { IsString, IsNumber, IsOptional, MinLength, MaxLength, Min } from "class-validator";

export class CreateProductDto {
    @IsString()
    @MinLength(1)
    @MaxLength(100)
    name!: string;

    @IsString()
    @MinLength(1)
    @MaxLength(500)
    description!: string;

    @IsNumber()
    @Min(0)
    price!: number;

    @IsNumber()
    @Min(0)
    @IsOptional()
    stock?: number;
}

export class UpdateProductDto {
    @IsString()
    @MinLength(1)
    @MaxLength(100)
    @IsOptional()
    name?: string;

    @IsString()
    @MinLength(1)
    @MaxLength(500)
    @IsOptional()
    description?: string;

    @IsNumber()
    @Min(0)
    @IsOptional()
    price?: number;

    @IsNumber()
    @Min(0)
    @IsOptional()
    stock?: number;
}
