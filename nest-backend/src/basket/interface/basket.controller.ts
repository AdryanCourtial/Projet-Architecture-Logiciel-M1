import {
  Controller,
  Post,
  Get,
  Delete,
  Patch,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AddToBasketUseCase } from 'src/basket/application/use-cases/addToBasket/addToBasket.use-case';
import { RemoveFromBasketUseCase } from 'src/basket/application/use-cases/removeFromBasket/removeFromBasket.use-case';
import { UpdateBasketQuantityUseCase } from 'src/basket/application/use-cases/updateQuantity/updateQuantity.use-case';
import { GetBasketUseCase } from 'src/basket/application/use-cases/getBasket/getBasket.use-case';
import { AddToBasketRequestDto } from './dto/request/addToBasket.request';
import { UpdateBasketQuantityRequestDto } from './dto/request/updateBasketQuantity.request';
import { GetBasketResponse, BasketLineResponse } from './dto/response/getBasket.response';
import { SessionAuthGuard } from 'src/auth/interfaces/guards/session.guard';

@Controller('basket')
@UseGuards(SessionAuthGuard)
export class BasketController {

    constructor(
      private readonly addToBasketUseCase: AddToBasketUseCase,
      private readonly removeFromBasketUseCase: RemoveFromBasketUseCase,
      private readonly updateBasketQuantityUseCase: UpdateBasketQuantityUseCase,
      private readonly getBasketUseCase: GetBasketUseCase,
    ) {}

    @Post('add')
    async addToBasket(@Request() req: any, @Body() addToBasketDto: AddToBasketRequestDto): Promise<GetBasketResponse> {
        const accountId = req.session.userId;

        const input = {
          accountId,
          productId: addToBasketDto.productId,
          quantity: addToBasketDto.quantity,
        };

        const basket = await this.addToBasketUseCase.execute(input);

        return {
            id: basket.getId(),
            accountId: basket.getAccountId(),
            lines: basket.getLines().map((line) => ({
              id: line.getId()!,
              productId: line.getProduct().getId()!,
              productName: line.getProduct().getName(),
              quantity: line.getQuantity(),
              pricePerUnit: line.getProduct().getPrice().getAmount(),
              totalPrice: line.getTotalPrice(),
            })),
            totalPrice: basket.getTotalPrice(),
            totalItems: basket.getTotalItems(),
            isEmpty: basket.isEmpty(),
        };

    }

    @Delete('remove/:productId')
    async removeFromBasket(@Request() req: any, @Param('productId') productId: string): Promise<GetBasketResponse> {
        const accountId = req.session.userId;

        const input = {
          accountId,
          productId: parseInt(productId, 10),
        };

        const basket = await this.removeFromBasketUseCase.execute(input);

        return{
          id: basket.getId(),
          accountId: basket.getAccountId(),
          lines: basket.getLines().map((line) => ({
            id: line.getId()!,
            productId: line.getProduct().getId()!,
            productName: line.getProduct().getName(),
            quantity: line.getQuantity(),
            pricePerUnit: line.getProduct().getPrice().getAmount(),
            totalPrice: line.getTotalPrice(),
          })),
          totalPrice: basket.getTotalPrice(),
          totalItems: basket.getTotalItems(),
          isEmpty: basket.isEmpty(),
        };

    }

    @Patch('update-quantity')
    async updateQuantity(@Request() req: any, @Body() updateDto: UpdateBasketQuantityRequestDto) {
        const accountId = req.session.userId;

        const input = {
          accountId,
          productId: updateDto.productId,
          quantity: updateDto.quantity,
        };

        const basket = await this.updateBasketQuantityUseCase.execute(input);

        return {
          id: basket.getId()!,
          accountId: basket.getAccountId(),
          lines: basket.getLines().map((line) => ({
            id: line.getId()!,
            productId: line.getProduct().getId()!,
            productName: line.getProduct().getName(),
            quantity: line.getQuantity(),
            pricePerUnit: line.getProduct().getPrice().getAmount(),
            totalPrice: line.getTotalPrice(),
          })),
          totalPrice: basket.getTotalPrice(),
          totalItems: basket.getTotalItems(),
          isEmpty: basket.isEmpty(),
        };

    }

    @Get()
    async getBasket(@Request() req: any) {
        const accountId = req.session.userId;

        const input = { accountId };
        const basket = await this.getBasketUseCase.execute(input);

        return {
          id: basket.getId()!,
          accountId: basket.getAccountId(),
          lines: basket.getLines().map((line) => ({
            id: line.getId()!,
            productId: line.getProduct().getId()!,
            productName: line.getProduct().getName(),
            quantity: line.getQuantity(),
            pricePerUnit: line.getProduct().getPrice().getAmount(),
            totalPrice: line.getTotalPrice(),
          })),
          totalPrice: basket.getTotalPrice(),
          totalItems: basket.getTotalItems(),
          isEmpty: basket.isEmpty(),
        };

    }
}
