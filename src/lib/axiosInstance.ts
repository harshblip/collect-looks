import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { BASE_URL } from "./constants";

export const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json"
    }
})

axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem("access_token")
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
)

axiosInstance.interceptors.response.use(
    (response): AxiosResponse<any, any> => {
        return response.data;
    },
    (error: AxiosError<{ message: string }>) => {
        const message = error.response?.data?.message || "An unexpected error occurred";
        const customError = new Error(message);

        if (error.stack) {
            customError.stack = error.stack;
        }

        return Promise.reject(customError);
    }
)