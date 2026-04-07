import { Injectable } from '@nestjs/common';
import { Address } from '../../domain/address.entity';
import { AddressRepositoryInterface } from '../../application/repository/address.repository';
import { PrismaService } from 'src/shared/infrastructure/database/prisma.service';

@Injectable()
export class PrismaAddressRepository implements AddressRepositoryInterface {
  constructor(private prismaService: PrismaService) {}

  async save(address: Address): Promise<Address> {
    try {
      const addressData = await this.prismaService.adress.create({
        data: {
          accountId: address.getAccountId(),
          street: address.getStreet(),
          city: address.getCity(),
          postalCode: address.getPostalCode(),
          country: address.getCountry(),
        },
      });

      return this.mapToAddress(addressData);
    } catch (error: any) {
        console.log('Error saving address:', error);
      throw new Error('Failed to save address');
    }
  }

  async findById(id: number): Promise<Address> {
    const addressData = await this.prismaService.adress.findUnique({
      where: { id },
    });
    return this.mapToAddress(addressData);
  }

  async findByUniqueId(street: string, country: string, postalCode: string, city: string): Promise<Address | null> {
    const addressData = await this.prismaService.adress.findFirst({
      where: { street, country, postalCode, city },
    });

    if (!addressData) {
      return null;
    }

    return this.mapToAddress(addressData);
  }

  async findByAccountId(accountId: number): Promise<Address[]> {
    const addressesData = await this.prismaService.adress.findMany({
      where: { accountId },
    });

    return addressesData.map((addressData) => this.mapToAddress(addressData));
  }

  async delete(id: number): Promise<void> {
    try {
      await this.prismaService.adress.delete({
        where: { id },
      });
    } catch (error: any) {
      throw new Error('Failed to delete address');
    }
  }

  private mapToAddress(addressData: any): Address {
    return Address.reconstitute(
      addressData.id,
      addressData.accountId,
      addressData.street,
      addressData.city,
      addressData.postalCode,
      addressData.country,
      addressData.createdAt
    );
  }
}
