import { Review } from "src/review/domain/review.agregate";
import { Money } from "./value-objects/money.value-object";
import { Category } from "./category.entity";

interface CreateProductProps {
    name: string;
    description: string;
    price: Money;
    stock: number | null;
    category: Category;
}

interface ReconstituteProductProps {
    id: number;
    name: string;
    description: string;
    stock: number;
    price: Money;
    category: Category;
    reviews?: Review[];
}

export class Product {
    private constructor(
        private readonly id: number | null,
        private readonly name: string,
        private readonly description: string,
        private readonly price: Money,
        private readonly stock: number | null,
        private readonly category: Category,
        private readonly reviews: Review[] = []
    ) {}

    static create({
        name,
        description,
        price,
        stock,
        category
    }: CreateProductProps): Product {
        return new Product(
            null,
            this.normalizeName(name),
            description,
            price,
            stock,
            category,
        );
    }

    static reconstitute({
        id,
        name,
        description,
        price,
        stock,
        reviews,
        category
    }: ReconstituteProductProps): Product {
        return new Product(
            id,
            this.normalizeName(name),
            description,
            price,
            stock,
            category,
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

    getCategory(): Category {
        return this.category;
    }
}