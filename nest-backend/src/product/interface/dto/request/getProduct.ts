import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional } from "class-validator";

export class GetProductQuery {

    @ApiProperty({
        description: "The category id of the product to get",
        required: false,
        example: 1
    })
    @IsNumber()
    @IsOptional()
    id?: number;
    
}