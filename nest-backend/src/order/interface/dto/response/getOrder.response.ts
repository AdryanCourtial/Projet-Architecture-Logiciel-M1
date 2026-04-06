import { ApiProperty } from "@nestjs/swagger";

export class OrderLineResponse {

    @ApiProperty()
    id!: number;

    @ApiProperty()
    productId!: number;

    @ApiProperty()
    productName!: string;

    @ApiProperty()
    quantity!: number;

    @ApiProperty()
    priceAtPurchase!: number;

    @ApiProperty()
    totalPrice!: number;
}

export class GetOrderResponse {

    @ApiProperty()
    id!: number;

    @ApiProperty()
    accountId!: number;

    @ApiProperty()
    status!: string;

    @ApiProperty()
    lines!: OrderLineResponse[];

    @ApiProperty()
    totalPrice!: number;

    @ApiProperty()
    totalItems!: number;

    @ApiProperty()
    deliveryAddressId!: number;

    @ApiProperty()
    billingAddressId!: number;

    @ApiProperty()
    createdAt!: Date;
}
