import { Address } from 'src/order/domain/address.entity';
import { AddressResponseDTO } from '../dto/address.dto';

export class AddressMapper {
  static toPersistence(address: Address) {
    return {
      street: address.getStreet(),
      city: address.getCity(),
      postalCode: address.getPostalCode(),
      country: address.getCountry(),
    };
  }

  static toResponse(address: Address): AddressResponseDTO {
    return {
      id: address.getId()!,
      street: address.getStreet(),
      city: address.getCity(),
      postalCode: address.getPostalCode(),
      country: address.getCountry(),
      createdAt: address.getCreatedAt(),
      fullAddress: address.getFullAddress(),
    };
  }

  static toResponseList(addresses: Address[]): AddressResponseDTO[] {
    return addresses.map((address) => this.toResponse(address));
  }
}
