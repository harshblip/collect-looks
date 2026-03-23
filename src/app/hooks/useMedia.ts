import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { FileService } from "../api/files";
import { useEffect, useState } from "react";
import { SearchService } from "../api/search";
import { Filter } from "@/types/mediaTypes";
import { FolderService } from "../api/folder";

interface RecoverFile {
  fileName: string;
  url: string;
  size: string;
  type: string;
  fileId: number;
  id: number;
}

export const useGetAllFiles = (user_id: number, page: number) => {
  return useQuery({
    queryKey: ["allFiles", user_id, page],
    queryFn: () => FileService.getAll(user_id, page),
    enabled: !!user_id,
    staleTime: 1000 * 60 * 5,
    retry: 5,
  });
};

export const useGetTrashStatus = (userId: number) => {
  return useQuery({
    queryKey: ["trashStatus", userId],
    queryFn: () => FileService.getTrashStatus(userId),
    enabled: !!userId,
    staleTime: 1000 * 5,
    retry: 5,
  });
};

export const useUploadFile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      files,
      accessToken,
      username,
      userId,
      setProgress,
    }: {
      files: File[];
      accessToken: string;
      username: string;
      userId: number;
      setProgress: React.Dispatch<React.SetStateAction<number>>;
    }) => {
      return await FileService.uploadFile(
        files,
        accessToken,
        username,
        userId,
        setProgress,
      );
    },
    onMutate: ({
      files,
      setProgress,
      userId,
    }: {
      userId: number;
      setProgress: React.Dispatch<React.SetStateAction<number>>;
      files: File[];
    }) => {
      setProgress(0);
      queryClient.invalidateQueries({ queryKey: ["allFiles", userId] });
      queryClient.setQueriesData(
        { queryKey: ["allFiles", userId], type: "active" },
        (old: any) => (old ? [...old, files] : old),
      );
    },
    onError: (error) => {
      console.error("Upload error:", error);
    },
  });
};

export const useEnableAutoDelete = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      checked,
      userId,
    }: {
      checked: boolean;
      userId: number;
    }) => {
      return await FileService.enableAutoDelete(checked, userId);
    },
    onMutate: async ({
      userId,
      checked,
    }: {
      checked: boolean;
      userId: number;
    }) => {
      await queryClient.cancelQueries({ queryKey: ["trashStatus", userId] });
      queryClient.setQueryData(["trashStatus", userId], checked);
      // return { getData };
    },
    onError: (error) => {
      console.error("Failed to enable:", error);
    },
  });
};

export const useStarFile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      userId,
      fileId,
    }: {
      starOrWhat: boolean;
      userId: number;
      fileId: number;
    }) => {
      console.log("mutationFn called");
      return await FileService.starFile(userId, fileId);
    },
    onMutate: async ({
      userId,
      fileId,
      starOrWhat,
    }: {
      starOrWhat: boolean;
      userId: number;
      fileId: number;
    }) => {
      console.log(`marked file ${fileId} of user ${userId} as starred`);
      await queryClient.cancelQueries({ queryKey: ["allFiles", userId] });
      await queryClient.cancelQueries({ queryKey: ["suggestions", userId] });

      const prevFolderItems = queryClient.getQueryData(["allFiles", userId]);
      const suggestionItems = queryClient.getQueryData(["suggestions", userId]);

      queryClient.setQueriesData(
        { queryKey: ["allFiles"], type: "active" },
        (old: any) =>
          old
            ? old.map((file: any) =>
                file.id === fileId ? { ...file, starred: !starOrWhat } : file,
              )
            : old,
      );

      queryClient.setQueriesData(
        { queryKey: ["suggestions"], type: "active" },
        (old: any) =>
          old
            ? old.map((file: any) =>
                file.id === fileId ? { ...file, starred: !starOrWhat } : file,
              )
            : old,
      );

      return { suggestionItems, prevFolderItems };
    },
    onError: (error) => {
      console.error("Failed to mark file:", error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allFiles", "starFiles"] });
    },
  });
};

export const useGetStarredFiles = (userId: number) => {
  return useQuery({
    queryKey: ["starFiles", userId],
    queryFn: () => FileService.getStarFile(userId),
    enabled: !!userId,
    staleTime: 1000 * 5,
    retry: 5,
  });
};

export const useGetSuggestions = (
  word: string,
  userId: number,
  filter: Filter,
) => {
  console.log("came here1", word);
  return useQuery({
    queryKey: ["suggestions", userId, word, filter],
    queryFn: () => SearchService.getSuggestions(word, userId, filter),
    enabled: false,
    staleTime: 1000 * 5,
    retry: 5,
  });
};

