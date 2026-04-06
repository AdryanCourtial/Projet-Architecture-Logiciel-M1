import { Injectable } from '@nestjs/common';
import { OrderRepositoryInterface } from '../../repository/order.repository';
import { GetOrderInput } from './getOrder.input';
import { Order } from 'src/order/domain/order.aggregate';

@Injectable()
export class GetOrderUseCase {
  constructor(private readonly orderRepository: OrderRepositoryInterface) {}

  async execute(input: GetOrderInput): Promise<Order> {
    console.log('Executing GetOrderUseCase with input:', input);
    return this.orderRepository.findById(input.orderId);
  }
}
