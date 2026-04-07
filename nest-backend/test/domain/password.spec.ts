import { Password } from "src/auth/domain/value-objects/password.value-object";

describe('Password Value Object', () => {
    
    describe('create', () => {
        it('should create a valid password', () => {
            const password = Password.create('ValidPassword123');
            expect(password).toBeDefined();
            expect(password.getValue()).toBe('ValidPassword123');
        });

        it('should throw error if password is less than 8 characters', () => {
            expect(() => Password.create('Short1')).toThrow('Invalid password');
        });

        it('should throw error if password is empty', () => {
            expect(() => Password.create('')).toThrow('Invalid password');
        });

        it('should throw error if password is only spaces', () => {
            expect(() => Password.create('       ')).toThrow('Invalid password');
        });
    });

    describe('validatePassword', () => {
        it('should return true for valid passwords', () => {
            expect(Password['validatePassword']('ValidPassword123')).toBe(true);
            expect(Password['validatePassword']('MySecureP@ssw0rd')).toBe(true);
            expect(Password['validatePassword']('12345678')).toBe(true);
        });

        it('should return false for passwords shorter than 8 characters', () => {
            expect(Password['validatePassword']('Short1')).toBe(false);
            expect(Password['validatePassword']('Pass')).toBe(false);
        });

        it('should return false for empty password', () => {
            expect(Password['validatePassword']('')).toBe(false);
        });

        it('should return false for password with only spaces', () => {
            expect(Password['validatePassword']('       ')).toBe(false);
        });
    });

    describe('getValue', () => {
        it('should return the password value', () => {
            const passwordValue = 'SecurePassword123';
            const password = Password.create(passwordValue);
            expect(password.getValue()).toBe(passwordValue);
        });
    });
});
