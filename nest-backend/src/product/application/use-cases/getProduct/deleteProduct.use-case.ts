import { Injectable } from '@nestjs/common';
import { Product } from "src/product/domain/product.agregate";
import { ProductRepositoryInterface } from "../../repository/product.repository";
import { GetProductInput } from "./getProduct.input";

@Injectable()
export class GetProductUseCase {
    constructor(
        private readonly productRepository: ProductRepositoryInterface
    ) {}

    async execute(product: GetProductInput): Promise<Product> {

        const p = await this.productRepository.findById(product.id);

        return p;
    }

}