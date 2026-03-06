import { Email } from "./value-object/email.value-object";
import { Phone } from "./value-object/phone.value-object";
import { Role, Roles } from "./value-object/role.value-object";

export class Account {

    private name: string;
    private firstName: string;
    private email: Email;
    private role: Role;
    private phone?: Phone;

    constructor(
        name: string,
        firstName: string,
        email: string,
        password: string,
        role: Roles,
        phone?: string
    ) {
        this.name = Account.normalizeName(name);
        this.firstName = Account.normalizeFirstName(firstName);
        this.email = Email.create(email);
        this.phone = phone ? Phone.create(phone) : undefined;
        this.role = Role.assign(role);
    }

    static normalizeName(name: string): string {
        return name.trim().toLowerCase();
    }

    static normalizeFirstName(firstName: string) {
        return firstName.trim().toLowerCase()
    }

    getName(): string { return this.name }
    getFirstName(): string { return this.firstName }
    getEmail(): Email { return this.email }

}