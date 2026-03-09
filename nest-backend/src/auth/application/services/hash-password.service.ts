import { Injectable } from "@nestjs/common";
import { HashPasswordServiceInterface } from "../repository/hash-password.repository";

@Injectable()
export class HashPasswordService {
    constructor(
        private readonly hashPasswordService: HashPasswordServiceInterface
    ) { }

    async hashPassword(password: string): Promise<string> {
        return this.hashPasswordService.hashPassword(password);
    }

    async comparePassword(password: string, hash: string): Promise<boolean> {
        return this.hashPasswordService.comparePassword(password, hash);
    }

}