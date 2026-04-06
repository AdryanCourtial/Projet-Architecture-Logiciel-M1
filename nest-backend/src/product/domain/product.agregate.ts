import { Review } from "src/review/domain/review.agregate";
import { Money } from "./value-objects/money.value-object";

interface CreateProductProps {
    name: string;
    description: string;
    price: Money;
    stock: number | null;
}

interface ReconstituteProductProps {
    id: number;
    name: string;
    description: string;
    stock: number;
    price: Money;
    reviews?: Review[];
}

export class Product {
    private constructor(
        private readonly id: number | null,
        private readonly name: string,
        private readonly description: string,
        private readonly price: Money,
        private readonly stock: number | null,
        private readonly reviews: Review[] = []
    ) {}

    static create({
        name,
        description,
        price,
        stock,
    }: CreateProductProps): Product {
        return new Product(
            null,
            this.normalizeName(name),
            description,
            price,
            stock
        );
    }

    static reconstitute({
        id,
        name,
        description,
        price,
        stock,
        reviews
    }: ReconstituteProductProps): Product {
        return new Product(
            id,
            this.normalizeName(name),
            description,
            price,
            stock,
            reviews
        );
    }

    static normalizeName(name: string): string {
        return name.trim().toLowerCase();
    }

    getId(): number | null {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getDescription(): string {
        return this.description;
    }

    getPrice(): Money {
        return this.price;
    }

    getStock(): number | null {
        return this.stock;
    }

    getReviews(): Review[] {
        return this.reviews;
    }
}