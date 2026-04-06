import { Injectable } from '@nestjs/common';
import { Review } from '../../domain/review.agregate';
import { PrismaService } from 'src/shared/infrastructure/database/prisma.service';
import { IReviewRepository } from 'src/review/application/repository/review.repository';
import { Page, PaginationParams } from 'src/shared/application/type/PaginationParams';

@Injectable()
export class PrismaReviewRepository implements IReviewRepository {
    constructor(private readonly prisma: PrismaService) {}

    async save(review: Review): Promise<Review> {
        const data = {
            userId: review.getUserId(),
            productId: review.getProductId(),
            rating: review.getRating().getValue(),
            title: review.getComment().getTitle(),
            comment: review.getComment().getContent(),
        };

        const saved = await this.prisma.review.create({
            data,
        });

        return Review.reconstitute({
            id: saved.id,
            userId: saved.userId,
            productId: saved.productId,
            rating: saved.rating,
            title: saved.title,
            comment: saved.comment,
        });
    }

    async findById(id: number): Promise<Review | null> {
        const review = await this.prisma.review.findUnique({
            where: { id },
        });

        if (!review) {
            return null;
        }

        return Review.reconstitute({
            id: review.id,
            userId: review.userId,
            productId: review.productId,
            rating: review.rating,
            title: review.title,
            comment: review.comment,
        });
    }

    async findByProductId(productId: number, params: PaginationParams): Promise<Page<Review>> {
        const [reviews, total] = await Promise.all([
            this.prisma.review.findMany({
                where: { productId },
                skip: (params.page - 1) * params.limit,
                take: params.limit,
                orderBy: { id: 'desc' },
            }),
            this.prisma.review.count({
                where: { productId },
            }),
        ]);

        const reviewDomain = reviews.map(review =>
            Review.reconstitute({
                id: review.id,
                userId: review.userId,
                productId: review.productId,
                rating: review.rating,
                title: review.title,
                comment: review.comment,
            })
        );

        return {
            items: reviewDomain,
            page: params.page,
            limit: params.limit,
            totalItems: total,
            totalPages: Math.ceil(total / params.limit),
        }
    }

    async findByUserId(userId: number, params: PaginationParams): Promise<Page<Review>> {
        const [reviews, total] = await Promise.all([
            this.prisma.review.findMany({
                where: { userId },
                skip: (params.page - 1) * params.limit,
                take: params.limit,
                orderBy: { id: 'desc' },
            }),
            this.prisma.review.count({
                where: { userId },
            }),
        ]);

        const reviewDomain = reviews.map(review =>
            Review.reconstitute({
                id: review.id,
                userId: review.userId,
                productId: review.productId,
                rating: review.rating,
                title: review.title,
                comment: review.comment,
            })
        );

        return {
            items: reviewDomain,
            page: params.page,
            limit: params.limit,
            totalItems: total,
            totalPages: Math.ceil(total / params.limit),
        }
    }

    async findAverageRatingByProductId(productId: number): Promise<number | null> {
        const result = await this.prisma.review.aggregate({
            where: { productId },
            _avg: {
                rating: true,
            },
        });

        return result._avg.rating;
    }

    async countByProductId(productId: number): Promise<number> {
        return this.prisma.review.count({
            where: { productId },
        });
    }

    async countByUserId(userId: number): Promise<number> {
        return this.prisma.review.count({
            where: { userId },
        });
    }

    async delete(id: number): Promise<void> {
        await this.prisma.review.delete({
            where: { id },
        });
    }

    async hasUserReviewedProduct(userId: number, productId: number): Promise<boolean> {
        const review = await this.prisma.review.findFirst({
            where: {
                userId,
                productId,
            },
        });

        return !!review;
    }
}
