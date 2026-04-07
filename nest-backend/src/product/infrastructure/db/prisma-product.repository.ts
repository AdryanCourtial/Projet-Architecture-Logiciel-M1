import { Injectable } from "@nestjs/common";
import { Product } from "src/product/domain/product.agregate";
import { ProductRepositoryInterface } from "src/product/application/repository/product.repository";
import { Money } from "src/product/domain/value-objects/money.value-object";
import { Page, PaginationParams } from "src/shared/application/type/PaginationParams";
import { PrismaService } from "../../../shared/infrastructure/database/prisma.service";
import { Category } from "src/product/domain/category.entity";

@Injectable()
export class PrismaProductRepository implements ProductRepositoryInterface { 
    constructor(
        private prismaService: PrismaService
    ) {}

    async save(product: Product): Promise<Product> {

        try {
            if (product.getId()) {
                const updatedProduct = await this.prismaService.product.update({
                    where: {
                        id: product.getId()!
                    },
                    data: {
                        name: product.getName(),
                        description: product.getDescription(),
                        price: product.getPrice().getAmount(),
                        stock: product.getStock() || 0
                    },
                    include: {
                        reviews: true,
                        category: true
                    }
                });

                return Product.reconstitute({
                    id: updatedProduct.id,
                    name: updatedProduct.name,
                    description: updatedProduct.description,
                    price: Money.create(updatedProduct.price),
                    stock: updatedProduct.stock,
                    reviews: updatedProduct.reviews?.map((review: any) => {
                        return review;
                    }),
                    category: Category.create(
                        updatedProduct.category.id,
                        updatedProduct.category.name,
                        updatedProduct.category.description
                    )
                });
            }

            const savedProduct = await this.prismaService.product.create({
                data: {
                    name: product.getName(),
                    description: product.getDescription(),
                    price: product.getPrice().getAmount(),
                    categoryId: product.getCategory().getId(),
                    stock: product.getStock() || 0
                },
                include: {
                    reviews: true,
                    category: true
                }
            });
    
            return Product.reconstitute({
                id: savedProduct.id,
                name: savedProduct.name,
                description: savedProduct.description,
                price: Money.create(savedProduct.price),
                stock: savedProduct.stock,
                reviews: savedProduct.reviews?.map((review: any) => {
                    return review;
                }),
                category: Category.create(
                    savedProduct.category.id,
                    savedProduct.category.name,
                    savedProduct.category.description
                )
            });

        } catch (error: any) {
            if (error.code === 'P2025') {
                throw new Error("Product not found");
            }
            throw new Error("Failed to save product");
        }
    }

    async findById(id: number): Promise<Product> {

        const product = await this.prismaService.product.findUnique({
            where: {
                id
            }, 
            include: {
                category: true,
                reviews: true
            }
        });

        if (!product) {
            throw new Error("Product not found");
        }

        return Product.reconstitute({
            id: product.id,
            name: product.name,
            description: product.description,
            price: Money.create(product.price),
            stock: product.stock,
            category: Category.create(
                product.category.id,
                product.category.name,
                product.category.description
            ),
        });

    }

    async delete(id: number): Promise<void> {

        await this.prismaService.product.delete({
            where: {
                id
            }
        });

    }

    async findmany(id: number): Promise<Product[]> {
        return [];
    }

    async findWithPagination(pagination: PaginationParams, categoryId?: number): Promise<Page<Product>> {
        const skip = (pagination.page - 1) * pagination.limit;

        const where: any = {};
        if (categoryId) {
            where.categoryId = categoryId;
        }

        const products = await this.prismaService.product.findMany({
            where,
            skip,
            take: pagination.limit,
            include: { category: true, reviews: true },
            orderBy: { id: "desc" }
        });

        const total = await this.prismaService.product.count({ where });

        const data = products.map(product =>
            Product.reconstitute({
                id: product.id,
                name: product.name,
                description: product.description,
                price: Money.create(product.price),
                stock: product.stock,
                category: Category.create(
                    product.category.id,
                    product.category.name,
                    product.category.description
                )
            })
        );

        return {
            items: data,
            totalItems: total,
            page: pagination.page,
            limit: pagination.limit,
            totalPages: Math.ceil(total / pagination.limit)
        };
    }

    async findAllCategories(): Promise<Category[]> {
        return this.prismaService.category.findMany().then(categories => 
            categories.map(category => 
                Category.create(
                    category.id,
                    category.name,
                    category.description
                )
            )
        );
    }
}