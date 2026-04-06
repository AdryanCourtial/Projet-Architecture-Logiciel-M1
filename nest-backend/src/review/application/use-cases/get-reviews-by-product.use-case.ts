import { Injectable, NotFoundException } from '@nestjs/common';
import { IReviewRepository } from '../repository/review.repository';
import { Review } from '../../domain/review.agregate';
import { Page, PaginationParams } from 'src/shared/application/type/PaginationParams';

@Injectable()
export class GetReviewsByProductUseCase {
    constructor(private readonly repository: IReviewRepository) {}

    async execute(productId: number, pagination: PaginationParams): Promise<Page<Review>> {
        if (!productId || productId <= 0) {
            throw new NotFoundException('Invalid product ID');
        }

        return this.repository.findByProductId(productId, pagination);
    }
}
