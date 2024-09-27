"use client";

import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import * as AuthAPI from "@/services/api/auth";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "@/services/api";
import { UserProps } from "@/types/User";
import { LoginProps, SignupProps } from "@/types/Auth";

interface InitialStateProps {
  user: UserProps | null;
  isLogged: boolean;
}
const token_key = "token";

export interface AuthStoreProps extends InitialStateProps {
  onLogin: (body: LoginProps) => Promise<void>;
  onSignup: (body: SignupProps) => Promise<void>;
  onLogout: () => void;
}

const initialState: InitialStateProps = {
  user: null,
  isLogged: false,
};

export const useAuth = create(
  persist<AuthStoreProps>(
    (set) => ({
      ...initialState,
      onLogin: async ({ email, password }) => {
        try {
          const { user, token } = await AuthAPI.login({
            email,
            password,
          });

          set({ user, isLogged: true });
          Cookies.set(token_key, token, { expires: 1 });
        } catch (error) {
          throw error;
        }
      },
      onSignup: async ({ email, password, password_confirmation }) => {
        try {
          const { user, token } = await AuthAPI.register({
            email,
            password,
            password_confirmation,
          });

          set({ user, isLogged: true });
          Cookies.set(token_key, token, { expires: 1 });
        } catch (error) {
          throw error;
        }
      },
      onLogout: () => {
        set({ user: null, isLogged: false });
        api.defaults.headers.Authorization = "";
        Cookies.remove(token_key);
      },
    }),
    {
      name: "auth",
      partialize: (state) => ({
        ...state,
      }),
    }
  )
);

export const useAuthLogout = () => {
  const onLogout = useAuth.getState().onLogout;
  const router = useRouter();
  return () => {
    onLogout();
    router.push("/");
  };
};
