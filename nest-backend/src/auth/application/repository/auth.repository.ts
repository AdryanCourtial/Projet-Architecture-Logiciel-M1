import { Account } from "../../../compte/domain/account.entity";
import { Email } from "../../../compte/domain/value-object/email.value-object";

export abstract class AuthRepositoryInterface {
    abstract save(compte: Account): Promise<Account>;
    abstract findByEmail(email: Email): Promise<Account>;
}