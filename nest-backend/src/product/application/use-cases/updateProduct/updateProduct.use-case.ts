import { Product } from "src/product/domain/product.agregate";
import { ProductRepositoryInterface } from "../../repository/auth.repository";
import { UpdateProductInput } from "./updateProduct.input";
import { Money } from "src/product/domain/value-objects/money.value-object";

export class UpdateProductUseCase {
    constructor(
        private readonly productRepository: ProductRepositoryInterface
    ) {}

    async execute(input: UpdateProductInput): Promise<Product> {
        // Récupérer le produit existant
        const existingProduct = await this.productRepository.findById(input.id);
        
        if (!existingProduct) {
            throw new Error(`Product with ID ${input.id} not found`);
        }

        // Préparer les données de mise à jour (garder les anciennes si non fourni)
        const productData = {
            id: existingProduct.getId(),
            name: input.name || existingProduct.getName(),
            description: input.description || existingProduct.getDescription(),
            price: input.price ? Money.create(input.price) : existingProduct.getPrice(),
            stock: input.stock !== undefined ? input.stock : existingProduct.getStock(),
        };

        // Reconstituer le produit avec les nouvelles données
        const updatedProduct = Product.reconstitute({
            id: productData.id!,
            name: productData.name,
            description: productData.description,
            stock: productData.stock!,
            price: productData.price,
        });

        // Sauvegarder et retourner
        return await this.productRepository.save(updatedProduct);
    }
}
