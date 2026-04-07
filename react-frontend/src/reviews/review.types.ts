export type ReviewItem = {
  id: number;
  userId: number;
  productId: number;
  rating: number;
  title: string;
  comment: string;
};

export type ReviewListResponse = {
  items: ReviewItem[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type CreateReviewPayload = {
  rating: number;
  title: string;
  comment: string;
};

export type ProductReviewAverage = {
  average: number;
  count: number;
  formattedAverage: string;
};
