import { Injectable, NotFoundException } from '@nestjs/common';
import { IReviewRepository } from '../repository/review.repository';
import { Review } from '../../domain/review.agregate';
import { Page, PaginationParams } from 'src/shared/application/type/PaginationParams';

@Injectable()
export class GetReviewsByUserUseCase {
    constructor(private readonly repository: IReviewRepository) {}

    async execute(userId: number, pagination: PaginationParams): Promise<Page<Review>> {
        if (!userId || userId <= 0) {
            throw new NotFoundException('Invalid user ID');
        }

        return this.repository.findByUserId(userId, pagination);
    }
}
