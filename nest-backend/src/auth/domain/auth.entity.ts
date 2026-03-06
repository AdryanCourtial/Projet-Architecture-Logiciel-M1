import { Password } from "./value-objects/password.value-object";

export class Auth {
    readonly email: string;
    readonly password: Password;
    readonly confirmPassword: Password;

    constructor(
        email: string,
        password: string,
        confirmPassword: string
    ) {

        if (!this.checkPasswordMatch(password, confirmPassword)) {
            throw new Error("Passwords do not match");
        }

        this.email = email;
        this.password = Password.create(password);
        this.confirmPassword = Password.create(confirmPassword);
    }

    checkPasswordMatch(password: string, confirmPassword: string): boolean {
        return password === confirmPassword;
    }

}