import { Product } from "src/product/domain/product.agregate";
import { ProductRepositoryInterface } from "../../repository/auth.repository";
import { AddProductInput } from "./addProduct.input";
import { Money } from "src/product/domain/value-objects/money.value-object";

export class AddProductUseCase {
    constructor(
        private readonly productRepository: ProductRepositoryInterface
    ) {}

    async execute(product: AddProductInput): Promise<Product> {

        const productToCreate = Product.create({
            name: product.name,
            description: product.description,
            price: Money.create(product.price),
            stock: product.stock
        });

        const createdProduct = await this.productRepository.save(productToCreate);

        return createdProduct;
    }

}