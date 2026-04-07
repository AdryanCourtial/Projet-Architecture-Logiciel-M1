export class Phone {

    private readonly phone: string;

    constructor(phone: string) {
        this.phone = phone;
    }

    static create(phone: string): Phone {
        if (!this.validatePhone(phone)) {
            throw new Error("Invalid phone number");
        }

        phone = this.normalizePhone(phone);

        return new Phone(phone);
    }


    static validatePhone(phone: string): boolean {
        const normalized = phone.trim().replace(/\s+/g, '');
        const frenchRegex = /^(0[1-9]|(\+33)[1-9])[0-9]{8}$/;
        return frenchRegex.test(normalized);
    }

    static normalizePhone(phone: string): string {
        return phone.trim().replace(/\s+/g, '');
    }

    getValue(): string {
        return this.phone;
    }

}