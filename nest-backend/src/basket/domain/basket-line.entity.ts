import { Product } from 'src/product/domain/product.agregate';

export class BasketLine {
  private constructor(
    private readonly id: number | null,
    private readonly product: Product,
    private readonly quantity: number
  ) {}

  static create(product: Product, quantity: number): BasketLine {
    if (quantity <= 0) {
      throw new Error('Quantity must be greater than 0');
    }
    if (!product.getId()) {
      throw new Error('Product must have an ID');
    }
    return new BasketLine(null, product, quantity);
  }

  static reconstitute(
    id: number,
    product: Product,
    quantity: number
  ): BasketLine {
    return new BasketLine(id, product, quantity);
  }

  getId(): number | null {
    return this.id;
  }

  getProduct(): Product {
    return this.product;
  }

  getQuantity(): number {
    return this.quantity;
  }

  getTotalPrice(): number {
    return this.product.getPrice().getAmount() * this.quantity;
  }

  updateQuantity(quantity: number): BasketLine {
    if (quantity <= 0) {
      throw new Error('Quantity must be greater than 0');
    }
    return new BasketLine(this.id, this.product, quantity);
  }
}