export const useGetSearchResults = (word: string, userId: number) => {
  return useQuery({
    queryKey: ["search", userId, word],
    queryFn: () => SearchService.getSearchResults(word, userId),
    enabled: false,
    staleTime: 1000 * 5,
    retry: 5,
  });
};

export const prefetchInfo = (user_id: number, id: number) => {
  return useQuery({
    queryKey: ["fileInfo", user_id],
    queryFn: () => FileService.getFileInfo(user_id, id),
    enabled: false,
    staleTime: 1000 * 5,
    retry: 5,
  });
};

export const useGetFileInfo = (user_id: number, id: number) => {
  return useQuery({
    queryKey: ["fileInfo", user_id],
    queryFn: () => FileService.getFileInfo(user_id, id),
    enabled: !!user_id,
    staleTime: 1000 * 5,
    retry: 5,
  });
};

export const useGetTrashedFiles = (user_id: number) => {
  return useQuery({
    queryKey: ["trashedFiles", user_id],
    queryFn: () => FileService.getTrashedFiles(user_id),
    enabled: !!user_id,
    staleTime: 1000 * 5,
    retry: 5,
  });
};

export const useGetLastSeen = (userId: number) => {
  return useQuery({
    queryKey: ["lastSeen", userId],
    queryFn: () => FileService.getLastSeen(userId),
    enabled: !!userId,
    staleTime: 1000 * 5,
    retry: 5,
  });
};

export const useLockFile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      parent_id,
      password,
      fileId,
    }: {
      parent_id: number | null;
      password: string;
      fileId: number;
    }) => {
      return await FileService.setFileLock(password, fileId);
    },
    onMutate: async ({
      parent_id,
      password,
      fileId,
    }: {
      parent_id: number | null;
      password: string;
      fileId: number;
    }) => {
      console.log(`locked file with fileId ${fileId}`);
      await queryClient.cancelQueries({ queryKey: ["folderItems", parent_id] });

      const prevFolderItems = queryClient.getQueryData([
        "folderItems",
        parent_id,
      ]);

      queryClient.setQueriesData(
        { queryKey: ["folderItems"], type: "active" },
        (old: any) =>
          old
            ? old.map((file: any) =>
                file.id === fileId
                  ? { ...file, is_locked: true, password }
                  : file,
              )
            : old,
      );

      return { prevFolderItems };
    },
    onError: (error) => {
      console.error("Failed to lock file:", error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allFiles"] });
    },
  });
};

export const useUnlockFile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      parent_id,
      fileId,
    }: {
      parent_id: number | null;
      fileId: number;
    }) => {
      return await FileService.unlockFile(fileId);
    },
    onMutate: async ({
      parent_id,
      fileId,
    }: {
      parent_id: number | null;
      fileId: number;
    }) => {
      console.log(`file unlocked with fileId ${fileId}`);

      await queryClient.cancelQueries({ queryKey: ["folderItems", parent_id] });

      const prevFolderItems = queryClient.getQueryData([
        "folderItems",
        parent_id,
      ]);

      queryClient.setQueriesData(
        { queryKey: ["folderItems"], type: "active" },
        (old: any) =>
          old
            ? old.map((file: any) =>
                file.id === fileId
                  ? { ...file, is_locked: false, password: "" }
                  : file,
              )
            : old,
      );

      return { prevFolderItems };
    },
    onError: (error) => {
      console.error("Failed to unlock file:", error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allFiles"] });
    },
  });
};

export const useTrashFile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ files }: { files: any }) => {
      return await FileService.trashMedia(files);
    },
    onMutate: async ({ files }: { files: any }) => {
      console.log(`${files.length} files deleted`);
    },
    onError: (error) => {
      console.error("Failed to delete file:", error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allFiles"] });
    },
  });
};

export const useRestoreFile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ files }: { files: RecoverFile[] }) => {
      return await FileService.recoverMedia(files);
    },
    onMutate: async ({ files }: { files: RecoverFile[] }) => {
      console.log(`${files} : list of files to be restored`);
      await queryClient.cancelQueries({
        queryKey: ["trashedFiles", files[0].id],
      });
      queryClient.setQueriesData(
        { queryKey: ["trashedFiles"], type: "active" },
        (old: any) =>
          old
            ? old.filter(
                (file: any) =>
                  !files.some(
                    (recoveredFile: RecoverFile) =>
                      recoveredFile.fileId === file.id,
                  ),
              )
            : old,
      );
    },
    onError: (error) => {
      console.error("Failed to restore file:", error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allFiles"] });
    },
  });
};

export const useKeyboardShortcuts = (shortcuts: Record<string, () => void>) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        const key = e.key.toLowerCase();
        if (shortcuts[key]) {
          e.preventDefault();
          shortcuts[key]();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [shortcuts]);
};
