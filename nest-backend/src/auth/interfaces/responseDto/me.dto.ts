import { ApiProperty } from "@nestjs/swagger";
import { Roles, RolesEnum } from "src/compte/domain/value-object/role.value-object";

export class ResponseMeDto {

    @ApiProperty()
    name!: string;

    @ApiProperty()
    firstName!: string;

    @ApiProperty()
    email!: string;

    @ApiProperty({ enum: RolesEnum })
    role!: Roles;

    @ApiProperty({ required: false })
    phone?: string;

}