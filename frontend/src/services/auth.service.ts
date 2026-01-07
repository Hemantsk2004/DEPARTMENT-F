import { ApiResponse } from "@/types/api";
import axios from "../lib/axios";
import {
  LoginCredentials,
  RegisterData,
  AuthResponse,
  User,
} from "../types/user";

export const authService = {
  // LOGIN
  login: async (
    credentials: LoginCredentials
  ): Promise<ApiResponse<AuthResponse>> => {
    const response = await axios.post("/api/auth/login", credentials);
    return response.data;
  },

  // REGISTER (CORRECT ROUTE)
  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await axios.post("/api/auth/signup", data);
    return response.data;
  },

  // UPDATE USER
  updateUser: async (
    id: string,
    data: Partial<User>
  ): Promise<ApiResponse<User>> => {
    const response = await axios.put(`/api/users/${id}`, data);
    return response.data;
  },

  // LOGOUT
  logout: async (): Promise<void> => {
    try {
      await axios.post("/api/auth/logout");
    } finally {
      localStorage.removeItem("token");
    }
  },

  // VERIFY TOKEN
  verifyToken: async (token: string): Promise<ApiResponse<User>> => {
    const response = await axios.get("/api/auth/verify", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
};
