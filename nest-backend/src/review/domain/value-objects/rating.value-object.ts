export class Rating {
    private constructor(private readonly value: number) {}

    static create(value: number): Rating {
        if (!Number.isInteger(value)) {
            throw new Error('Rating must be an integer');
        }

        if (value < 1 || value > 5) {
            throw new Error('Rating must be between 1 and 5');
        }

        return new Rating(value);
    }

    getValue(): number {
        return this.value;
    }

    equals(other: Rating): boolean {
        return this.value === other.value;
    }

    isHigherThan(other: Rating): boolean {
        return this.value > other.value;
    }

    isLowerThan(other: Rating): boolean {
        return this.value < other.value;
    }

    toString(): string {
        return `${this.value}/5`;
    }
}
