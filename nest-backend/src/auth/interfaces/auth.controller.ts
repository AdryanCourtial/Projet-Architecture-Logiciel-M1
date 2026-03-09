import { Body, Controller, Post } from "@nestjs/common";
import { RequestRegisterDto } from "./requestDto/register.dto";
import { RegisterUseCase } from "../application/use-cases/register/register.use-case";

@Controller("auth")
export class AuthController {

    constructor(
        private readonly loginUseCase: RegisterUseCase
    ) {}

    @Post("register")
    async register(@Body() requestRegisterDto: RequestRegisterDto) {
        this.loginUseCase.execute({
            email: requestRegisterDto.email,
            password: requestRegisterDto.password,
            confirmPassword: requestRegisterDto.confirmPassword,
            firstname: requestRegisterDto.firstname,
            name: requestRegisterDto.name
        })
    }
}