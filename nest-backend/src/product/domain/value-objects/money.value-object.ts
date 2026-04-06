import { Currency, CurrencyCode } from "./currency.value-object";

export class Money {
    private constructor(
        private readonly amount: number,
        private readonly currency: Currency = Currency.create(CurrencyCode.EUR)
    ) {}

    // Gestion des montant en centimes pour éviter les problèmes d'arrondi et flemme de gérer les floats en JS
    static create(amount: number, currency: CurrencyCode = CurrencyCode.EUR): Money {
        if (amount < 0) {
            throw new Error("Amount must be positive");
        }

        return new Money(amount, Currency.create(currency));
    }

    equal(money: Money): boolean {
        return money.getAmount() === this.getAmount() && money.getCurrency().getCode() === this.getCurrency().getCode();
    }

    getAmount(): number {
        return this.amount;
    }

    toDecimal(): number {
        return this.amount / 100;
    }

    getCurrency(): Currency {
        return this.currency;
    }
}