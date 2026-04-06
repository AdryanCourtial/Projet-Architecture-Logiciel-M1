import { Product } from 'src/product/domain/product.agregate';

export class OrderLine {
  private constructor(
    private readonly id: number | null,
    private readonly product: Product,
    private readonly quantity: number,
    private readonly priceAtPurchase: number
  ) {}

  static create(product: Product, quantity: number): OrderLine {
    if (quantity <= 0) {
      throw new Error('Quantity must be greater than 0');
    }
    if (!product.getId()) {
      throw new Error('Product must have an ID');
    }

    return new OrderLine(
      null,
      product,
      quantity,
      product.getPrice().getAmount()
    );
  }

  static reconstitute(
    id: number,
    product: Product,
    quantity: number,
    priceAtPurchase: number
  ): OrderLine {
    return new OrderLine(id, product, quantity, priceAtPurchase);
  }

  getId(): number | null {
    return this.id;
  }

  getProduct(): Product {
    return this.product;
  }

  getProductId(): number {
    return this.product.getId()!;
  }

  getProductName(): string {
    return this.product.getName();
  }

  getQuantity(): number {
    return this.quantity;
  }

  getPriceAtPurchase(): number {
    return this.priceAtPurchase;
  }

  getTotalPrice(): number {
    return this.priceAtPurchase * this.quantity;
  }
}
