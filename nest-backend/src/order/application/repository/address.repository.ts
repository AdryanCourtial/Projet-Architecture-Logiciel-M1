import { Address } from "src/order/domain/address.entity";

export abstract class AddressRepositoryInterface {
  abstract save(address: Address): Promise<Address>;
  abstract findById(id: number): Promise<Address>;
  abstract findByAccountId(accountId: number): Promise<Address[]>;
  abstract delete(id: number): Promise<void>;
}
