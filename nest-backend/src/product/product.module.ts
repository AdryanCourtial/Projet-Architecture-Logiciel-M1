import { Module } from '@nestjs/common';
import { ProductController } from './interface/product.controller';
import { GetProductUseCase } from './application/use-cases/getProduct/deleteProduct.use-case';
import { AddProductUseCase } from './application/use-cases/addProduct/addProduct.use-case';
import { UpdateProductUseCase } from './application/use-cases/updateProduct/updateProduct.use-case';
import { DeleteProductUseCase } from './application/use-cases/deleteProduct/deleteProduct.use-case';
import { GetAllProductsUseCase } from './application/use-cases/getAllProducts/getAllProducts.use-case';
import { ProductRepositoryInterface } from './application/repository/product.repository';
import { PrismaProductRepository } from './infrastructure/db/prisma-product.repository';
import { PrismaModule } from 'src/shared/infrastructure/database/prisma.module';
import { GetCategoriesUseCase } from './application/use-cases/getCategories/getCategories.use-case';

@Module({
    imports: [PrismaModule],
    providers: [
        {
            provide: ProductRepositoryInterface,
            useClass: PrismaProductRepository,
        },
        GetProductUseCase,
        AddProductUseCase,
        UpdateProductUseCase,
        DeleteProductUseCase,
        GetAllProductsUseCase,
        GetCategoriesUseCase
    ],
    controllers: [ProductController],
    exports: [ProductRepositoryInterface],
})
export class ProductModule {}
