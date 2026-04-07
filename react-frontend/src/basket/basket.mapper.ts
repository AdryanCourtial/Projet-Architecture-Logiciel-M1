import type { Basket, BasketApi, BasketLine, BasketLineApi } from "./basket.types";

const centsToEuro = (value: number): number => {
    return Number((value / 100).toFixed(2));
};

const mapLineFromApi = (line: BasketLineApi): BasketLine => {
    return {
        ...line,
        pricePerUnit: centsToEuro(line.pricePerUnit),
        totalPrice: centsToEuro(line.totalPrice),
    };
};

export const mapBasketFromApi = (basket: BasketApi): Basket => {
    return {
        ...basket,
        lines: basket.lines.map(mapLineFromApi),
        totalPrice: centsToEuro(basket.totalPrice),
    };
};
