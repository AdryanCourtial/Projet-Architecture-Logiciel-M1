import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { RequestRegisterDto } from "./requestDto/register.dto";
import { RegisterUseCase } from "../application/use-cases/register/register.use-case";
import { ResponseRegisterDto } from "./responseDto/register.dto";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { RequestLoginDto } from "./requestDto/login.dto";
import { ResponseLoginDto } from "./responseDto/login.dto";
import { LoginUseCase } from "../application/use-cases/login/login.use-case";
import { MeUseCase } from "../application/use-cases/me/me.use-case";
import { SessionAuthGuard } from "./guards/session.guard";
import { Account } from "src/compte/domain/account.entity";
import { ResponseMeDto } from "./responseDto/me.dto";

@ApiTags("auth")
@Controller("auth")
export class AuthController {

    constructor(
        private readonly registerUseCase: RegisterUseCase,
        private readonly loginUseCase: LoginUseCase,
        private readonly meUseCase: MeUseCase
    ) {}

    @ApiOperation({ summary: "login a user" })
    @ApiBody({ type: RequestLoginDto })
    @ApiResponse({ status: 201, description: "The user has been successfully login.", type: ResponseLoginDto })
    @Post("login")
    async login(@Body() requestLoginDto: RequestLoginDto, @Req() req): Promise<ResponseLoginDto> {
        const account = await this.loginUseCase.execute({
            email: requestLoginDto.email,
            password: requestLoginDto.password,
        })

        console.log('session =', req.session);
        req.session.userId = account.id;
        req.session.email = account.email.getValue();

        return { message: 'Connecté' };

    }

    @ApiOperation({ summary: "Register a new user" })
    @ApiBody({ type: RequestRegisterDto })
    @ApiResponse({ status: 201, description: "The user has been successfully registered.", type: ResponseRegisterDto })
    @Post("register")
    async register(@Body() requestRegisterDto: RequestRegisterDto): Promise<ResponseRegisterDto> {
        const account = await this.registerUseCase.execute({
            email: requestRegisterDto.email,
            password: requestRegisterDto.password,
            confirmPassword: requestRegisterDto.confirmPassword,
            firstname: requestRegisterDto.firstname,
            name: requestRegisterDto.name
        })

        return {
            message: 'Utilisateur enregistré avec succès'
        };
    }

    @ApiOperation({ summary: "Get user information" })
    @ApiBody({ type: RequestRegisterDto })
    @ApiResponse({ status: 201, description: "The user information has been successfully retrieved.", type: ResponseMeDto })
    @UseGuards(SessionAuthGuard)
    @Get("me")
    async me(@Req() req: any): Promise<ResponseMeDto> {

        const account = await this.meUseCase.execute({
            email: req.session.email,
        })
        
        return {
            email: account.getEmail().getValue(),
            name: account.getName(),
            firstName: account.getFirstName(),
            role: account.getRole().getValue(),
            phone: account.getPhone() ? account.getPhone()!.getValue() : undefined
        };

    }


}