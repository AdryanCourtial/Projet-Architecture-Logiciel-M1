export interface AuthRepositoryInterface {
    validateUser(email: string, password: string): Promise<string>;
    registerUser(email: string, password: string, role: string): Promise<void>;
}