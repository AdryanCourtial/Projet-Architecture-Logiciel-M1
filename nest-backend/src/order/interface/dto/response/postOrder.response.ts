export class PostOrderResponseDto {
    id!: number
    accountId!: number;
    status!: string;
    totalPrice!: number;
    totalItems!: number;
    deliveryAddress!: {
        street: string;
        city: string;
        postalCode: string;
        country: string;
    }
    billingAddress!: {
        street: string;
        city: string;
        postalCode: string;
        country: string;
    }
    createdAt!: Date;
}