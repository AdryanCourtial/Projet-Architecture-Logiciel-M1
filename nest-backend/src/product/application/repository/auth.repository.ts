import { Product } from "src/product/domain/product.agregate";
import { Account } from "../../../compte/domain/account.entity";

export abstract class ProductRepositoryInterface {
    abstract save(product: Product): Promise<Product>;
    abstract findById(id: number): Promise<Product>;
    abstract delete(id: number): Promise<void>;
    abstract findmany(id: number): Promise<Product[]>;
}