import { Review } from 'src/review/domain/review.agregate';
import { Page, PaginationParams } from 'src/shared/application/type/PaginationParams';

export abstract class IReviewRepository {
    abstract save(review: Review): Promise<Review>;
    abstract findById(id: number): Promise<Review | null>;
    abstract findByProductId(productId: number, params: PaginationParams): Promise<Page<Review>>;
    abstract findByUserId(userId: number, params: PaginationParams): Promise<Page<Review>>;
    abstract findAverageRatingByProductId(productId: number): Promise<number | null>;
    abstract countByProductId(productId: number): Promise<number>;
    abstract countByUserId(userId: number): Promise<number>;
    abstract delete(id: number): Promise<void>;
    abstract hasUserReviewedProduct(userId: number, productId: number): Promise<boolean>;
}
