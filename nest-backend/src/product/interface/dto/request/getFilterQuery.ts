import { ApiProperty } from "@nestjs/swagger";

export class GetFilterQuery {
    
    @ApiProperty()
    page?: string;

    @ApiProperty()
    limit?: string;

    @ApiProperty()
    categoryId?: string;
}