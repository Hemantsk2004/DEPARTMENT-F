"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { authService } from "../services/auth.service";
import { User } from "../types/user";

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  loading: boolean;

  login: (email: string, password: string) => Promise<void>;

  register: (
    name: string,
    email: string,
    password: string,
    role: string
  ) => Promise<void>;

  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  // Verify existing token
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    const loadUser = async () => {
      try {
        const response = await authService.verifyToken(token);

        console.log("verifyToken response:", response);

        setUser(response.data);
      } catch (error) {
        console.error("Token verification failed:", error);

        localStorage.removeItem("token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  // LOGIN
  const login = async (email: string, password: string) => {
    try {
      const response = await authService.login({
        email,
        password,
      });

      console.log("login response:", response);

      localStorage.setItem("token", response.data.token);

      setUser(response.data.user);

      router.push("/dashboard/courses");
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  // REGISTER
  const register = async (
    name: string,
    email: string,
    password: string,
    role: string
  ) => {
    try {
      await authService.register({
        name,
        email,
        password,
        role,
      });

      alert("Account created successfully! Please login.");

      router.push("/login");
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    }
  };

  // LOGOUT
  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      localStorage.removeItem("token");

      setUser(null);

      router.push("/login");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};