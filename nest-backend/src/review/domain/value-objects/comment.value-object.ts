export class Comment {
    private constructor(
        private readonly title: string,
        private readonly content: string
    ) {}

    static create(title: string, content: string): Comment {
        const cleanTitle = title.trim();
        const cleanContent = content.trim();

        if (cleanTitle.length === 0) {
            throw new Error('Comment title cannot be empty');
        }

        if (cleanTitle.length > 100) {
            throw new Error('Comment title must not exceed 100 characters');
        }

        if (cleanContent.length === 0) {
            throw new Error('Comment content cannot be empty');
        }

        if (cleanContent.length > 1000) {
            throw new Error('Comment content must not exceed 1000 characters');
        }

        return new Comment(cleanTitle, cleanContent);
    }

    getTitle(): string {
        return this.title;
    }

    getContent(): string {
        return this.content;
    }

    getLength(): number {
        return this.content.length;
    }

    equals(other: Comment): boolean {
        return this.title === other.title && this.content === other.content;
    }

    toString(): string {
        return `${this.title}: ${this.content}`;
    }
}
