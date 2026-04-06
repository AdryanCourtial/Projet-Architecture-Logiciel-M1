import { ApiProperty } from "@nestjs/swagger";

export class CreateProductResponse {
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
}
