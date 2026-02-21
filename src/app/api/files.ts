import { Files, InfoData } from "@/types/mediaTypes";
import { BASE_URL } from "@/lib/constants";
import axios from "axios";
import { apiClient } from "@/lib/apiClient";

export const FileService = {
  getAll: async (user_id: number, page: number): Promise<Files[]> => {
    return apiClient.get<Files[]>("/upload/getAllFiles", {
      params: { user_id, page },
    });
  },

  uploadFile: async (
    files: File[],
    accessToken: string,
    username: string,
    userId: number,
    setProgress: React.Dispatch<React.SetStateAction<number>>,
  ): Promise<string> => {
    const formData = new FormData();
    files.forEach((file) => formData.append("file", file));
    formData.append("username", username);
    formData.append("userId", userId.toString());
    console.log(formData);
    return apiClient.post<string>(`${BASE_URL}/upload`, formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent) => {
        const total = progressEvent.total ?? 1;
        const percent = Math.round((progressEvent.loaded * 100) / total);
        setProgress(percent)
      },
    });
  },

  starFile: async (userId: number, id: number): Promise<string> => {
    return apiClient.post<string>(`${BASE_URL}/upload/starFile`, {
      userId,
      id,
    });
  },

  getStarFile: async (userId: number): Promise<Files[]> => {
    return apiClient.get<Files[]>(`${BASE_URL}/upload/getStars`, {
      params: {
        userId,
      },
    });
  },

  deleteFiles: async (
    id: number,
    username: string,
    files: string[],
  ): Promise<string> => {
    return apiClient.delete<string>(`${BASE_URL}/upload/deleteMedia`, {
      params: {
        username,
        id,
        files,
      },
    });
  },

  getFileInfo: async (user_id: number, id: number): Promise<InfoData> => {
    return apiClient.get<InfoData>(`${BASE_URL}/upload/getFileInfo`, {
      params: {
        user_id,
        id,
      },
    });
  },

  setFileLock: async (password: string, fileId: number): Promise<string> => {
    return apiClient.post<string>(`${BASE_URL}/upload/lockfile`, {
      password,
      fileId,
    });
  },

  unlockFile: async (fileId: number): Promise<string> => {
    return apiClient.post<string>(`${BASE_URL}/upload/unlockfile`, {
      fileId,
    });
  },

  getLastSeen: async (userId: number): Promise<Files[]> => {
    return apiClient.get<Files[]>(`${BASE_URL}/upload/getRecentlyOpened`, {
      params: {
        userId: userId,
      },
    });
  },

  trashMedia: async (files: any): Promise<string> => {
    return apiClient.post<string>(`${BASE_URL}/upload/trashMedia`, {
      files,
    });
  },

  getTrashedFiles: async (userId: number): Promise<Files[]> => {
    return apiClient.get(`${BASE_URL}/upload/getTrashedFiles`, {
      params: {
        userId: userId,
      },
    });
  },

  enableAutoDelete: async (
    checked: boolean,
    userId: number,
  ): Promise<boolean> => {
    return apiClient.post<boolean>(`${BASE_URL}/upload/enableAutoDelete`, {
      checked,
      userId,
    });
  },
};
