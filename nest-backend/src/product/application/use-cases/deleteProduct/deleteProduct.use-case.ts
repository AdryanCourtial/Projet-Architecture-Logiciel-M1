import { ProductRepositoryInterface } from "../../repository/auth.repository";
import { DeleteProductInput } from "./deleteProduct.input";

export class DeleteProductUseCase {
    constructor(
        private readonly productRepository: ProductRepositoryInterface
    ) {}

    async execute(product: DeleteProductInput): Promise<void> {

        await this.productRepository.delete(product.id);

        return;
    }

}