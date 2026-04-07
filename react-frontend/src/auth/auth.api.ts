import axios from "axios";
import { axiosClient } from "../shared/api/axiosClient";
import type {
  AuthUser,
  LoginPayload,
  RegisterPayload,
  UpdateUserPayload,
} from "./auth.types";

type MessageResponse = {
  message: string;
};

export const getApiErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const responseMessage = error.response?.data?.message;

    if (Array.isArray(responseMessage)) {
      return responseMessage.join(" ");
    }

    if (typeof responseMessage === "string" && responseMessage.trim()) {
      return responseMessage;
    }

    if (typeof error.response?.statusText === "string" && error.response.statusText.trim()) {
      return error.response.statusText;
    }
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return "Une erreur est survenue.";
};

export const loginRequest = async (
  payload: LoginPayload,
): Promise<MessageResponse> => {
  const response = await axiosClient.post<MessageResponse>("/auth/login", payload);
  return response.data;
};

export const registerRequest = async (
  payload: RegisterPayload,
): Promise<MessageResponse> => {
  const response = await axiosClient.post<MessageResponse>("/auth/register", payload);
  return response.data;
};

export const fetchCurrentUser = async (): Promise<AuthUser> => {
  const response = await axiosClient.get<AuthUser>("/auth/me");
  return response.data;
};

export const updateCurrentUser = async (
  payload: UpdateUserPayload,
): Promise<AuthUser> => {
  const response = await axiosClient.patch<AuthUser>("/auth", payload);
  return response.data;
};

export const logoutRequest = async (): Promise<void> => {
  await axiosClient.get("/auth/logout");
};