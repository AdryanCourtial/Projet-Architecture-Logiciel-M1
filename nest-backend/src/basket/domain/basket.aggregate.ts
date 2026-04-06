import { BasketLine } from './basket-line.entity';

export class Basket {
    private constructor(
        private readonly id: number,
        private readonly accountId: number,
        private readonly lines: BasketLine[] = []
    ) {}

    static create(id: number, accountId: number): Basket {
        return new Basket(id, accountId, []);
    }

    static reconstitute(
        id: number,
        accountId: number,
        lines: BasketLine[]
    ): Basket {
        return new Basket(id, accountId, lines);
    }

  
  addLine(line: BasketLine): Basket {
        const existingLine = this.lines.find(
            l => l.getProduct().getId() === line.getProduct().getId()
        );

        if (existingLine) {
            const updatedLine = existingLine.updateQuantity(
                existingLine.getQuantity() + line.getQuantity()
            );
            const filteredLines = this.lines.filter(
                l => l.getProduct().getId() !== line.getProduct().getId()
            );
            return new Basket(this.id, this.accountId, [...filteredLines, updatedLine]);
        }

        return new Basket(this.id, this.accountId, [...this.lines, line]);
    }

    removeLine(productId: number): Basket {
        const filteredLines = this.lines.filter(
            l => l.getProduct().getId() !== productId
        );
        return new Basket(this.id, this.accountId, filteredLines);
    }

  updateLineQuantity(productId: number, quantity: number): Basket {
        const line = this.lines.find(l => l.getProduct().getId() === productId);

        if (!line) {
            throw new Error('Product not found in basket');
        }

        const updatedLine = line.updateQuantity(quantity);
        
        const filteredLines = this.lines.filter(
            l => l.getProduct().getId() !== productId
        );

        return new Basket(this.id, this.accountId, [...filteredLines, updatedLine]);
    }
    
    getId(): number {
        return this.id;
    }
    
    getAccountId(): number {
        return this.accountId;
    }
    
    getLines(): BasketLine[] {
        return this.lines;
    }

    clear(): Basket {
        return new Basket(this.id, this.accountId, []);
    }
    
    getTotalPrice(): number {
        return this.lines.reduce((total, line) => total + line.getTotalPrice(), 0);
    }
    
    getTotalItems(): number {
        return this.lines.reduce((total, line) => total + line.getQuantity(), 0);
    }
    
    isEmpty(): boolean {
        return this.lines.length === 0;
    }
}
