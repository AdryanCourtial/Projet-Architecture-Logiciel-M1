export enum CurrencyCode {
    USD = "USD",
    EUR = "EUR",
}

export class Currency {
    private constructor(
        private readonly code: CurrencyCode
    ) {}

    static create(code: CurrencyCode): Currency {
        return new Currency(code);
    }

    getCode(): CurrencyCode {
        return this.code;
    }
}