import { axiosClient } from "../shared/api/axiosClient";
import type {
  CreateReviewPayload,
  ProductReviewAverage,
  ReviewListResponse,
  ReviewItem,
} from "./review.types";

export const createProductReview = async (
  productId: number,
  payload: CreateReviewPayload,
): Promise<ReviewItem> => {
  const response = await axiosClient.post<ReviewItem>(
    `/reviews/product/${productId}`,
    payload,
  );
  return response.data;
};

export const getProductReviews = async (
  productId: number,
  page: number = 1,
  limit: number = 10,
): Promise<ReviewListResponse> => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });

  const response = await axiosClient.get<ReviewListResponse>(
    `/reviews/product/${productId}?${params.toString()}`,
  );
  return response.data;
};

export const getUserReviews = async (
  userId: number,
  page: number = 1,
  limit: number = 10,
): Promise<ReviewListResponse> => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });

  const response = await axiosClient.get<ReviewListResponse>(
    `/reviews/user/${userId}?${params.toString()}`,
  );
  return response.data;
};

export const getProductReviewAverage = async (
  productId: number,
): Promise<ProductReviewAverage> => {
  const response = await axiosClient.get<ProductReviewAverage>(
    `/reviews/product/${productId}/average`,
  );
  return response.data;
};
