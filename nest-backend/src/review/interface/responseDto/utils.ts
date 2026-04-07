import { Review } from "src/review/domain/review.agregate";
import { ReviewResponseDto } from "./review.response.dto";

   export const mapReviewToResponseDto = (review: Review): ReviewResponseDto => {
        return {
            id: review.getId()!,
            userId: review.getUserId(),
            productId: review.getProductId(),
            rating: review.getRating().getValue(),
            title: review.getComment().getTitle(),
            comment: review.getComment().getContent(),
        };
    }