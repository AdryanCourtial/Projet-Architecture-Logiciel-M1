import { Injectable } from '@nestjs/common';
import { ProductRepositoryInterface } from '../../repository/product.repository';
import { GetAllProductsInput } from './getAllProducts.input';
import { Page, PaginationParams } from 'src/shared/application/type/PaginationParams';
import { Product } from 'src/product/domain/product.agregate';

@Injectable()
export class GetAllProductsUseCase {
    private readonly DEFAULT_PAGE = 1;
    private readonly DEFAULT_LIMIT = 10;

    constructor(private readonly productRepository: ProductRepositoryInterface) {}

    async execute(input: GetAllProductsInput): Promise<Page<Product>> {
        const page = input.page || this.DEFAULT_PAGE;
        const limit = input.limit || this.DEFAULT_LIMIT;

        if (page < 1 || limit < 1) {
            throw new Error('Page and limit must be greater than 0');
        }

        const pagination: PaginationParams = { page, limit };
        
        return this.productRepository.findWithPagination(pagination, input.categoryId);
    }
}
