import { Account } from "src/compte/domain/account.entity";
import { Password } from "src/auth/domain/value-objects/password.value-object";
import { Roles } from "src/compte/domain/value-object/role.value-object";

describe('Account Aggregate', () => {

    describe('create', () => {
        it('should create a new account with valid data', () => {
            const password = Password.create('SecurePassword123');
            const account = Account.create({
                name: 'Dupont',
                firstName: 'Jean',
                email: 'jean@example.com',
                password,
                role: 'ADMIN',
                phone: '0612345678'
            });

            expect(account).toBeDefined();
            expect(account.getName()).toBe('dupont');
            expect(account.getFirstName()).toBe('jean');
            expect(account.getEmail().getValue()).toBe('jean@example.com');
            expect(account.getRole().getValue()).toBe('ADMIN');
            expect(account.getPhone()?.getValue()).toBe('0612345678');
        });

        it('should normalize name to lowercase and trim', () => {
            const password = Password.create('SecurePassword123');
            const account = Account.create({
                name: '  MARTIN  ',
                firstName: '  PAUL  ',
                email: 'paul@example.com',
                password,
                role: 'CLIENT'
            });

            expect(account.getName()).toBe('martin');
            expect(account.getFirstName()).toBe('paul');
        });

        it('should create account without phone', () => {
            const password = Password.create('SecurePassword123');
            const account = Account.create({
                name: 'Dupont',
                firstName: 'Jean',
                email: 'jean@example.com',
                password,
                role: 'CLIENT'
            });

            expect(account.getPhone()).toBeUndefined();
        });

        it('should set id to null for new account', () => {
            const password = Password.create('SecurePassword123');
            const account = Account.create({
                name: 'Dupont',
                firstName: 'Jean',
                email: 'jean@example.com',
                password,
                role: 'CLIENT'
            });

            expect(account.getId()).toBeNull();
        });

        it('should throw error if email is invalid', () => {
            const password = Password.create('SecurePassword123');
            expect(() => Account.create({
                name: 'Dupont',
                firstName: 'Jean',
                email: 'invalid-email',
                password,
                role: "CLIENT"
            })).toThrow();
        });

        it('should throw error if phone format is invalid', () => {
            const password = Password.create('SecurePassword123');
            expect(() => Account.create({
                name: 'Dupont',
                firstName: 'Jean',
                email: 'jean@example.com',
                password,
                role: 'CLIENT',
                phone: '123'
            })).toThrow();
        });
    });

    describe('reconstitute', () => {
        it('should reconstitute account from persistence', () => {
            const password = Password.create('SecurePassword123');
            const account = Account.reconstitute({
                id: 1,
                name: 'dupont',
                firstName: 'jean',
                email: 'jean@example.com',
                password,
                role: 'CLIENT',
                phone: '0612345678'
            });

            expect(account.getId()).toBe(1);
            expect(account.getName()).toBe('dupont');
            expect(account.getFirstName()).toBe('jean');
            expect(account.getPhone()?.getValue()).toBe('0612345678');
        });

        it('should set id correctly when reconstituting', () => {
            const password = Password.create('SecurePassword123');
            const account = Account.reconstitute({
                id: 42,
                name: 'dupont',
                firstName: 'jean',
                email: 'jean@example.com',
                password,
                role: 'CLIENT'
            });

            expect(account.getId()).toBe(42);
        });
    });

    describe('getters', () => {
        let account: Account;

        beforeEach(() => {
            const password = Password.create('SecurePassword123');
            account = Account.create({
                name: 'Dupont',
                firstName: 'Jean',
                email: 'jean@example.com',
                password,
                role: 'CLIENT',
                phone: '0612345678'
            });
        });

        it('should get email value object', () => {
            const email = account.getEmail();
            expect(email.getValue()).toBe('jean@example.com');
        });

        it('should get name', () => {
            expect(account.getName()).toBe('dupont');
        });

        it('should get firstName', () => {
            expect(account.getFirstName()).toBe('jean');
        });

        it('should get password', () => {
            const password = account.getPassword();
            expect(password.getValue()).toBe('SecurePassword123');
        });

        it('should get phone', () => {
            const phone = account.getPhone();
            expect(phone?.getValue()).toBe('0612345678');
        });
    });
});
