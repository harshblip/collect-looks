import { Files, InfoData } from "@/types/mediaTypes";
import { BASE_URL } from "@/lib/constants";
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
    return apiClient.post<string>(`/upload`, formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      onUploadProgress: (progressEvent) => {
        const total = progressEvent.total ?? 1;
        const percent = Math.round((progressEvent.loaded * 100) / total);
        setProgress(percent);
      },
    });
  },

  starFile: async (userId: number, id: number): Promise<string> => {
    return apiClient.post<string>(`/upload/starFile`, {
      userId,
      id,
    });
  },

  getTrashStatus: async (userId: number): Promise<boolean> => {
    return apiClient.get<boolean>(`/upload/getTrashStatus`, {
      params: {
        userId,
      },
    });
  },

  getStarFile: async (userId: number): Promise<Files[]> => {
    return apiClient.get<Files[]>(`/upload/getStars`, {
      params: {
        userId,
      },
    });
  },

  getFileInfo: async (user_id: number, id: number): Promise<InfoData> => {
    return apiClient.get<InfoData>(`/upload/getFileInfo`, {
      params: {
        user_id,
        id,
      },
    });
  },

  setFileLock: async (password: string, fileId: number): Promise<string> => {
    return apiClient.post<string>(`/upload/lockfile`, {
      password,
      fileId,
    });
  },

  unlockFile: async (fileId: number): Promise<string> => {
    return apiClient.post<string>(`/upload/unlockfile`, {
      fileId,
    });
  },

  getLastSeen: async (userId: number): Promise<Files[]> => {
    return apiClient.get<Files[]>(`/upload/getRecentlyOpened`, {
      params: {
        userId: userId,
      },
    });
  },

  trashMedia: async (files: any): Promise<string> => {
    return apiClient.post<string>(`/upload/trashMedia`, {
      files,
    });
  },

  recoverMedia: async (files: any): Promise<string> => {
    console.log("files: ", files)
    return apiClient.post<string>(`/upload/recoverMedia`, {
      files,
    });
  },

  getTrashedFiles: async (userId: number): Promise<Files[]> => {
    return apiClient.get(`/upload/getTrashedFiles`, {
      params: {
        userId: userId,
      },
    });
  },

  enableAutoDelete: async (
    checked: boolean,
    userId: number,
  ): Promise<boolean> => {
    return apiClient.post<boolean>(`/upload/enableAutoDelete`, {
      checked,
      userId,
    });
  },
};
