import { apiClient } from "@/lib/apiClient";
import { BASE_URL } from "@/lib/constants";
import { User } from "@/types/userTypes";

export const UserService = {
    loginUser: async (email: string, password: string, checked: boolean): Promise<any> => {
        return apiClient.get<any>(`${BASE_URL}/user/login`, {
            params: {
                email: email,
                password: password,
                checked: checked
            }
        })
    },

    signupUser: async (username: string, email: string, password: string): Promise<any> => {
        const signup = await apiClient.post<any>(`${BASE_URL}/user/signup`, {
            username,
            email,
            password
        });

        return signup
    },

    getUserData: async (id: number): Promise<User> => {
        return apiClient.get<User>(`${BASE_URL}/user/getUserData`, {
            params: {
                id: id
            }
        })
    },

    updateUserData: async (username: string, email: string, id: number): Promise<string> => {
        return apiClient.patch<string>(`${BASE_URL}/user/update`, { username, email, id })
    },

    updateLastOpened: async (type: string, fileId: number): Promise<string> => {
        return apiClient.post<string>(`${BASE_URL}/upload/updateLastOpened`, { type, fileId })
    },

    forgotPassword: async (email: string): Promise<string> => {
        return apiClient.post('/api/forgot-password', {
            email
        })
    },

    updatePassword: async(email: string, password: string): Promise<string> => {
        return apiClient.patch(`${BASE_URL}/user/reset-password`, { email, password })
    }
}