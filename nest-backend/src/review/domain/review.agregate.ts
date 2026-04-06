import { Rating } from './value-objects/rating.value-object';
import { Comment } from './value-objects/comment.value-object';

interface CreateReviewProps {
    userId: number;
    productId: number;
    rating: number;
    title: string;
    comment: string;
}

interface ReconstituteReviewProps {
    id: number;
    userId: number;
    productId: number;
    rating: number;
    title: string;
    comment: string;
}

export class Review {
    private constructor(
        private readonly id: number | null,
        private readonly userId: number,
        private readonly productId: number,
        private readonly rating: Rating,
        private readonly commentValue: Comment,
        private readonly createdAt: Date = new Date(),
    ) {}

    static create({
        userId,
        productId,
        rating,
        title,
        comment,
    }: CreateReviewProps): Review {
        if (!userId || userId <= 0) {
            throw new Error('Invalid user ID');
        }

        if (!productId || productId <= 0) {
            throw new Error('Invalid product ID');
        }

        return new Review(
            null,
            userId,
            productId,
            Rating.create(rating),
            Comment.create(title, comment),
        );
    }

    static reconstitute({
        id,
        userId,
        productId,
        rating,
        title,
        comment,
    }: ReconstituteReviewProps): Review {
        return new Review(
            id,
            userId,
            productId,
            Rating.create(rating),
            Comment.create(title, comment),
        );
    }

    getId(): number | null {
        return this.id;
    }

    getUserId(): number {
        return this.userId;
    }

    getProductId(): number {
        return this.productId;
    }

    getRating(): Rating {
        return this.rating;
    }

    getComment(): Comment {
        return this.commentValue;
    }

    getCreatedAt(): Date {
        return this.createdAt;
    }

    isPositive(): boolean {
        return this.rating.getValue() >= 4;
    }

    isNegative(): boolean {
        return this.rating.getValue() <= 2;
    }

    isNeutral(): boolean {
        return this.rating.getValue() === 3;
    }
}
