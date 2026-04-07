import { Module } from "@nestjs/common";
import { AuthController } from "./interfaces/auth.controller";
import { LoginUseCase } from "./application/use-cases/login/login.use-case";
import { RegisterUseCase } from "./application/use-cases/register/register.use-case";
import { HashPasswordService } from "./application/services/hash-password.service";
import { AuthRepositoryInterface } from "./application/repository/auth.repository";
import { PrismaAuthRepository } from "./infrastracture/db/prisma-auth.repository";
import { BcryptRepository } from "./infrastracture/bcrypt/bcrypt.repository";
import { HashPasswordServiceInterface } from "./application/repository/hash-password.repository";
import { MeUseCase } from "./application/use-cases/me/me.use-case";
import { PatchUserUseCase } from "./application/use-cases/patchUser/patchUser.use-case";
import { PrismaModule } from "src/shared/infrastructure/database/prisma.module";

@Module({
    imports: [PrismaModule],
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
    MeUseCase,
    PatchUserUseCase,
    HashPasswordService,

    ],
    exports: [RegisterUseCase],

})
export class AuthModule {

}