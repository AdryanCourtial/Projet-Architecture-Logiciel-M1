import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional } from "class-validator";

export class GetProductQuery {

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    id?: number;
    
}