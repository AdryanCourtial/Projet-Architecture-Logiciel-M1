import { Injectable } from '@nestjs/common';
import { BasketRepositoryInterface } from '../../repository/basket.repository';
import { ProductRepositoryInterface } from 'src/product/application/repository/product.repository';
import { AddToBasketInput } from './addToBasket.input';
import { BasketLine } from 'src/basket/domain/basket-line.entity';
import { Basket } from '../../../domain/basket.aggregate';

@Injectable()
export class AddToBasketUseCase {
    constructor(
        private readonly basketRepository: BasketRepositoryInterface,
        private readonly productRepository: ProductRepositoryInterface
    ) {}

    async execute(input: AddToBasketInput): Promise<Basket> {
        const basket = await this.basketRepository.getOrCreate(input.accountId);

        const product = await this.productRepository.findById(input.productId);

        const basketLine = BasketLine.create(product, input.quantity);

        const updatedBasket = basket.addLine(basketLine);

        const savedBasket = await this.basketRepository.save(updatedBasket);

        return savedBasket;

    }
}
