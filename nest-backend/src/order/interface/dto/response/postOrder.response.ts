export class PostOrderResponseDto {
    id!: number
    accountId!: number;
    status!: string;
    totalPrice!: number;
    totalItems!: number;
    deliveryAddress!: {
        id: number;
        street: string;
        city: string;
        postalCode: string;
        country: string;
    }
    billingAddress!: {
        id: number;
        street: string;
        city: string;
        postalCode: string;
        country: string;
    }
    createdAt!: Date;
}