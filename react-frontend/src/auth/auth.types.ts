export type UserRole = "CLIENT" | "ADMIN";

export type AuthUser = {
  id?: number;
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

export type UpdateUserPayload = {
  email?: string;
  firstname?: string;
  name?: string;
  phone?: string;
};