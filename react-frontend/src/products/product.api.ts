import { axiosClient } from "../shared/api/axiosClient";
import type {
  Product,
  ProductCreatePayload,
  ProductListResponse,
  ProductUpdatePayload,
} from "./product.types";

export const getProducts = async (
  page: number = 1,
  limit: number = 10,
  categoryId?: number,
): Promise<ProductListResponse> => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });

  if (categoryId) {
    params.append("categoryId", categoryId.toString());
  }

  const response = await axiosClient.get<ProductListResponse>(
    `/products?${params}`,
  );
  return response.data;
};

export const getProductById = async (id: number): Promise<Product> => {
  const response = await axiosClient.get<Product>(`/products/${id}`);
  return response.data;
};

export const createProduct = async (
  payload: ProductCreatePayload,
): Promise<Product> => {
  const response = await axiosClient.post<Product>("/products", payload);
  return response.data;
};

export const updateProduct = async (
  id: number,
  payload: ProductUpdatePayload,
): Promise<Product> => {
  const response = await axiosClient.patch<Product>(`/products/${id}`, payload);
  return response.data;
};

export const deleteProduct = async (id: number): Promise<void> => {
  await axiosClient.delete(`/products/${id}`);
};
