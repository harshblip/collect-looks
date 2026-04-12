import { apiClient } from "@/lib/apiClient";
import { BASE_URL, FE_URL } from "@/lib/constants";
import { User } from "@/types/userTypes";

export const UserService = {
  loginUser: async (
    email: string,
    password: string,
    checked: boolean,
  ): Promise<string> => {
    return apiClient.get<string>(`/user/login`, {
      params: {
        email: email,
        password: password,
        checked: checked,
      },
    });
  },

  signupUser: async (
    username: string,
    email: string,
    password: string,
  ): Promise<string> => {
    return apiClient.post<string>(
      `/user/signup`,
      {
        username,
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      },
    );
  },

  getUserData: async (id: number): Promise<User> => {
    return apiClient.get<User>(`/user/getUserData`, {
      params: {
        id: id,
      },
    });
  },

  updateUserData: async (
    username: string,
    email: string,
    id: number,
  ): Promise<string> => {
    return apiClient.patch<string>(`/user/update`, {
      username,
      email,
      id,
    });
  },

  updateLastOpened: async (type: string, fileId: number): Promise<string> => {
    return apiClient.post<string>(`/upload/updateLastOpened`, {
      type,
      fileId,
    });
  },

  forgotPassword: async (email: string): Promise<string> => {
    return apiClient.post(`${FE_URL}/api/forgot-password`, {
      email,
    });
  },

  updatePassword: async (email: string, password: string): Promise<string> => {
    return apiClient.patch(`/user/reset-password`, {
      email,
      password,
    });
  },
};
