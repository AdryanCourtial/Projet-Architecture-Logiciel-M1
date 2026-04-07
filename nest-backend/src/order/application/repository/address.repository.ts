import { Address } from "src/order/domain/address.entity";

export abstract class AddressRepositoryInterface {
  abstract save(address: Address): Promise<Address>;
  abstract findByUniqueId(street: string, country: string, postalCode: string, city: string): Promise<Address | null>;
  abstract findByAccountId(accountId: number): Promise<Address[]>;
  abstract delete(id: number): Promise<void>;
  abstract findById(id: number): Promise<Address>;
}
