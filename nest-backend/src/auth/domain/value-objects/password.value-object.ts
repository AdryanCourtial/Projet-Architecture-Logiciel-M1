import * as bcript from "bcrypt";

export class Password {
    private readonly password: string;

    constructor(
        password: string
    ) {
        this.password = password;
    }

    static create(password: string): Password {
        if (!this.validatePassword(password)) {
            throw new Error("Invalid password");
        }
        return new Password(password);
    }

    static hashPassword(password: string): string {
        const hash = bcript.hash(password, 10);
        return hash;
    }

    static comparePassword(password: string, hash: string): Promise<boolean> {
        return bcript.compare(password, hash);
    }

    static validatePassword(password: string): boolean {
        return password.length >= 8;
    }
}