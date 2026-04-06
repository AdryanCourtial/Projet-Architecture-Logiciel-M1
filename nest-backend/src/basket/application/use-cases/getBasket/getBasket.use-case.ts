import { Injectable } from '@nestjs/common';
import { BasketRepositoryInterface } from '../../repository/basket.repository';
import { GetBasketInput } from './getBasket.input';
import { Basket } from 'src/basket/domain/basket.aggregate';

@Injectable()
export class GetBasketUseCase {
    constructor(private readonly basketRepository: BasketRepositoryInterface) {}

    async execute(input: GetBasketInput): Promise<Basket> {
        return this.basketRepository.getOrCreate(input.accountId);
    }
}
