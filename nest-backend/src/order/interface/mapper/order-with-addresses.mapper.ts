import { Order } from 'src/order/domain/order.aggregate';
import { Address } from 'src/order/domain/address.entity';
import { AddressResponseDTO } from '../dto/address.dto';

export class OrderDetailResponseDTO {
  id!: number;
  accountId!: number;
  status!: string;
  lines!: {
    id: number;
    productId: number;
    productName: string;
    quantity: number;
    priceAtPurchase: number;
    totalPrice: number;
  }[];
  totalPrice!: number;
  totalItems!: number;
  deliveryAddress!: AddressResponseDTO;
  billingAddress!: AddressResponseDTO;
  createdAt!: Date;
}

export class OrderWithAddressesMapper {
  static toDetailResponse(
    order: Order,
    deliveryAddress: Address,
    billingAddress: Address
  ): OrderDetailResponseDTO {
    return {
      id: order.getId()!,
      accountId: order.getAccountId(),
      status: order.getStatus(),
      lines: order.getLines().map((line) => ({
        id: line.getId()!,
        productId: line.getProductId()!,
        productName: line.getProductName(),
        quantity: line.getQuantity(),
        priceAtPurchase: line.getPriceAtPurchase(),
        totalPrice: line.getTotalPrice(),
      })),
      totalPrice: order.getTotalPrice().getAmount(),
      totalItems: order.getTotalItems(),
      deliveryAddress: {
        id: deliveryAddress.getId()!,
        street: deliveryAddress.getStreet(),
        city: deliveryAddress.getCity(),
        postalCode: deliveryAddress.getPostalCode(),
        country: deliveryAddress.getCountry(),
        createdAt: deliveryAddress.getCreatedAt(),
        fullAddress: deliveryAddress.getFullAddress(),
      },
      billingAddress: {
        id: billingAddress.getId()!,
        street: billingAddress.getStreet(),
        city: billingAddress.getCity(),
        postalCode: billingAddress.getPostalCode(),
        country: billingAddress.getCountry(),
        createdAt: billingAddress.getCreatedAt(),
        fullAddress: billingAddress.getFullAddress(),
      },
      createdAt: order.getCreatedAt(),
    };
  }
}
