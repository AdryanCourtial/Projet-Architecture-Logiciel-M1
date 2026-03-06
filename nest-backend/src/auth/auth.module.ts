import { Module } from "@nestjs/common";
import { AuthController } from "./interfaces/auth.controller";
import { LoginUseCase } from "./application/use-cases/login.use-case";
import { RegisterUseCase } from "./application/use-cases/register.use-case";

@Module({
    controllers: [AuthController],
    providers: [
        LoginUseCase,
        RegisterUseCase,
    ],
})
export class AuthModule {

}