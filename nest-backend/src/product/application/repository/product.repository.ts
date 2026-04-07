import { Category } from "src/product/domain/category.entity";
import { Product } from "src/product/domain/product.agregate";
import { Page, PaginationParams } from "src/shared/application/type/PaginationParams";

export abstract class ProductRepositoryInterface {
    abstract save(product: Product): Promise<Product>;
    abstract findById(id: number): Promise<Product>;
    abstract delete(id: number): Promise<void>;
    abstract findmany(id: number): Promise<Product[]>;
    abstract findAllCategories(): Promise<Category[]>
    abstract findWithPagination(pagination: PaginationParams, categoryId?: number): Promise<Page<Product>>;
}