import { Injectable } from "@nestjs/common";
import { Product } from "src/product/domain/product.agregate";
import { ProductRepositoryInterface } from "src/product/application/repository/auth.repository";
import { PrismaService } from "src/shared/infrastructure/database/prisma.service";
import { Money } from "src/product/domain/value-objects/money.value-object";

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
                        reviews: true
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
                    })
                });
            }

            const savedProduct = await this.prismaService.product.create({
                data: {
                    name: product.getName(),
                    description: product.getDescription(),
                    price: product.getPrice().getAmount(),
                    categoryId: 1,
                    stock: product.getStock() || 0
                },
                include: {
                    reviews: true
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
                })
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
}