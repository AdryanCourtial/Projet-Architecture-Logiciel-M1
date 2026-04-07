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
import { PaginationParams } from 'src/shared/application/type/PaginationParams';
import { SessionAuthGuard } from 'src/auth/interfaces/guards/session.guard';
import { CreateReviewUseCase } from '../application/use-cases/create-review.use-case';
import { GetReviewsByProductUseCase } from '../application/use-cases/get-reviews-by-product.use-case';
import { GetReviewsByUserUseCase } from '../application/use-cases/get-reviews-by-user.use-case';
import { GetAverageRatingUseCase } from '../application/use-cases/get-average-rating.use-case';
import { mapReviewToResponseDto } from './responseDto/utils';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('reviews')
export class ReviewController {
    constructor(
        private readonly createReviewUseCase: CreateReviewUseCase,
        private readonly getReviewsByProductUseCase: GetReviewsByProductUseCase,
        private readonly getReviewsByUserUseCase: GetReviewsByUserUseCase,
        private readonly getAverageRatingUseCase: GetAverageRatingUseCase,
    ) {}

    @ApiOperation({ summary: "Poster un commentaire sur un produit" })
    @ApiResponse({ status: 200, description: "Poster un commentaire sur un produit", type: Promise<ReviewPageResponseDto> })
    @UseGuards(SessionAuthGuard)
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

        return mapReviewToResponseDto(review);

    }

    @ApiOperation({ summary: "Récupère les review d'un produit précis" })
    @ApiResponse({ status: 200, description: "Récupère les review d'un produit précis", type: Promise<ReviewPageResponseDto> })
    @Get('product/:productId')
    async getReviewsByProduct(@Param('productId') productId: string, @Query() query: ReviewQueryDto): Promise<ReviewPageResponseDto> {
        const page = query.page || 1;
        let limit = query.limit || 10;
        
        if (typeof limit === 'string') {
            limit = parseInt(limit);
        }

        const pagination: PaginationParams = { page, limit };
        const result = await this.getReviewsByProductUseCase.execute(
            parseInt(productId),
            pagination
        );

        return {
            items: result.items.map(review =>  mapReviewToResponseDto(review)),
            page: result.page,
            limit: result.limit,
            total: result.totalItems,
            totalPages: result.totalPages,
        };
    }

    @ApiOperation({ summary: "Récupère les reviews d'un utilisiateur précis" })
    @ApiResponse({ status: 200, description: "Récupère les reviews d'un utilisiateur précis", type: Promise<ReviewPageResponseDto> })
    @UseGuards(SessionAuthGuard)
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
            items: result.items.map(review => mapReviewToResponseDto(review)),
            page: result.page,
            limit: result.limit,
            total: result.totalItems,
            totalPages: result.totalPages,
        };
 
    }

    @ApiOperation({ summary: "Récupère ula moyenne de la note du produit" })
    @ApiResponse({ status: 200, description: "Récupère un produit par son ID", type: Promise<AverageRatingResponseDto> })
    @Get('product/:productId/average')
    async getAverageRating(@Param('productId') productId: string): Promise<AverageRatingResponseDto> {
            return await this.getAverageRatingUseCase.execute(parseInt(productId));
    }
}
