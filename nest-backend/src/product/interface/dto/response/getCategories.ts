import { ApiProperty } from "@nestjs/swagger"

export class ResponseGetCategories {
    @ApiProperty()
    id!: number

    @ApiProperty()
    name!: string

    @ApiProperty()
    description!: string
}