import { ApiProperty } from "@nestjs/swagger";

export class GetAllProductsResponse {
    
    @ApiProperty()
    id!: number;

    @ApiProperty()
    name!: string;

    @ApiProperty()
    description!: string;

    @ApiProperty()
    price!: number;

    @ApiProperty()
    stock!: number;

    @ApiProperty()
    category!: {
        id: number;
        name: string;
        description: string;
    };
}

export class GetAllProductsPaginatedResponse {

    @ApiProperty()
    data!: GetAllProductsResponse[];

    @ApiProperty()
    total!: number;

    @ApiProperty()
    page!: number;

    @ApiProperty()
    limit!: number;

    @ApiProperty()
    totalPages!: number;
}
