import { Injectable, BadRequestException, NotFoundException } from "@nestjs/common";
import { AuthRepositoryInterface } from "../../repository/auth.repository";
import { InputPatchUser } from "./patchUser.input";
import { Account } from "src/compte/domain/account.entity";

@Injectable()
export class PatchUserUseCase {
    constructor(
        private readonly authRepository: AuthRepositoryInterface,
    ) {}

    async execute(userId: number, patchData: InputPatchUser): Promise<Account> {

        const user = await this.authRepository.patchAuth(userId, patchData)

        return user
    }
}