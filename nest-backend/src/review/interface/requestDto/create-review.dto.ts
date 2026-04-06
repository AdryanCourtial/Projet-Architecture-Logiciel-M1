import { IsNumber, IsString, Min, Max, MinLength, MaxLength } from 'class-validator';

export class CreateReviewDto {

    @IsNumber()
    @Min(1)
    @Max(5)
    rating!: number;

    @IsString()
    @MinLength(1)
    @MaxLength(100)
    title!: string;

    @IsString()
    @MinLength(1)
    @MaxLength(1000)
    comment!: string;
}

export class UpdateReviewDto {
    @IsNumber()
    @Min(1)
    @Max(5)
    rating?: number;

    @IsString()
    @MinLength(1)
    @MaxLength(100)
    title?: string;

    @IsString()
    @MinLength(1)
    @MaxLength(1000)
    comment?: string;
}

export class ReviewQueryDto {
    page?: number = 1;
    limit?: number = 10;
}
