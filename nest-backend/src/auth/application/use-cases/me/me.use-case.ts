import { Injectable } from "@nestjs/common";
import { MeInput } from "./me.input";
import { Account } from "src/compte/domain/account.entity";
import { Email } from "src/compte/domain/value-object/email.value-object";
import { AuthRepositoryInterface } from "../../repository/auth.repository";
import { HashPasswordServiceInterface } from "../../repository/hash-password.repository";

@Injectable()
export class MeUseCase {

    constructor(
        private authRepository: AuthRepositoryInterface,
    ) {
        
    }

    async execute(input: MeInput): Promise<Account> {
        // Récupere les données de l'input 
        return await this.authRepository.findByEmail(Email.create(input.email));
    }

}