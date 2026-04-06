import { Product } from "src/product/domain/product.agregate";
import { ProductRepositoryInterface } from "../../repository/auth.repository";
import { GetProductInput } from "./getProduct.input";

export class GetProductUseCase {
    constructor(
        private readonly productRepository: ProductRepositoryInterface
    ) {}

    async execute(product: GetProductInput): Promise<Product> {

        const p = await this.productRepository.findById(product.id);

        return p;
    }

}