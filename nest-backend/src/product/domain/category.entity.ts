export class Category {
  private constructor(
    private readonly id: number,
    private readonly name: string,
    private readonly description: string
  ) {}

  static create(id: number, name: string, description: string): Category {
    if (!name || name.trim().length === 0) {
      throw new Error('Category name cannot be empty');
    }
    return new Category(id, name.trim(), description);
  }

  getId(): number {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getDescription(): string {
    return this.description;
  }
}
