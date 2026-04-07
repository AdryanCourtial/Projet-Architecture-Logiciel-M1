import { Injectable } from "@nestjs/common";
import { ProductRepositoryInterface } from "../../repository/product.repository";
import { Category } from "src/product/domain/category.entity";

@Injectable()
export class GetCategoriesUseCase {

    constructor(
        private productRepository: ProductRepositoryInterface
    ) {}
    async execute(): Promise<Category[]> {
        return this.productRepository.findAllCategories();
    }
}