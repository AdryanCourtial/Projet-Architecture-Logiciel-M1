import { Basket } from "src/basket/domain/basket.aggregate";

export abstract class BasketRepositoryInterface {
  abstract getByAccountId(accountId: number): Promise<Basket>;
  abstract save(basket: Basket): Promise<Basket>;
  abstract getOrCreate(accountId: number): Promise<Basket>;
}
