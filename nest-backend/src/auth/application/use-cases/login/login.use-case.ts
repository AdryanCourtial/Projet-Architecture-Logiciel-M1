import { Injectable } from "@nestjs/common";
import { LoginInput } from "./login.input";
import { Account } from "src/compte/domain/account.entity";
import { Password } from "src/auth/domain/value-objects/password.value-object";
import { Email } from "src/compte/domain/value-object/email.value-object";
import { AuthRepositoryInterface } from "../../repository/auth.repository";
import { HashPasswordServiceInterface } from "../../repository/hash-password.repository";

@Injectable()
export class LoginUseCase {

    constructor(
        private authRepository: AuthRepositoryInterface,
        private hashPasswordService: HashPasswordServiceInterface
    ) {
        
    }

    async execute(input: LoginInput): Promise<{ id: number, email: Email }> {
        // Récupere les données de l'input 
        const { email, password } = input;

        // Vérifier les données de l'input (email et mot de passe)
        const newPass = Password.create(password)
        const newEmail = Email.create(email)

        // Récupérer l'utilisateur correspondant à l'email
        const account = await this.authRepository.findByEmail(newEmail);


        // Vérif du hash des mots de passe
        const comparePassword = await this.hashPasswordService.comparePassword(newPass.getValue(), account.getPassword().getValue());

        if (!comparePassword) {
            throw new Error("Invalid credentials");
        }

        // Return de l'utilisateur authentifié
         return {
            id: account.getId()!,
            email: account.getEmail()
         };
    }

}