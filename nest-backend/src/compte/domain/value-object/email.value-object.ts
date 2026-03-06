export class Email {

    private readonly email: string;

    constructor(email: string) {
        this.email = email;
    }

    static create(email: string): Email {
        if (!this.validateEmail(email)) {
            throw new Error("Invalid email");
        }

        email = this.normalizeEmail(email);

        return new Email(email);
    }


    static validateEmail(email: string): boolean {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    static normalizeEmail(email: string): string {
        return email.trim().toLowerCase();
    }

}