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

    static validatePassword(password: string): boolean {
        return password.length >= 8;
    }

    getValue(): string { return this.password }
}