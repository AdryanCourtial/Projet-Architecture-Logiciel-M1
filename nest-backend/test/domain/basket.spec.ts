import { Basket } from "src/basket/domain/basket.aggregate";
import { BasketLine } from "src/basket/domain/basket-line.entity";
import { Product } from "src/product/domain/product.agregate";
import { Money } from "src/product/domain/value-objects/money.value-object";
import { Category } from "src/product/domain/category.entity";
import { CurrencyCode } from "src/product/domain/value-objects/currency.value-object";

describe('Basket Aggregate', () => {

    let product1: Product;
    let product2: Product;
    let category: Category;

    beforeEach(() => {
        category = Category.create(1, 'Electronics', 'Electronic products');
        
        const price1 = Money.create(10000, CurrencyCode.EUR); // 100€
        product1 = Product.reconstitute({
            id: 1,
            name: 'laptop',
            description: 'Laptop',
            price: price1,
            stock: 50,
            category,
            reviews: []
        });

        const price2 = Money.create(5000, CurrencyCode.EUR); // 50€
        product2 = Product.reconstitute({
            id: 2,
            name: 'mouse',
            description: 'Wireless mouse',
            price: price2,
            stock: 100,
            category,
            reviews: []
        });
    });

    describe('create', () => {
        it('should create an empty basket', () => {
            const basket = Basket.create(1, 10);

            expect(basket.getId()).toBe(1);
            expect(basket.getAccountId()).toBe(10);
            expect(basket.getLines()).toEqual([]);
            expect(basket.isEmpty()).toBe(true);
        });

        it('should set correct id and accountId', () => {
            const basket = Basket.create(42, 99);

            expect(basket.getId()).toBe(42);
            expect(basket.getAccountId()).toBe(99);
        });
    });

    describe('reconstitute', () => {
        it('should reconstitute basket from persistence with lines', () => {
            const line1 = BasketLine.create(product1, 2);
            const line2 = BasketLine.create(product2, 1);

            const basket = Basket.reconstitute(1, 10, [line1, line2]);

            expect(basket.getId()).toBe(1);
            expect(basket.getAccountId()).toBe(10);
            expect(basket.getLines().length).toBe(2);
            expect(basket.isEmpty()).toBe(false);
        });

        it('should reconstitute empty basket', () => {
            const basket = Basket.reconstitute(1, 10, []);

            expect(basket.getId()).toBe(1);
            expect(basket.getLines()).toEqual([]);
            expect(basket.isEmpty()).toBe(true);
        });
    });

    describe('addLine', () => {
        it('should add a new line to empty basket', () => {
            const basket = Basket.create(1, 10);
            const line = BasketLine.create(product1, 2);

            const updatedBasket = basket.addLine(line);

            expect(updatedBasket.getLines().length).toBe(1);
            expect(updatedBasket.getLines()[0].getProduct().getId()).toBe(1);
            expect(updatedBasket.getLines()[0].getQuantity()).toBe(2);
        });

        it('should add multiple different products', () => {
            const basket = Basket.create(1, 10);
            const line1 = BasketLine.create(product1, 1);
            const line2 = BasketLine.create(product2, 3);

            let updatedBasket = basket.addLine(line1);
            updatedBasket = updatedBasket.addLine(line2);

            expect(updatedBasket.getLines().length).toBe(2);
        });

        it('should merge quantities if same product is added twice', () => {
            const basket = Basket.create(1, 10);
            const line1 = BasketLine.create(product1, 2);
            const line2 = BasketLine.create(product1, 3);

            let updatedBasket = basket.addLine(line1);
            updatedBasket = updatedBasket.addLine(line2);

            expect(updatedBasket.getLines().length).toBe(1);
            expect(updatedBasket.getLines()[0].getQuantity()).toBe(5);
        });

        it('should return new Basket instance (immutability)', () => {
            const basket = Basket.create(1, 10);
            const line = BasketLine.create(product1, 1);

            const updatedBasket = basket.addLine(line);

            expect(basket).not.toBe(updatedBasket);
            expect(basket.getLines().length).toBe(0);
            expect(updatedBasket.getLines().length).toBe(1);
        });
    });

    describe('removeLine', () => {
        it('should remove line by product id', () => {
            const basket = Basket.create(1, 10);
            const line1 = BasketLine.create(product1, 2);
            const line2 = BasketLine.create(product2, 1);

            let updatedBasket = basket.addLine(line1);
            updatedBasket = updatedBasket.addLine(line2);

            updatedBasket = updatedBasket.removeLine(1);

            expect(updatedBasket.getLines().length).toBe(1);
            expect(updatedBasket.getLines()[0].getProduct().getId()).toBe(2);
        });


        it('should return new Basket instance', () => {
            const basket = Basket.create(1, 10);
            const line = BasketLine.create(product1, 2);

            let updatedBasket = basket.addLine(line);
            const removedBasket = updatedBasket.removeLine(1);

            expect(updatedBasket).not.toBe(removedBasket);
            expect(updatedBasket.getLines().length).toBe(1);
            expect(removedBasket.getLines().length).toBe(0);
        });
    });

    describe('updateLineQuantity', () => {
        it('should update quantity of existing line', () => {
            const basket = Basket.create(1, 10);
            const line = BasketLine.create(product1, 2);

            let updatedBasket = basket.addLine(line);
            updatedBasket = updatedBasket.updateLineQuantity(1, 5);

            expect(updatedBasket.getLines()[0].getQuantity()).toBe(5);
        });

        it('should throw error if product not in basket', () => {
            const basket = Basket.create(1, 10);

            expect(() => basket.updateLineQuantity(999, 5)).toThrow();
        });

        it('should throw error if quantity is <= 0', () => {
            const basket = Basket.create(1, 10);
            const line = BasketLine.create(product1, 2);

            const updatedBasket = basket.addLine(line);

            expect(() => updatedBasket.updateLineQuantity(1, 0)).toThrow();
        });

        it('should return new Basket instance', () => {
            const basket = Basket.create(1, 10);
            const line = BasketLine.create(product1, 2);

            let updatedBasket = basket.addLine(line);
            const newBasket = updatedBasket.updateLineQuantity(1, 5);

            expect(updatedBasket).not.toBe(newBasket);
            expect(updatedBasket.getLines()[0].getQuantity()).toBe(2);
            expect(newBasket.getLines()[0].getQuantity()).toBe(5);
        });
    });

    describe('clear', () => {
        it('should remove all lines from basket', () => {
            const basket = Basket.create(1, 10);
            const line1 = BasketLine.create(product1, 2);
            const line2 = BasketLine.create(product2, 1);

            let updatedBasket = basket.addLine(line1);
            updatedBasket = updatedBasket.addLine(line2);
            updatedBasket = updatedBasket.clear();

            expect(updatedBasket.getLines()).toEqual([]);
            expect(updatedBasket.isEmpty()).toBe(true);
        });

        it('should return new Basket instance', () => {
            const basket = Basket.create(1, 10);
            const line = BasketLine.create(product1, 2);

            let updatedBasket = basket.addLine(line);
            const clearedBasket = updatedBasket.clear();

            expect(updatedBasket).not.toBe(clearedBasket);
            expect(updatedBasket.getLines().length).toBe(1);
            expect(clearedBasket.getLines().length).toBe(0);
        });
    });

    describe('getTotalPrice', () => {
        it('should calculate total price for single line', () => {
            const basket = Basket.create(1, 10);
            const line = BasketLine.create(product1, 2); // 100€ * 2 = 200€

            const updatedBasket = basket.addLine(line);

            expect(updatedBasket.getTotalPrice()).toBe(20000); // in cents
        });

        it('should calculate total price for multiple lines', () => {
            const basket = Basket.create(1, 10);
            const line1 = BasketLine.create(product1, 2); // 100€ * 2 = 200€
            const line2 = BasketLine.create(product2, 1); // 50€ * 1 = 50€

            let updatedBasket = basket.addLine(line1);
            updatedBasket = updatedBasket.addLine(line2);

            expect(updatedBasket.getTotalPrice()).toBe(25000); // 250€ in cents
        });

        it('should return 0 for empty basket', () => {
            const basket = Basket.create(1, 10);

            expect(basket.getTotalPrice()).toBe(0);
        });
    });

    describe('getTotalItems', () => {
        it('should calculate total items for single line', () => {
            const basket = Basket.create(1, 10);
            const line = BasketLine.create(product1, 5);

            const updatedBasket = basket.addLine(line);

            expect(updatedBasket.getTotalItems()).toBe(5);
        });

        it('should calculate total items for multiple lines', () => {
            const basket = Basket.create(1, 10);
            const line1 = BasketLine.create(product1, 2);
            const line2 = BasketLine.create(product2, 3);

            let updatedBasket = basket.addLine(line1);
            updatedBasket = updatedBasket.addLine(line2);

            expect(updatedBasket.getTotalItems()).toBe(5);
        });

        it('should return 0 for empty basket', () => {
            const basket = Basket.create(1, 10);

            expect(basket.getTotalItems()).toBe(0);
        });
    });

    describe('isEmpty', () => {
        it('should return true for empty basket', () => {
            const basket = Basket.create(1, 10);

            expect(basket.isEmpty()).toBe(true);
        });

        it('should return false for basket with items', () => {
            const basket = Basket.create(1, 10);
            const line = BasketLine.create(product1, 1);

            const updatedBasket = basket.addLine(line);

            expect(updatedBasket.isEmpty()).toBe(false);
        });

        it('should return true for cleared basket', () => {
            const basket = Basket.create(1, 10);
            const line = BasketLine.create(product1, 1);

            let updatedBasket = basket.addLine(line);
            updatedBasket = updatedBasket.clear();

            expect(updatedBasket.isEmpty()).toBe(true);
        });
    });

    describe('Basket immutability', () => {
        it('should not modify original basket when adding line', () => {
            const basket = Basket.create(1, 10);
            const line = BasketLine.create(product1, 1);

            basket.addLine(line);

            expect(basket.getLines().length).toBe(0);
        });

        it('should not modify original basket when clearing', () => {
            const basket = Basket.create(1, 10);
            const line = BasketLine.create(product1, 1);

            const updatedBasket = basket.addLine(line);
            updatedBasket.clear();

            expect(updatedBasket.getLines().length).toBe(1);
        });
    });
});
