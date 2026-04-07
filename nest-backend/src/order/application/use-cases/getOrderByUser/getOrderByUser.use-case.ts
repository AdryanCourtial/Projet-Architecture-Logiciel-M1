import { Injectable } from "@nestjs/common";
import { ProductRepositoryInterface } from "src/product/application/repository/product.repository";
import { OrderRepositoryInterface } from "../../repository/order.repository";
import { Order } from "src/order/domain/order.aggregate";

@Injectable()
export class getOrderByUserUseCase {

    constructor(
        private readonly productRepository: OrderRepositoryInterface
    ) {}

    async execute(userId: number): Promise<Order[]> {
        // Get les Orders

        const orders = await this.productRepository.findByAccountId(userId)

        return orders

    }
}