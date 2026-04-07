export type Category = {
  id: number;
  name: string;
  description: string;
};

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image?: string;
  category?: Category;
  reviews?: Review[];
};

export type ProductCreatePayload = {
  name: string;
  description: string;
  price: number;
  stock: number;
  categoryId: number;
  image?: string;
};

export type ProductUpdatePayload = Partial<ProductCreatePayload>;

export type ProductListResponse = {
  data: Product[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type Review = {
  id: number;
  rating: number;
  comment: string;
  author: string;
  createdAt: string;
};
