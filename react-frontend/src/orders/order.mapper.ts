import type { Order, OrderApi, UserOrder, UserOrderApi } from "./order.types";

const centsToEuro = (value: number): number => Number((value / 100).toFixed(2));

export const mapOrderFromApi = (order: OrderApi): Order => {
  return {
    ...order,
    totalPrice: centsToEuro(order.totalPrice),
  };
};

export const mapUserOrderFromApi = (order: UserOrderApi): UserOrder => {
  const lines = order.lines.map((line) => {
    const unitPrice = centsToEuro(line.priceAtPurchase);

    return {
      id: line.id,
      productId: line.product.id,
      productName: line.product.name,
      quantity: line.quantity,
      priceAtPurchase: unitPrice,
      lineTotal: Number((unitPrice * line.quantity).toFixed(2)),
    };
  });

  return {
    id: order.id,
    accountId: order.accountId,
    status: order.status,
    lines,
    total: Number(lines.reduce((sum, line) => sum + line.lineTotal, 0).toFixed(2)),
    totalItems: lines.reduce((sum, line) => sum + line.quantity, 0),
    createdAt: order.createdAt,
  };
};
