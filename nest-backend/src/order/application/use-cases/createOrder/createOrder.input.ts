import { CreateAddressRequestDTO } from "src/order/interface/dto/address.dto";

export interface CreateOrderInput {
    accountId: number;
    deliveryAddress: CreateAddressRequestDTO;
    billingAddress: CreateAddressRequestDTO;
}
