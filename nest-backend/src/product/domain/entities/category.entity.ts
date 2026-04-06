interface CreateCategoryProps {
    name: string;
}

interface ReconstituteCategoryProps {
    id: number;
    name: string;
}

export class Category {
    private constructor(
        private readonly id: number | null,
        private readonly name: string
    ) {}

    static create({
        name,
    }: CreateCategoryProps): Category {
        return new Category(
            null,
            this.normalizeName(name)
        );
    }

    static reconstitute({
        id,
        name,
    }: ReconstituteCategoryProps): Category {
        return new Category(
            id,
            this.normalizeName(name)
        );
    }

    static normalizeName(name: string): string {
        return name.trim().toLowerCase();
    }
}