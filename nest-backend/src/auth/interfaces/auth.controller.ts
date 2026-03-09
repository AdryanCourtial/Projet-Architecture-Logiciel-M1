import { Body, Controller, Post } from "@nestjs/common";
import { RequestRegisterDto } from "./requestDto/register.dto";
import { RegisterUseCase } from "../application/use-cases/register/register.use-case";
import { ResponseRegisterDto } from "./responseDto/register.dto";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("auth")
@Controller("auth")
export class AuthController {

    constructor(
        private readonly loginUseCase: RegisterUseCase
    ) {}

    @ApiOperation({ summary: "Register a new user" })
    @ApiBody({ type: RequestRegisterDto })
    @ApiResponse({ status: 201, description: "The user has been successfully registered.", type: ResponseRegisterDto })
    @Post("register")
    async register(@Body() requestRegisterDto: RequestRegisterDto): Promise<ResponseRegisterDto> {
        const account = await this.loginUseCase.execute({
            email: requestRegisterDto.email,
            password: requestRegisterDto.password,
            confirmPassword: requestRegisterDto.confirmPassword,
            firstname: requestRegisterDto.firstname,
            name: requestRegisterDto.name
        })

        return {
            email: account.getEmail().getValue(),
            firstname: account.getFirstName(),
            name: account.getName(),
            role: account.getRole().getValue(),
            phone: account.getPhone() ?? undefined
        };
    }
}