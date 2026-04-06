import { Injectable } from '@nestjs/common';
import { AddressRepositoryInterface } from '../../repository/address.repository';

@Injectable()
export class DeleteAddressUseCase {
  constructor(private addressRepository: AddressRepositoryInterface) {}

  async execute(addressId: number): Promise<void> {
    return await this.addressRepository.delete(addressId);
  }
}
