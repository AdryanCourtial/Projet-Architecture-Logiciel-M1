import { Injectable } from '@nestjs/common';
import { ProductRepositoryInterface } from "../../repository/product.repository";
import { DeleteProductInput } from "./deleteProduct.input";

@Injectable()
export class DeleteProductUseCase {
    constructor(
        private readonly productRepository: ProductRepositoryInterface
    ) {}

    async execute(product: DeleteProductInput): Promise<void> {

        await this.productRepository.delete(product.id);

        return;
    }

}