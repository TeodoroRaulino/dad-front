import api from "@/services/api";
import { LoginProps, SignupProps } from "@/types/Auth";
import { UserProps } from "@/types/User";

const path = {
  login: "/login",
  register: "/signup",
};

export const login = async (
  data: LoginProps
): Promise<{ user: UserProps; token: string }> => {
  try {
    const response = await api.post(path.login, {
      user: data,
    });

    const { user, token } = response.data.status.data;

    return {
      user: user as UserProps,
      token: token as string,
    };
  } catch (error) {
    throw error;
  }
};

export const register = async (
  data: SignupProps
): Promise<{ user: UserProps; token: string }> => {
  try {
    const response = await api.post(path.register, {
      user: data,
    });

    const response_data = response.data.data;

    return {
      user: response_data.user as UserProps,
      token: response_data.token as string,
    };
  } catch (error) {
    throw error;
  }
};
