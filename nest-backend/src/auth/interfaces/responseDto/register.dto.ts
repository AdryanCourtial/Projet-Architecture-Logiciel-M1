import { ApiProperty } from "@nestjs/swagger";
import { Phone } from "src/compte/domain/value-object/phone.value-object";
import { Roles } from "src/compte/domain/value-object/role.value-object";

export class ResponseRegisterDto {

    @ApiProperty()
    firstname!: string;

    @ApiProperty()
    name!: string;

    @ApiProperty()
    email!: string;

    @ApiProperty({ enum: Roles })
    role!: Roles;

    @ApiProperty({ required: false })
    phone: Phone | undefined;
}