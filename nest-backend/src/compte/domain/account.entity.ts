import { Password } from "../../auth/domain/value-objects/password.value-object";
import { Email } from "./value-object/email.value-object";
import { Phone } from "./value-object/phone.value-object";
import { Role, Roles } from "./value-object/role.value-object";

interface AccountProps {
    name: string;
    firstName: string;
    email: string;
    password: Password;
    role: Roles;
    phone?: string;
}

export class Account {

    private constructor(
        private readonly name: string,
        private readonly firstName: string,
        private readonly email: Email,
        private readonly password: Password,
        private readonly role: Role,
        private readonly phone?: Phone
    ) {}

    static create({
        name,
        firstName,
        email,
        password,
        role,
        phone
    }: AccountProps): Account {
        return new Account(
            this.normalizeName(name),
            this.normalizeFirstName(firstName),
            Email.create(email),
            password,
            Role.assign(role),
            phone ? Phone.create(phone) : undefined
        );
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
    getPhone(): Phone | undefined { return this.phone }
    getRole(): Role { return this.role }
    getPassword(): Password { return this.password }

}