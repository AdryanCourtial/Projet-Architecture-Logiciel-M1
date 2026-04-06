import { ApiProperty } from '@nestjs/swagger';
import { CreateAddressRequestDTO } from '../address.dto';

export class CreateOrderRequestDto {
    @ApiProperty()
    deliveryAddress!: CreateAddressRequestDTO

    @ApiProperty()
    billingAddress!: CreateAddressRequestDTO;
}
