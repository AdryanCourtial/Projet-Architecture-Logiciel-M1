import { Injectable } from '@nestjs/common';
import { BasketRepositoryInterface } from '../../repository/basket.repository';
import { RemoveFromBasketInput } from './removeFromBasket.input';
import { Basket } from 'src/basket/domain/basket.aggregate';

@Injectable()
export class RemoveFromBasketUseCase {
    constructor(private readonly basketRepository: BasketRepositoryInterface) {}

    async execute(input: RemoveFromBasketInput): Promise<Basket> {
        const basket = await this.basketRepository.getByAccountId(input.accountId);

        const updatedBasket = basket.removeLine(input.productId);

        return this.basketRepository.save(updatedBasket);
    }
}
