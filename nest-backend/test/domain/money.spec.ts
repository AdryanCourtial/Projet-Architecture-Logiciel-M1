import { Money } from "src/product/domain/value-objects/money.value-object";
import { CurrencyCode } from "src/product/domain/value-objects/currency.value-object";

describe('Money Value Object', () => {

    describe('create', () => {
        it('should create money with default EUR currency', () => {
            const money = Money.create(10000);

            expect(money.getAmount()).toBe(10000);
            expect(money.getCurrency().getCode()).toBe(CurrencyCode.EUR);
        });

        it('should create money with specified currency', () => {
            const money = Money.create(5000, CurrencyCode.USD);

            expect(money.getAmount()).toBe(5000);
            expect(money.getCurrency().getCode()).toBe(CurrencyCode.USD);
        });

        it('should create money with zero amount', () => {
            const money = Money.create(0);

            expect(money.getAmount()).toBe(0);
        });

        it('should throw error for negative amount', () => {
            expect(() => Money.create(-1000)).toThrow();
        });

        it('should throw error for negative large amount', () => {
            expect(() => Money.create(-999999)).toThrow();
        });
    });

    describe('getAmount', () => {
        it('should return amount in cents', () => {
            const money = Money.create(9999);

            expect(money.getAmount()).toBe(9999);
        });

        it('should return zero amount', () => {
            const money = Money.create(0);

            expect(money.getAmount()).toBe(0);
        });
    });

    describe('toDecimal', () => {
        it('should convert cents to decimal', () => {
            const money = Money.create(10000); // 100.00€

            expect(money.toDecimal()).toBe(100);
        });

        it('should handle decimals correctly', () => {
            const money = Money.create(9999); // 99.99€

            expect(money.toDecimal()).toBe(99.99);
        });

        it('should convert zero to decimal', () => {
            const money = Money.create(0);

            expect(money.toDecimal()).toBe(0);
        });

        it('should handle single cent', () => {
            const money = Money.create(1);

            expect(money.toDecimal()).toBe(0.01);
        });

        it('should convert 50 cents', () => {
            const money = Money.create(50);

            expect(money.toDecimal()).toBe(0.5);
        });
    });

    describe('getCurrency', () => {
        it('should return EUR currency', () => {
            const money = Money.create(10000);

            expect(money.getCurrency().getCode()).toBe(CurrencyCode.EUR);
        });

        it('should return USD currency', () => {
            const money = Money.create(10000, CurrencyCode.USD);

            expect(money.getCurrency().getCode()).toBe(CurrencyCode.USD);
        });
    });

    describe('equal', () => {
        it('should return true for equal money values', () => {
            const money1 = Money.create(10000, CurrencyCode.EUR);
            const money2 = Money.create(10000, CurrencyCode.EUR);

            expect(money1.equal(money2)).toBe(true);
        });

        it('should return false for different amounts', () => {
            const money1 = Money.create(10000, CurrencyCode.EUR);
            const money2 = Money.create(20000, CurrencyCode.EUR);

            expect(money1.equal(money2)).toBe(false);
        });

        it('should return false for different currencies', () => {
            const money1 = Money.create(10000, CurrencyCode.EUR);
            const money2 = Money.create(10000, CurrencyCode.USD);

            expect(money1.equal(money2)).toBe(false);
        });

        it('should return true for zero amounts with same currency', () => {
            const money1 = Money.create(0, CurrencyCode.EUR);
            const money2 = Money.create(0, CurrencyCode.EUR);

            expect(money1.equal(money2)).toBe(true);
        });

        it('should return false for zero amounts with different currencies', () => {
            const money1 = Money.create(0, CurrencyCode.EUR);
            const money2 = Money.create(0, CurrencyCode.USD);

            expect(money1.equal(money2)).toBe(false);
        });
    });

    describe('Practical scenarios', () => {
        it('should handle product pricing correctly', () => {
            const laptopPrice = Money.create(99999, CurrencyCode.EUR); // 999.99€
            const mousePrice = Money.create(2500, CurrencyCode.EUR); // 25.00€

            expect(laptopPrice.toDecimal()).toBe(999.99);
            expect(mousePrice.toDecimal()).toBe(25);
            expect(laptopPrice.equal(mousePrice)).toBe(false);
        });

        it('should handle cart calculation', () => {
            const item1 = Money.create(10000, CurrencyCode.EUR); // 100€
            const item2 = Money.create(5000, CurrencyCode.EUR);  // 50€
            const total = Money.create(15000, CurrencyCode.EUR); // 150€

            expect(total.toDecimal()).toBe(150);
            expect(Money.create(10000 + 5000, CurrencyCode.EUR).equal(total)).toBe(true);
        });
    });
});
