import { Injectable } from '@nestjs/common';
import { BasketRepositoryInterface } from '../../repository/basket.repository';
import { UpdateBasketQuantityInput } from './updateQuantity.input';
import { Basket } from 'src/basket/domain/basket.aggregate';

@Injectable()
export class UpdateBasketQuantityUseCase {
    constructor(private readonly basketRepository: BasketRepositoryInterface) {}

    async execute(input: UpdateBasketQuantityInput): Promise<Basket> {
        const basket = await this.basketRepository.getByAccountId(input.accountId);

        const updatedBasket = basket.updateLineQuantity(input.productId, input.quantity);

        return this.basketRepository.save(updatedBasket);
    }
}
