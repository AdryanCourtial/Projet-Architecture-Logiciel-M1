import { Injectable } from '@nestjs/common';
import { Address } from '../../../domain/address.entity';
import { AddressRepositoryInterface } from '../../repository/address.repository';

export interface CreateAddressDTO {
  accountId: number;
  street: string;
  city: string;
  postalCode: string;
  country: string;
}

@Injectable()
export class CreateAddressUseCase {
  constructor(private addressRepository: AddressRepositoryInterface) {}

  async execute(dto: CreateAddressDTO): Promise<Address> {
    const address = Address.create(
      dto.accountId,
      dto.street,
      dto.city,
      dto.postalCode,
      dto.country
    );

    return await this.addressRepository.save(address);
  }
}
