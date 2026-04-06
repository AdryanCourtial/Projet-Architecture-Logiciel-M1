import { Injectable } from '@nestjs/common';
import { Product } from "src/product/domain/product.agregate";
import { Category } from "src/product/domain/category.entity";
import { ProductRepositoryInterface } from "../../repository/product.repository";
import { AddProductInput } from "./addProduct.input";
import { Money } from "src/product/domain/value-objects/money.value-object";

@Injectable()
export class AddProductUseCase {
    constructor(
        private readonly productRepository: ProductRepositoryInterface
    ) {}

    async execute(product: AddProductInput): Promise<Product> {
        // TODO: Récupérer la catégorie depuis la base de données via CategoryRepository
        // Pour l'instant, créer une catégorie fictive
        const category = Category.create(product.categoryId, "Category", "Description");

        const productToCreate = Product.create({
            name: product.name,
            description: product.description,
            price: Money.create(product.price),
            stock: product.stock,
            category: category
        });

        console.log("Creating product with data:", productToCreate);

        const createdProduct = await this.productRepository.save(productToCreate);

        console.log("Created product:", createdProduct);
        return createdProduct;
    }

}