import productData from "./products.json";

export const categories = [
  "Boards",
  "Shoes",
  "Apparel",
  "Accessories",
] as const;

export type Category = (typeof categories)[number];
export type BadgeType = "NEW" | "SOLD OUT";

export type Product = {
  id: number;
  name: string;
  category: Category;
  price: number;
  inStock: boolean;
  popular: boolean;
  description: string;
  images: string[];
  badge?: BadgeType;
};

export const products = productData as Product[];

export const popularProducts = products.filter((product) => product.popular);

export const getProductById = (id: number) =>
  products.find((product) => product.id === id);
