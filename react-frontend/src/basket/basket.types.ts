export type BasketLineApi = {
    id: number | null;
    productId: number;
    productName: string;
    quantity: number;
    pricePerUnit: number;
    totalPrice: number;
};

export type BasketApi = {
    id: number;
    accountId: number;
    lines: BasketLineApi[];
    totalPrice: number;
    totalItems: number;
    isEmpty: boolean;
};

export type BasketLine = {
    id: number | null;
    productId: number;
    productName: string;
    quantity: number;
    pricePerUnit: number;
    totalPrice: number;
};

export type Basket = {
    id: number;
    accountId: number;
    lines: BasketLine[];
    totalPrice: number;
    totalItems: number;
    isEmpty: boolean;
};

export type BasketQuantityPayload = {
    productId: number;
    quantity: number;
};
