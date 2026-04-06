import { Order } from "src/order/domain/order.aggregate";

export abstract class OrderRepositoryInterface {
  abstract save(order: Order): Promise<Order>;
  abstract findById(id: number): Promise<Order>;
  abstract findByAccountId(accountId: number): Promise<Order[]>;
}
