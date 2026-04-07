import { Module } from '@nestjs/common';
import { OrderController } from './interface/order.controller';
import { CreateOrderUseCase } from './application/use-cases/createOrder/createOrder.use-case';
import { GetOrderUseCase } from './application/use-cases/getOrder/getOrder.use-case';
import { CreateAddressUseCase } from './application/use-cases/createAddress/createAddress.use-case';
import { GetAddressesUseCase } from './application/use-cases/getAddresses/getAddresses.use-case';
import { DeleteAddressUseCase } from './application/use-cases/deleteAddress/deleteAddress.use-case';
import { OrderRepositoryInterface } from './application/repository/order.repository';
import { AddressRepositoryInterface } from './application/repository/address.repository';
import { PrismaOrderRepository } from './infrastructure/db/prisma-order.repository';
import { PrismaAddressRepository } from './infrastructure/db/prisma-address.repository';
import { AddressService } from './application/services/address.service';
import { PrismaModule } from 'src/shared/infrastructure/database/prisma.module';
import { BasketModule } from 'src/basket/basket.module';
import { GetCategoriesUseCase } from 'src/product/application/use-cases/getCategories/getCategories.use-case';
import { getOrderByUserUseCase } from './application/use-cases/getOrderByUser/getOrderByUser.use-case';

@Module({
  imports: [PrismaModule, BasketModule],
  providers: [
    {
      provide: OrderRepositoryInterface,
      useClass: PrismaOrderRepository,
    },
    {
      provide: AddressRepositoryInterface,
      useClass: PrismaAddressRepository,
    },
    CreateOrderUseCase,
    GetOrderUseCase,
    CreateAddressUseCase,
    GetAddressesUseCase,
    DeleteAddressUseCase,
    AddressService,
    getOrderByUserUseCase
  ],
  controllers: [OrderController],
  exports: [OrderRepositoryInterface, AddressRepositoryInterface],
})
export class OrderModule {}
