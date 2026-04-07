export type UserRole = "CLIENT" | "ADMIN";

export type AuthUser = {
  email: string;
  name: string;
  firstName: string;
  role: UserRole;
  phone?: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  firstname: string;
};