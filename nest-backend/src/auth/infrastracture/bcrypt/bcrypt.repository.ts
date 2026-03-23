import bcrypt from 'bcrypt';
import { HashPasswordServiceInterface } from "../../application/repository/hash-password.repository";

export class BcryptRepository implements HashPasswordServiceInterface {

    async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, 10);
    }

    async comparePassword(password: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(password, hash);
    }

}