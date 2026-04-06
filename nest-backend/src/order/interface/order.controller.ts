import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  UseGuards,
  Request
} from '@nestjs/common';
import { CreateOrderUseCase } from 'src/order/application/use-cases/createOrder/createOrder.use-case';
import { GetOrderUseCase } from 'src/order/application/use-cases/getOrder/getOrder.use-case';
import { AddressService } from 'src/order/application/services/address.service';
import { CreateOrderRequestDto } from './dto/request/createOrder.request';
import { OrderWithAddressesMapper } from './mapper/order-with-addresses.mapper';
import { SessionAuthGuard } from 'src/auth/interfaces/guards/session.guard';
import { PostOrderResponseDto } from './dto/response/postOrder.response';

@Controller('orders')
@UseGuards(SessionAuthGuard)
export class OrderController {
  constructor(
    private readonly createOrderUseCase: CreateOrderUseCase,
    private readonly getOrderUseCase: GetOrderUseCase,
    private readonly addressService: AddressService,
  ) {}

  @Post('create')
  async createOrder(@Request() req: any, @Body() createOrderDto: CreateOrderRequestDto): Promise<PostOrderResponseDto> {
      const accountId = req.session.userId;

      const input = {
        accountId,
        deliveryAddress: createOrderDto.deliveryAddress,
        billingAddress: createOrderDto.billingAddress,
      };

      const order = await this.createOrderUseCase.execute(input);

      return {
        accountId: order.getAccountId(),
        id: order.getId()!,
        status: order.getStatus(),
        totalPrice: order.getTotalPrice().getAmount(),
        totalItems: order.getTotalItems(),
        deliveryAddress: {
          id: order.getDeliveryAddress().getId()!,
          city: order.getDeliveryAddress().getCity(),
          country: order.getDeliveryAddress().getCountry(),
          postalCode: order.getDeliveryAddress().getPostalCode(),
          street: order.getDeliveryAddress().getStreet(),
        },
        billingAddress: {
          id: order.getBillingAddress().getId()!,
          city: order.getBillingAddress().getCity(),
          country: order.getBillingAddress().getCountry(),
          postalCode: order.getBillingAddress().getPostalCode(),
          street: order.getBillingAddress().getStreet(),
        },
        createdAt: order.getCreatedAt(),

      }

  }

  @Get(':id')
  async getOrder(@Param('id') id: string) {

      const input = { orderId: parseInt(id) };
      const order = await this.getOrderUseCase.execute(input);

      const deliveryAddress = await this.addressService.getAddressById(order.getDeliveryAddress().getId()!);
      const billingAddress = await this.addressService.getAddressById(order.getBillingAddress().getId()!);

      return OrderWithAddressesMapper.toDetailResponse(order, deliveryAddress, billingAddress);
  }
}
