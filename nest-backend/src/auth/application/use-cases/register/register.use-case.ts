import { Injectable } from "@nestjs/common";
import { RegisterInput } from "./register.input";
import { Account } from "../../../../compte/domain/account.entity";
import { AuthRepositoryInterface } from "src/auth/domain/auth.repository";
import { HashPasswordServiceInterface } from "../../repository/hash-password.repository";
import { Password } from "src/auth/domain/value-objects/password.value-object";

@Injectable()
export class RegisterUseCase {
    constructor(
        private authRepository: AuthRepositoryInterface,
        private hashPasswordService: HashPasswordServiceInterface
    ) {
        
    }

    async execute(input: RegisterInput): Promise<Account> {

        // Récupéré les données d'inscrption de l'utilisateur
        const { email, password, confirmPassword, name, firstname } = input;

        // Vérifier si le mot de passe conincide avec la confirmation
        if (password !== confirmPassword) {
            throw new Error("Password and confirm password do not match");
        }

        // Hash du mot de passe
        const hashedPassword = await this.hashPasswordService.hashPassword(password);

        const pass = Password.create(hashedPassword);


        // Créer un nouvel utilisateur
        const account = Account.create({
            email,
            password: pass,
            name,
            firstName: firstname,
            role: "CLIENT",
        })

        // Enregistre le nouvel utilisateur dans la base de données
        const save = this.authRepository.save(account)

        // Retourne une réponse appropriée (succès ou échec)
        return save;
    
    }



}