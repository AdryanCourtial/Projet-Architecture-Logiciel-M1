export interface ResponseGetProduct {
    id: number
    name: string;
    description: string;
    price: number;
    stock: number;
    reviews: {
        id: number;
        rating: number;
        comment: string;
    }[];
}