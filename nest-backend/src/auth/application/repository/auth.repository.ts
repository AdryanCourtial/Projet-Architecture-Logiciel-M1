import { Account } from "../../../compte/domain/account.entity";
import { Email } from "../../../compte/domain/value-object/email.value-object";
import { InputPatchUser } from "../use-cases/patchUser/patchUser.input";

export abstract class AuthRepositoryInterface {
    abstract save(compte: Account): Promise<Account>;
    abstract findByEmail(email: Email): Promise<Account>;
    abstract patchAuth(userId: number, account: InputPatchUser): Promise<Account>;
}