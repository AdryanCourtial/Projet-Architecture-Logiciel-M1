import { Injectable } from '@nestjs/common';
import { Basket } from '../../domain/basket.aggregate';
import { BasketLine } from '../../domain/basket-line.entity';
import { BasketRepositoryInterface } from '../../application/repository/basket.repository';
import { PrismaService } from 'src/shared/infrastructure/database/prisma.service';
import { ProductRepositoryInterface } from 'src/product/application/repository/product.repository';
import { Product } from 'src/product/domain/product.agregate';
import { Money } from 'src/product/domain/value-objects/money.value-object';
import { Category } from 'src/product/domain/category.entity';

@Injectable()
export class PrismaBasketRepository implements BasketRepositoryInterface {
    constructor(
        private prismaService: PrismaService,
        private productRepository: ProductRepositoryInterface
    ) {}

    async getByAccountId(accountId: number): Promise<Basket> {
        const basketData = await this.prismaService.basket.findUnique({
        where: { accountId },
        include: {
            items: {
            include: { product: { include: { category: true } } }
            }
        }
        });

        if (!basketData) {
        throw new Error('Basket not found');
        }

        const lines = basketData.items.map(item =>
            BasketLine.reconstitute(
                item.id,
                Product.reconstitute({
                    id: item.product.id,
                    name: item.product.name,
                    description: item.product.description,
                    stock: item.product.stock,
                    price: Money.create(
                        item.product.price
                    ),
                    category: Category.create(
                        item.product.category.id,
                        item.product.category.name,
                        item.product.category.description
                    )
                }),
                item.quantity
            )
        );

        return Basket.reconstitute(basketData.id, basketData.accountId, lines);
    }

    async getOrCreate(accountId: number): Promise<Basket> {
        let basketData = await this.prismaService.basket.findUnique({
        where: { accountId },
        include: {
            items: {
                include: { product: { include: { category: true } } }
            }
        }
        });

        if (!basketData) {
            basketData = await this.prismaService.basket.create({
                data: { accountId },
                include: {
                    items: {
                        include: { product: { include: { category: true } } }
                    }
                }
            });

            return Basket.create(basketData.id, basketData.accountId);
        }

        const lines = basketData.items.map(item =>
            BasketLine.reconstitute(
                item.id,
                Product.reconstitute({
                    id: item.product.id,
                    name: item.product.name,
                    description: item.product.description,
                    stock: item.product.stock,
                    price: Money.create(
                        item.product.price
                    ),
                    category: Category.create(
                        item.product.category.id,
                        item.product.category.name,
                        item.product.category.description
                    )
                }),
                item.quantity
            )
        );

        return Basket.reconstitute(basketData.id, basketData.accountId, lines);
    }

    async save(basket: Basket): Promise<Basket> {
        try {
            await this.prismaService.basketItem.deleteMany({
                where: { basketId: basket.getId() }
            });

            for (const line of basket.getLines()) {
                await this.prismaService.basketItem.create({
                data: {
                    basketId: basket.getId(),
                    productId: line.getProduct().getId()!,
                    quantity: line.getQuantity()
                }
                });
            }

            return basket;
        } catch (error: any) {
            throw new Error('Failed to save basket');
        }
    }
}
