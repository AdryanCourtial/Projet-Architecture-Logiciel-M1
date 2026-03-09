import { Module } from "@nestjs/common";
import { AuthController } from "./interfaces/auth.controller";
import { LoginUseCase } from "./application/use-cases/login/login.use-case";
import { RegisterUseCase } from "./application/use-cases/register/register.use-case";
import { HashPasswordService } from "./application/services/hash-password.service";
import { AuthRepositoryInterface } from "./domain/auth.repository";
import { PrismaAuthRepository } from "./infrastracture/db/prisma-auth.repository";
import { BcryptRepository } from "./infrastracture/bcrypt/bcrypt.repository";
import { HashPasswordServiceInterface } from "./application/repository/hash-password.repository";

@Module({
    controllers: [AuthController],
    providers: [
    RegisterUseCase,
    {
        provide: AuthRepositoryInterface,
        useClass: PrismaAuthRepository,
    },
    {
        provide: HashPasswordServiceInterface,
        useClass: BcryptRepository,
    },
    LoginUseCase,
    RegisterUseCase,
    HashPasswordService,

    ],
    exports: [RegisterUseCase],

})
export class AuthModule {

}