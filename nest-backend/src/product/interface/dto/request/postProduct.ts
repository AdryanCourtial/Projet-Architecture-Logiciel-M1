import { IsNumber, IsOptional } from "class-validator";

export class GetProductQuery {

    @IsNumber()
    @IsOptional()
    id?: number;
    
}