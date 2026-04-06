import { Injectable } from '@nestjs/common';
import { Address } from 'src/order/domain/address.entity';
import { AddressRepositoryInterface } from '../repository/address.repository';
import { CreateAddressDTO } from '../use-cases/createAddress/createAddress.use-case';

@Injectable()
export class AddressService {
  constructor(private addressRepository: AddressRepositoryInterface) {}

  async createAddress(dto: CreateAddressDTO): Promise<Address> {
    const address = Address.create(
      dto.accountId,
      dto.street,
      dto.city,
      dto.postalCode,
      dto.country
    );

    return await this.addressRepository.save(address);
  }

  async getAddressesByAccountId(accountId: number): Promise<Address[]> {
    return await this.addressRepository.findByAccountId(accountId);
  }

  async getAddressById(addressId: number): Promise<Address> {
    return await this.addressRepository.findById(addressId);
  }

  async deleteAddress(addressId: number): Promise<void> {
    return await this.addressRepository.delete(addressId);
  }
}
