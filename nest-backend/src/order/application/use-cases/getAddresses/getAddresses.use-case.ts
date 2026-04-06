import { Injectable } from '@nestjs/common';
import { Address } from '../../../domain/address.entity';
import { AddressRepositoryInterface } from '../../repository/address.repository';

@Injectable()
export class GetAddressesUseCase {
  constructor(private addressRepository: AddressRepositoryInterface) {}

  async execute(accountId: number): Promise<Address[]> {
    return await this.addressRepository.findByAccountId(accountId);
  }

  async findById(addressId: number): Promise<Address> {
    return await this.addressRepository.findById(addressId);
  }
}
