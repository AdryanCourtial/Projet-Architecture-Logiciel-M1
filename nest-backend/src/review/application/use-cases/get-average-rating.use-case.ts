import { Injectable, NotFoundException } from '@nestjs/common';
import { IReviewRepository } from '../repository/review.repository';

@Injectable()
export class GetAverageRatingUseCase {
    constructor(private readonly repository: IReviewRepository) {}

    async execute(productId: number): Promise<{
        average: number | null;
        count: number;
        formattedAverage: string;
    }> {
        if (!productId || productId <= 0) {
            throw new NotFoundException('Invalid product ID');
        }

        const [average, count] = await Promise.all([
            this.repository.findAverageRatingByProductId(productId),
            this.repository.countByProductId(productId),
        ]);

        return {
            average,
            count,
            formattedAverage: average ? average.toFixed(1) : 'No ratings',
        };
    }
}
