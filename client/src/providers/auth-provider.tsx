"use client";

import React, { createContext, useContext } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useLoginMutation, useVerifyOtpMutation } from "@/services/mutations";
import { useUserQuery } from "@/services/queries";
import { logout as apiLogout } from "@/services/api";

interface User {
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (
    email: string,
    callbacks?: { onSuccess?: () => void; onError?: (error: any) => void }
  ) => void;
  verifyOtp: (otp: string) => void;
  logout: () => void;
  isLoginPending: boolean;
  isVerifyPending: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  // 1. Check Session on Mount (Automatic via React Query)
  const { data: user, isLoading, isError } = useUserQuery();

  // 2. Mutations
  const loginMutation = useLoginMutation();
  const verifyOtpMutation = useVerifyOtpMutation();

  const login = (
    email: string,
    callbacks?: { onSuccess?: () => void; onError?: (error: any) => void }
  ) => {
    loginMutation.mutate(
      { email },
      {
        onSuccess: () => {
          console.log("OTP Sent");

          if (callbacks?.onSuccess) {
            callbacks.onSuccess();
          }
        },
        onError: (error) => {
          console.error("Login failed", error);
          // 👇 Execute the error callback if it exists
          if (callbacks?.onError) {
            callbacks.onError(error);
          }
        },
      }
    );
  };

  const verifyOtp = (otp: string) => {
    verifyOtpMutation.mutate(
      { otp },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["user"] });
          router.push("/admin/dashboard");
        },
      }
    );
  };

  const logout = async () => {
    try {
      await apiLogout();
      // Clear cache and redirect
      queryClient.setQueryData(["user"], null);
      router.push("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user: isError ? null : user,
        isAuthenticated: !!user,
        isLoading,
        login,
        verifyOtp,
        logout,
        isLoginPending: loginMutation.isPending,
        isVerifyPending: verifyOtpMutation.isPending,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
