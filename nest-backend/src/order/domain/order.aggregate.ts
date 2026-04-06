import { Money } from 'src/product/domain/value-objects/money.value-object';
import { OrderLine } from './order-line.entity';
import { Address } from './address.entity';

export enum OrderStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED'
}

export class Order {
    private constructor(
        private readonly id: number | null,
        private readonly accountId: number,
        private readonly lines: OrderLine[] = [],
        private readonly status: OrderStatus = OrderStatus.PENDING,
        private readonly deliveryAddress: Address,
        private readonly billingAddress: Address,
        private readonly createdAt: Date = new Date()
    ) {}

    static create(
        accountId: number,
        lines: OrderLine[],
        deliveryAddress: Address,
        billingAddress: Address
    ): Order {
        if (!lines || lines.length === 0) {
            throw new Error('Order must have at least one line');
        }

        return new Order(
            null,
            accountId,
            lines,
            OrderStatus.PENDING,
            deliveryAddress,
            billingAddress
        );
    }

    static reconstitute(
        id: number,
        accountId: number,
        lines: OrderLine[],
        status: OrderStatus,
        deliveryAddress: Address,
        billingAddress: Address,
        createdAt: Date
    ): Order {
            return new Order(
            id,
            accountId,
            lines,
            status,
            deliveryAddress,
            billingAddress,
            createdAt
        );
    }

    getId(): number | null {
        return this.id;
    }

    getAccountId(): number {
        return this.accountId;
    }

    getLines(): OrderLine[] {
        return this.lines;
    }

    getStatus(): OrderStatus {
        return this.status;
    }

    getDeliveryAddress(): Address {
        return this.deliveryAddress;
    }

    getBillingAddress(): Address {
        return this.billingAddress;
    }

    getCreatedAt(): Date {
        return this.createdAt;
    }

    getTotalPrice(): Money {
        const totalAmount = this.lines.reduce((total, line) => total + line.getTotalPrice(), 0);
        return Money.create(totalAmount);
    }

    getTotalItems(): number {
        return this.lines.reduce((total, line) => total + line.getQuantity(), 0);
    }

    updateStatus(status: OrderStatus): Order {
        return new Order(
            this.id,
            this.accountId,
            this.lines,
            status,
            this.deliveryAddress,
            this.billingAddress,
            this.createdAt
        );
    }
}
