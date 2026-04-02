import { PrismaService } from "../../../shared/infrastructure/database/prisma.service";
import { AuthRepositoryInterface } from "../../application/repository/auth.repository";
import { Roles } from "../../../compte/domain/value-object/role.value-object";
import { Email } from "../../../compte/domain/value-object/email.value-object";
import { Password } from "src/auth/domain/value-objects/password.value-object";
import { Injectable } from "@nestjs/common";
import { Account } from "src/compte/domain/account.entity";

@Injectable()
export class PrismaAuthRepository implements AuthRepositoryInterface { 
    constructor(
        private prismaClient: PrismaService
    ) {}

    async save(compte: Account): Promise<Account> {
        const account = await this.prismaClient.account.create({
            data: {
                name: compte.getName(),
                firstname: compte.getFirstName(),
                email: compte.getEmail().getValue(),
                password: compte.getPassword().getValue()
            }
        })

        console.log("Account saved in database:", account);

        return Account.create({
            email: account.email,
            name: account.name,
            firstName: account.firstname,
            password: Password.create(account.password),
            role: account.role as Roles,
        })
    }

    async findByEmail(email: Email): Promise<Account> {
        const account = await this.prismaClient.account.findUnique({
            where: {
                email: email.getValue()
            }
        });

        if (!account) {
            throw new Error("Account not found");
        }

        console.log("Account found in database:", account);

        return Account.reconstitute({
            id: account.id,
            email: account.email,
            name: account.name,
            firstName: account.firstname,
            password: Password.create(account.password),
            role: account.role as Roles,
        });
    }
}