import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateAddressRequestDTO {

    @ApiProperty()
    @IsString()
    street!: string;

    @ApiProperty()
    @IsString()
    city!: string;

    @ApiProperty()
    @IsString()
    postalCode!: string;

    @ApiProperty()
    @IsString()
    country!: string;
}

export class AddressResponseDTO {
    id!: number;
    street!: string;
    city!: string;
    postalCode!: string;
    country!: string;
    createdAt!: Date;
    fullAddress!: string;
}
