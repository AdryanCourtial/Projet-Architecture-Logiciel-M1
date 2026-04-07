import { PrismaService } from "../../../shared/infrastructure/database/prisma.service";
import { AuthRepositoryInterface } from "../../application/repository/auth.repository";
import { Roles } from "../../../compte/domain/value-object/role.value-object";
import { Email } from "../../../compte/domain/value-object/email.value-object";
import { Password } from "src/auth/domain/value-objects/password.value-object";
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { Account } from "src/compte/domain/account.entity";
import { InputPatchUser } from "src/auth/application/use-cases/patchUser/patchUser.input";
import { Phone } from "src/compte/domain/value-object/phone.value-object";
import { DomainException } from "src/shared/domain/exceptions/domain.exception";

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
            }, 
            include: {
                phone: true
            }
        });

        if (!account) {
            throw new DomainException("Account not found");
        }

        return Account.reconstitute({
            id: account.id,
            email: account.email,
            name: account.name,
            firstName: account.firstname,
            password: Password.create(account.password),
            phone: account.phone?.number,
            role: account.role as Roles,
        });
    }

    async patchAuth(userId: number, patchData: InputPatchUser): Promise<Account> {

        const updateData: any = {};
        if (patchData.email) updateData.email = Email.create(patchData.email).getValue();
        if (patchData.firstname) updateData.firstname = patchData.firstname.toLowerCase().trim();
        if (patchData.name) updateData.name = patchData.name.toLowerCase().trim();

        const currentUser = await this.prismaClient.account.findUnique({
            where: { id: userId },
            include: { phone: true },
        });

        if (!currentUser) {
            throw new DomainException("Utilisateur non trouvé");
        }

        if (patchData.email && patchData.email !== currentUser.email) {
            const existingEmail = await this.prismaClient.account.findUnique({
                where: { email: patchData.email },
            });
            if (existingEmail) {
                throw new DomainException("Cet email est déjà utilisé", 409);
            }
        }

        let phone: Phone;

        if (patchData.phone) {
            try {
                phone = Phone.create(patchData.phone);
            } catch (err) {
                throw new DomainException("Le format du téléphone est incorrect");
            }

            if (currentUser.phone && currentUser.phone.number.length > 0) {
                await this.prismaClient.phone.deleteMany({
                    where: { accountId: userId },
                });
            }

            await this.prismaClient.phone.create({
                data: {
                    number: phone.getValue(),
                    accountId: userId,
                },
            });
        }

        const updatedUser = await this.prismaClient.account.update({
            where: { id: userId },
            data: updateData,
            include: { phone: true },
        });

        return Account.reconstitute({
            id: updatedUser.id,
            email: updatedUser.email,
            name: updatedUser.name,
            firstName: updatedUser.firstname,
            password: Password.create(updatedUser.password),
            role: updatedUser.role as Roles,
            phone: updatedUser.phone?.[0]?.number,
        });
    }
}