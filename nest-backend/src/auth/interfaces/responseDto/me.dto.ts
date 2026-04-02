import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { Phone } from "src/compte/domain/value-object/phone.value-object";
import { Roles } from "src/compte/domain/value-object/role.value-object";

export class ResponseMeDto {

    @ApiProperty()
    name!: string;

    @ApiProperty()
    firstName!: string;

    @ApiProperty()
    email!: string;

    @ApiProperty({ enum: Roles })
    role!: Roles;

    @ApiProperty({ required: false })
    phone?: string;

}