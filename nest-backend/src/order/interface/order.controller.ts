import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  UseGuards,
  Request,
  Req
} from '@nestjs/common';
import { CreateOrderUseCase } from 'src/order/application/use-cases/createOrder/createOrder.use-case';
import { GetOrderUseCase } from 'src/order/application/use-cases/getOrder/getOrder.use-case';
import { AddressService } from 'src/order/application/services/address.service';
import { CreateOrderRequestDto } from './dto/request/createOrder.request';
import { OrderWithAddressesMapper } from './mapper/order-with-addresses.mapper';
import { SessionAuthGuard } from 'src/auth/interfaces/guards/session.guard';
import { PostOrderResponseDto } from './dto/response/postOrder.response';
import { getOrderByUserUseCase } from '../application/use-cases/getOrderByUser/getOrderByUser.use-case';

@Controller('orders')
@UseGuards(SessionAuthGuard)
export class OrderController {
  constructor(
    private readonly createOrderUseCase: CreateOrderUseCase,
    private readonly getOrderUseCase: GetOrderUseCase,
    private readonly addressService: AddressService,
    private readonly getOrderByUser: getOrderByUserUseCase
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
          city: order.getDeliveryAddress().getCity(),
          country: order.getDeliveryAddress().getCountry(),
          postalCode: order.getDeliveryAddress().getPostalCode(),
          street: order.getDeliveryAddress().getStreet(),
        },
        billingAddress: {
          city: order.getBillingAddress().getCity(),
          country: order.getBillingAddress().getCountry(),
          postalCode: order.getBillingAddress().getPostalCode(),
          street: order.getBillingAddress().getStreet(),
        },
        createdAt: order.getCreatedAt(),

      }

  }

  @Get('/user')
  async getOrderByUserId(@Req() req: any) {

    const userId = req.session.userId

    const orders  = this.getOrderByUser.execute(userId)

    return orders

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
