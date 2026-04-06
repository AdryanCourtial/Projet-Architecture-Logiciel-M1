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

export const MOCK_CATEGORIES: Category[] = [
  {
    id: 1,
    name: "Decks",
    description:
      "Planches de skateboard de haute qualité pour tous les niveaux",
  },
  {
    id: 2,
    name: "Wheels",
    description: "Roues de skateboard de différentes tailles",
  },
  {
    id: 3,
    name: "Trucks",
    description: "Essieux de skateboard robustes et durables",
  },
  {
    id: 4,
    name: "Bearings",
    description: "Roulements pour roues de skateboard",
  },
  {
    id: 5,
    name: "Grip Tape",
    description: "Ruban adhésif antidérapant pour planches",
  },
];
