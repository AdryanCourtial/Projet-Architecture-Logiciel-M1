import { Password } from "../../auth/domain/value-objects/password.value-object";
import { Email } from "./value-object/email.value-object";
import { Phone } from "./value-object/phone.value-object";
import { Role, Roles } from "./value-object/role.value-object";

interface CreateAccountProps {
    name: string;
    firstName: string;
    email: string;
    password: Password;
    role: Roles;
    phone?: string;
}

interface ReconstituteAccountProps {
    id: number;
    name: string;
    firstName: string;
    email: string;
    password: Password;
    role: Roles;
    phone?: string;
}

export class Account {
    private constructor(
        private readonly id: number | null,
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
        phone,
    }: CreateAccountProps): Account {
        return new Account(
            null,
            this.normalizeName(name),
            this.normalizeFirstName(firstName),
            Email.create(email),
            password,
            Role.assign(role),
            phone ? Phone.create(phone) : undefined
        );
    }

    static reconstitute({
        id,
        name,
        firstName,
        email,
        password,
        role,
        phone,
    }: ReconstituteAccountProps): Account {
        return new Account(
            id,
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

    static normalizeFirstName(firstName: string): string {
        return firstName.trim().toLowerCase();
    }

    getId(): number | null {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getFirstName(): string {
        return this.firstName;
    }

    getEmail(): Email {
        return this.email;
    }

    getPhone(): Phone | undefined {
        return this.phone;
    }

    getRole(): Role {
        return this.role;
    }

    getPassword(): Password {
        return this.password;
    }
}