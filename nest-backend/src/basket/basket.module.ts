import { Module } from '@nestjs/common';
import { AddToBasketUseCase } from './application/use-cases/addToBasket/addToBasket.use-case';
import { RemoveFromBasketUseCase } from './application/use-cases/removeFromBasket/removeFromBasket.use-case';
import { UpdateBasketQuantityUseCase } from './application/use-cases/updateQuantity/updateQuantity.use-case';
import { GetBasketUseCase } from './application/use-cases/getBasket/getBasket.use-case';
import { BasketRepositoryInterface } from './application/repository/basket.repository';
import { PrismaBasketRepository } from './infrastructure/db/prisma-basket.repository';
import { PrismaModule } from 'src/shared/infrastructure/database/prisma.module';
import { ProductModule } from 'src/product/product.module';
import { BasketController } from './interface/basket.controller';

@Module({
  imports: [PrismaModule, ProductModule],
  providers: [
    {
      provide: BasketRepositoryInterface,
      useClass: PrismaBasketRepository,
    },
    AddToBasketUseCase,
    RemoveFromBasketUseCase,
    UpdateBasketQuantityUseCase,
    GetBasketUseCase,
  ],
  controllers: [BasketController],
  exports: [BasketRepositoryInterface],
})
export class BasketModule {}
