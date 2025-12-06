import { AxiosRequestConfig } from 'axios'
import { axiosInstance } from './axiosInstance';

type APIResponse<T> = {
    message: string;
};

export interface ApiError {
    message: string,
    code?: number
}

export const apiClient = {
    get: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
        const response = await axiosInstance.get<APIResponse<T>>(url, config);
        return response.message;
    },

    post: async <T>(url: string, body: any, config?: AxiosRequestConfig): Promise<T> => {
        const response = await axiosInstance.post<APIResponse<T>>(url, body, config);
        return response.message;
    },

    delete: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
        const response = await axiosInstance.delete<APIResponse<T>>(url, config);
        return response.message;
    },

    patch: async <T>(url: string, body: any, config?: AxiosRequestConfig): Promise<T> => {
        const response = await axiosInstance.patch<APIResponse<T>>(url, body, config);
        return response.message;
    },
};