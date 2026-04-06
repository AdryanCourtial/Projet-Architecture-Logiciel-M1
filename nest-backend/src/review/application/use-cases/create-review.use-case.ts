import { Injectable, BadRequestException } from '@nestjs/common';
import { IReviewRepository } from '../repository/review.repository';
import { Review } from '../../domain/review.agregate';

interface CreateReviewInput {
    userId: number;
    productId: number;
    rating: number;
    title: string;
    comment: string;
}

@Injectable()
export class CreateReviewUseCase {
    constructor(private readonly repository: IReviewRepository) {}

    async execute(input: CreateReviewInput): Promise<Review> {
        // Vérifier que l'utilisateur n'a pas déjà review ce produit
        const hasAlreadyReviewed = await this.repository.hasUserReviewedProduct(
            input.userId,
            input.productId
        );

        if (hasAlreadyReviewed) {
            throw new BadRequestException(
                'User has already reviewed this product'
            );
        }

        // Créer la review avec les règles métier du domaine
        const review = Review.create({
            userId: input.userId,
            productId: input.productId,
            rating: input.rating,
            title: input.title,
            comment: input.comment,
        });

        // Sauvegarder la review
        return this.repository.save(review);
    }
}
