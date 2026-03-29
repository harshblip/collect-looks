import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { BASE_URL } from "./constants";
import { normalizeResponse } from "@/app/utils/useful";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("access_token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    } else if (!config.headers["Content-Type"]) {
      config.headers["Content-Type"] = "application/json";
    }
    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response): AxiosResponse<any, any> => {
    return normalizeResponse(response.data);
  },
  (error: AxiosError<{ message: string }>) => {
    console.error("error -> ", error.response?.status);
    if (error.response?.status === 401) {
      localStorage.removeItem("access_token");
    }
    const message =
      error.response?.data?.message || "An unexpected error occurred";
    const customError = new Error(message);

    if (error.stack) {
      customError.stack = error.stack;
    }

    return Promise.reject(customError);
  },
);
