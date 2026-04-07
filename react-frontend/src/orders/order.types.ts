export type OrderAddressPayload = {
  street: string;
  city: string;
  postalCode: string;
  country: string;
};

export type CreateOrderPayload = {
  deliveryAddress: OrderAddressPayload;
  billingAddress: OrderAddressPayload;
};

export type OrderApi = {
  accountId: number;
  id: number;
  status: string;
  totalPrice: number;
  totalItems: number;
  deliveryAddress: OrderAddressPayload;
  billingAddress: OrderAddressPayload;
  createdAt: string;
};

export type Order = {
  accountId: number;
  id: number;
  status: string;
  totalPrice: number;
  totalItems: number;
  deliveryAddress: OrderAddressPayload;
  billingAddress: OrderAddressPayload;
  createdAt: string;
};

export type OrderCurrencyApi = {
  code: string;
};

export type OrderPriceApi = {
  amount: number;
  currency: OrderCurrencyApi;
};

export type OrderLineProductApi = {
  id: number;
  name: string;
  description: string;
  price: OrderPriceApi;
  stock: number;
};

export type UserOrderLineApi = {
  id: number;
  product: OrderLineProductApi;
  quantity: number;
  priceAtPurchase: number;
};

export type OrderAddressApi = {
  id: number;
  accountId: number;
  street: string;
  city: string;
  postalCode: string;
  country: string;
  createdAt: string;
};

export type UserOrderApi = {
  id: number;
  accountId: number;
  lines: UserOrderLineApi[];
  status: string;
  deliveryAddress: OrderAddressApi;
  billingAddress: OrderAddressApi;
  createdAt: string;
};

export type UserOrderLine = {
  id: number;
  productId: number;
  productName: string;
  quantity: number;
  priceAtPurchase: number;
  lineTotal: number;
};

export type UserOrder = {
  id: number;
  accountId: number;
  status: string;
  lines: UserOrderLine[];
  total: number;
  totalItems: number;
  createdAt: string;
};
