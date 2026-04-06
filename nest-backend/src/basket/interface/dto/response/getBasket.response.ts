export class BasketLineResponse {

    id!: number;
    productId!: number;
    productName!: string;
    quantity!: number;
    pricePerUnit!: number;
    totalPrice!: number;
}

export class GetBasketResponse {
    id!: number;
    accountId!: number;
    lines!: BasketLineResponse[];
    totalPrice!: number;
    totalItems!: number;
    isEmpty!: boolean;
}
