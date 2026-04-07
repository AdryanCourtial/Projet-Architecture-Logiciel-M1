import { Product } from "src/product/domain/product.agregate";
import { Money } from "src/product/domain/value-objects/money.value-object";
import { Category } from "src/product/domain/category.entity";
import { CurrencyCode } from "src/product/domain/value-objects/currency.value-object";

describe('Product Aggregate', () => {

    let category: Category;

    beforeEach(() => {
        category = Category.create(1, 'Electronics', 'Electronic products');
    });

    describe('create', () => {
        it('should create a new product with valid data', () => {
            const price = Money.create(9999, CurrencyCode.EUR);
            
            const product = Product.create({
                name: 'Laptop',
                description: 'High performance laptop',
                price,
                stock: 50,
                category
            });

            expect(product).toBeDefined();
            expect(product.getName()).toBe('laptop');
            expect(product.getDescription()).toBe('High performance laptop');
            expect(product.getPrice().toDecimal()).toBe(99.99);
            expect(product.getStock()).toBe(50);
        });

        it('should normalize product name to lowercase and trim', () => {
            const price = Money.create(5000, CurrencyCode.EUR);
            
            const product = Product.create({
                name: '  SMARTPHONE  ',
                description: 'Mobile device',
                price,
                stock: 100,
                category
            });

            expect(product.getName()).toBe('smartphone');
        });

        it('should set id to null for new product', () => {
            const price = Money.create(5000, CurrencyCode.EUR);
            
            const product = Product.create({
                name: 'Headphones',
                description: 'Wireless headphones',
                price,
                stock: 200,
                category
            });

            expect(product.getId()).toBeNull();
        });

        it('should create product with zero stock', () => {
            const price = Money.create(15000, CurrencyCode.EUR);
            
            const product = Product.create({
                name: 'Tablet',
                description: 'Tablet device',
                price,
                stock: 0,
                category
            });

            expect(product.getStock()).toBe(0);
        });

        it('should create product with null stock', () => {
            const price = Money.create(15000, CurrencyCode.EUR);
            
            const product = Product.create({
                name: 'Tablet',
                description: 'Tablet device',
                price,
                stock: null,
                category
            });

            expect(product.getStock()).toBeNull();
        });

        it('should initialize empty reviews array', () => {
            const price = Money.create(5000, CurrencyCode.EUR);
            
            const product = Product.create({
                name: 'Monitor',
                description: '4K Monitor',
                price,
                stock: 30,
                category
            });

            expect(product.getReviews()).toEqual([]);
        });

    });

    describe('reconstitute', () => {
        it('should reconstitute product from persistence', () => {
            const price = Money.create(9999, CurrencyCode.EUR);
            
            const product = Product.reconstitute({
                id: 1,
                name: 'laptop',
                description: 'High performance laptop',
                price,
                stock: 50,
                category,
                reviews: []
            });

            expect(product.getId()).toBe(1);
            expect(product.getName()).toBe('laptop');
            expect(product.getStock()).toBe(50);
        });

        it('should reconstitute product with existing id', () => {
            const price = Money.create(5000, CurrencyCode.EUR);
            
            const product = Product.reconstitute({
                id: 42,
                name: 'smartphone',
                description: 'Mobile device',
                price,
                stock: 100,
                category,
                reviews: []
            });

            expect(product.getId()).toBe(42);
        });
    });

    describe('getters', () => {
        let product: Product;

        beforeEach(() => {
            const price = Money.create(9999, CurrencyCode.EUR);
            product = Product.create({
                name: 'Laptop',
                description: 'High performance laptop',
                price,
                stock: 50,
                category
            });
        });

        it('should get name', () => {
            expect(product.getName()).toBe('laptop');
        });

        it('should get description', () => {
            expect(product.getDescription()).toBe('High performance laptop');
        });

        it('should get price', () => {
            const price = product.getPrice();
            expect(price.toDecimal()).toBe(99.99);
        });

        it('should get stock', () => {
            expect(product.getStock()).toBe(50);
        });


        it('should get reviews', () => {
            expect(product.getReviews());
        });
    });

    describe('normalizeName', () => {
        it('should normalize product name correctly', () => {
            const normalized = Product['normalizeName']('  LAPTOP COMPUTER  ');
            expect(normalized).toBe('laptop computer');
        });

        it('should handle already normalized names', () => {
            const normalized = Product['normalizeName']('smartphone');
            expect(normalized).toBe('smartphone');
        });
    });
});
