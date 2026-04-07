import { Injectable } from '@nestjs/common';
import { Order, OrderStatus } from '../../domain/order.aggregate';
import { OrderLine } from '../../domain/order-line.entity';
import { Address } from '../../domain/address.entity';
import { OrderRepositoryInterface } from '../../application/repository/order.repository';
import { PrismaService } from 'src/shared/infrastructure/database/prisma.service';
import { Product } from 'src/product/domain/product.agregate';
import { Money } from 'src/product/domain/value-objects/money.value-object';
import { Category } from 'src/product/domain/category.entity';

@Injectable()
export class PrismaOrderRepository implements OrderRepositoryInterface {
  constructor(private prismaService: PrismaService) {}

  async save(order: Order): Promise<Order> {
    try {
      const orderData = await this.prismaService.order.create({
        data: {
          accountId: order.getAccountId(),
          status: order.getStatus(),
          adressDeviveryId: order.getDeliveryAddress().getId()!,
          adressBillingId: order.getBillingAddress().getId()!,
          items: {
            create: order.getLines().map(line => ({
              productId: line.getProduct().getId()!,
              quantity: line.getQuantity()
            }))
          }
        },
        include: {
          items: {
            include: { product: { include: { category: true } } }
          },
          adressDevivery: true,
          adressBilling: true
        }
      });

      return this.mapToOrder(orderData);
    } catch (error: any) {
      throw new Error('Failed to save order');
    }
  }

  async findById(id: number): Promise<Order> {
    const orderData = await this.prismaService.order.findUnique({
      where: { id },
      include: {
        items: {
          include: { product: { include: { category: true } } }
        },
        adressDevivery: true,
        adressBilling: true
      }
    });

    if (!orderData) {
      throw new Error('Order not found');
    }

    return this.mapToOrder(orderData);
  }

  async findByAccountId(accountId: number): Promise<Order[]> {
    const ordersData = await this.prismaService.order.findMany({
      where: { accountId },
      include: {
        items: {
          include: { product: { include: { category: true } } }
        },
        adressDevivery: true,
        adressBilling: true
      }
    });

    return ordersData.map(orderData => this.mapToOrder(orderData));
  }

  private mapToOrder(orderData: any): Order {
    const lines = orderData.items.map((item: any) =>
      OrderLine.reconstitute(
        item.id,
        Product.reconstitute({
          id: item.product.id,
          name: item.product.name,
          description: item.product.description,
          stock: item.product.stock,
          price: Money.create(item.product.price),
          category: Category.create(
            item.product.category.id,
            item.product.category.name,
            item.product.category.description
          )
        }),
        item.quantity,
        item.product.price
      )
    );

    const deliveryAddress = Address.reconstitute(
      orderData.adressDevivery.id,
      orderData.adressDevivery.accountId,
      orderData.adressDevivery.street,
      orderData.adressDevivery.city,
      orderData.adressDevivery.postalCode,
      orderData.adressDevivery.country,
      orderData.adressDevivery.createdAt
    );

    const billingAddress = Address.reconstitute(
      orderData.adressBilling.id,
      orderData.adressBilling.accountId,
      orderData.adressBilling.street,
      orderData.adressBilling.city,
      orderData.adressBilling.postalCode,
      orderData.adressBilling.country,
      orderData.adressBilling.createdAt
    );

    return Order.reconstitute(
      orderData.id,
      orderData.accountId,
      lines,
      orderData.status as OrderStatus,
      deliveryAddress,
      billingAddress,
      orderData.createdAt || new Date()
    );
  }
}
