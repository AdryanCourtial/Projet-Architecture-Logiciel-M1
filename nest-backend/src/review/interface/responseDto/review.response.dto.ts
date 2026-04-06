export class ReviewResponseDto {
    id!: number;
    userId!: number;
    productId!: number;
    rating!: number;
    title!: string;
    comment!: string;
}

export class ReviewPageResponseDto {
    items!: ReviewResponseDto[];
    page!: number;
    limit!: number;
    total!: number;
    totalPages!: number;
}

export class AverageRatingResponseDto {
    average!: number | null;
    count!: number;
    formattedAverage!: string;
}
