import { apiClient } from "@/lib/apiClient";
import { BASE_URL } from "@/lib/constants";
import { Files, Folders } from "@/types/mediaTypes";

export const FolderService = {
  createFolder: async (
    name: string,
    description: string,
    is_locked: boolean,
    password: string,
    id: number,
    parent_id: number | null
  ): Promise<string> => {
    return apiClient.post<string>(`${BASE_URL}/upload/createFolder`, {
      name,
      description,
      password,
      is_locked,
      id,
      parent_id,
    });
  },

  addFilesToFolder: async (
    files: Files[],
    folderId: number
  ): Promise<string> => {
    return apiClient.post<string>(`${BASE_URL}/upload/addFilestoFolder`, {
      files,
      folderId,
    });
  },

  getFolders: async (id: number): Promise<Folders[]> => {
    return apiClient.get<Folders[]>(`${BASE_URL}/upload/getFolders`, {
      params: {
        id: id,
      },
    });
  },

  getFolderItems: async (
    userId: number,
    folderId: number
  ): Promise<Files[]> => {
    return apiClient.get<Files[]>(`${BASE_URL}/upload/folderItems`, {
      params: {
        userId,
        folderId,
      },
    });
  },

  setFolderLock: async (
    password: string,
    folderId: number
  ): Promise<string> => {
    return apiClient.post<string>(`${BASE_URL}/upload/lockfolder`, {
      password,
      folderId,
    });
  },

  unlockFolder: async (folderId: number): Promise<string> => {
    return apiClient.post<string>(`${BASE_URL}/upload/unlockfolder`, {
      folderId,
    });
  },
};
