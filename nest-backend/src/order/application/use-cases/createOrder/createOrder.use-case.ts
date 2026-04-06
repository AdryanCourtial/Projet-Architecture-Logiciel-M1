import { Injectable, BadRequestException } from '@nestjs/common';
import { OrderRepositoryInterface } from '../../repository/order.repository';
import { BasketRepositoryInterface } from 'src/basket/application/repository/basket.repository';
import { AddressService } from '../../services/address.service';
import { CreateOrderInput } from './createOrder.input';
import { OrderLine } from 'src/order/domain/order-line.entity';
import { Order } from 'src/order/domain/order.aggregate';

@Injectable()
export class CreateOrderUseCase {
    constructor(
      private readonly orderRepository: OrderRepositoryInterface,
      private readonly basketRepository: BasketRepositoryInterface,
      private readonly addressService: AddressService
    ) {}

    async execute(input: CreateOrderInput): Promise<Order> {
      const basket = await this.basketRepository.getByAccountId(input.accountId);

      if (basket.isEmpty()) {
        throw new Error('Cannot create order from empty basket');
      }

      if (!input.deliveryAddress || !input.billingAddress) {
        throw new Error('Delivery and billing address must be provided');
      }

      const dAdress = await this.addressService.createorFindAddress({
        accountId: input.accountId,
        street: input.deliveryAddress.street,
        city: input.deliveryAddress.city,
        postalCode: input.deliveryAddress.postalCode,
        country: input.deliveryAddress.country
      });

      const bAdress = await this.addressService.createorFindAddress({
        accountId: input.accountId,
        street: input.billingAddress.street,
        city: input.billingAddress.city,
        postalCode: input.billingAddress.postalCode,
        country: input.billingAddress.country
      });

      const orderLines = basket.getLines().map(basketLine =>
        OrderLine.create(basketLine.getProduct(), basketLine.getQuantity())
      );

      const order = Order.create(
          input.accountId,
          orderLines,
          dAdress,
          bAdress
      );

      const savedOrder = await this.orderRepository.save(order);

      const emptyBasket = basket.clear();
      await this.basketRepository.save(emptyBasket);

      return savedOrder;
    }
}
