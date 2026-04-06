import { Injectable } from '@nestjs/common';
import { Product } from "src/product/domain/product.agregate";
import { ProductRepositoryInterface } from "../../repository/product.repository";
import { UpdateProductInput } from "./updateProduct.input";
import { Money } from "src/product/domain/value-objects/money.value-object";

@Injectable()
export class UpdateProductUseCase {
    constructor(
        private readonly productRepository: ProductRepositoryInterface
    ) {}

    async execute(input: UpdateProductInput): Promise<Product> {
        const existingProduct = await this.productRepository.findById(input.id);
        
        if (!existingProduct) {
            throw new Error(`Product with ID ${input.id} not found`);
        }

        const productData = {
            id: existingProduct.getId(),
            name: input.name || existingProduct.getName(),
            description: input.description || existingProduct.getDescription(),
            price: input.price ? Money.create(input.price) : existingProduct.getPrice(),
            stock: input.stock !== undefined ? input.stock : existingProduct.getStock(),
            category: existingProduct.getCategory(),
        };

        const updatedProduct = Product.reconstitute({
            id: productData.id!,
            name: productData.name,
            description: productData.description,
            stock: productData.stock!,
            price: productData.price,
            category: productData.category,
        });

        return await this.productRepository.save(updatedProduct);
    }
}
