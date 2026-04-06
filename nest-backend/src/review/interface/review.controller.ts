import {
    Controller,
    Post,
    Get,
    Body,
    Param,
    Query,
    UseGuards,
    Req,
} from '@nestjs/common';
import { CreateReviewDto, ReviewQueryDto } from './requestDto/create-review.dto';
import { ReviewResponseDto, ReviewPageResponseDto, AverageRatingResponseDto } from './responseDto/review.response.dto';
import { Review } from '../domain/review.agregate';
import { PaginationParams } from 'src/shared/application/type/PaginationParams';
import { SessionAuthGuard } from 'src/auth/interfaces/guards/session.guard';
import { CreateReviewUseCase } from '../application/use-cases/create-review.use-case';
import { GetReviewsByProductUseCase } from '../application/use-cases/get-reviews-by-product.use-case';
import { GetReviewsByUserUseCase } from '../application/use-cases/get-reviews-by-user.use-case';
import { GetAverageRatingUseCase } from '../application/use-cases/get-average-rating.use-case';

@Controller('reviews')
@UseGuards(SessionAuthGuard)
export class ReviewController {
    constructor(
        private readonly createReviewUseCase: CreateReviewUseCase,
        private readonly getReviewsByProductUseCase: GetReviewsByProductUseCase,
        private readonly getReviewsByUserUseCase: GetReviewsByUserUseCase,
        private readonly getAverageRatingUseCase: GetAverageRatingUseCase,
    ) {}

    @Post('/product/:productId')
    async createReview(@Param('productId') productId: string, @Body() dto: CreateReviewDto, @Req() req: any): Promise<ReviewResponseDto> {
        const userId = req.session.userId;

        const review = await this.createReviewUseCase.execute({
            userId,
            productId: parseInt(productId),
            rating: dto.rating,
            title: dto.title,
            comment: dto.comment,
        });

        return this.mapReviewToResponseDto(review);

    }

    @Get('product/:productId')
    async getReviewsByProduct(@Param('productId') productId: string, @Query() query: ReviewQueryDto): Promise<ReviewPageResponseDto> {
        const page = query.page || 1;
        const limit = query.limit || 10;

        const pagination: PaginationParams = { page, limit };
        const result = await this.getReviewsByProductUseCase.execute(
            parseInt(productId),
            pagination
        );

        return {
            items: result.items.map(review => this.mapReviewToResponseDto(review)),
            page: result.page,
            limit: result.limit,
            total: result.totalItems,
            totalPages: result.totalPages,
        };
    }

    @Get('user/:userId')
    async getReviewsByUser(@Param('userId') userId: string, @Query() query: ReviewQueryDto): Promise<ReviewPageResponseDto> {
        const page = query.page || 1;
        const limit = query.limit || 10;

        const pagination: PaginationParams = { page, limit };
        const result = await this.getReviewsByUserUseCase.execute(
            parseInt(userId),
            pagination
        );

        return {
            items: result.items.map(review => this.mapReviewToResponseDto(review)),
            page: result.page,
            limit: result.limit,
            total: result.totalItems,
            totalPages: result.totalPages,
        };
 
    }

    @Get('product/:productId/average')
    async getAverageRating(@Param('productId') productId: string): Promise<AverageRatingResponseDto> {
        return await this.getAverageRatingUseCase.execute(parseInt(productId));
}

    private mapReviewToResponseDto(review: Review): ReviewResponseDto {
        return {
            id: review.getId()!,
            userId: review.getUserId(),
            productId: review.getProductId(),
            rating: review.getRating().getValue(),
            title: review.getComment().getTitle(),
            comment: review.getComment().getContent(),
        };
    }
}
