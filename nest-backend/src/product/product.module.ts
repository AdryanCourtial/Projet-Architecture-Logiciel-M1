import { Module } from '@nestjs/common';
import { ProductController } from './interface/product.controller';
import { GetProductUseCase } from './application/use-cases/getProduct/deleteProduct.use-case';
import { AddProductUseCase } from './application/use-cases/addProduct/addProduct.use-case';
import { UpdateProductUseCase } from './application/use-cases/updateProduct/updateProduct.use-case';
import { DeleteProductUseCase } from './application/use-cases/deleteProduct/deleteProduct.use-case';
import { ProductRepositoryInterface } from './application/repository/auth.repository';
import { PrismaProductRepository } from './infrastructure/db/prisma-product.repository';

@Module({
    imports: [],
    providers: [
        {
            provide: ProductRepositoryInterface,
            useClass: PrismaProductRepository,
        },
        GetProductUseCase,
        AddProductUseCase,
        UpdateProductUseCase,
        DeleteProductUseCase,
    ],
    controllers: [ProductController],
})
export class ProductModule {}
