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
        const regex = /^[0-9+\-\s()]+$/;
        return phone.length >= 10 && regex.test(phone);
    }

    static normalizePhone(phone: string): string {
        return phone.trim().replace(/\s+/g, '');
    }

}