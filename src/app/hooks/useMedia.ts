import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { FileService } from "../api/files";
import { useEffect } from "react";
import { SearchService } from "../api/search";
import { Filter } from "@/types/mediaTypes";

export const useDeleteMedia = (
  images: string[],
  username: string,
  id: number
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => FileService.deleteFiles(id, username, images),
    onMutate: async (id) => {
      console.log(`${username}, files were successfully deleted`);
    },
    onError: (error) => {
      console.error("Failed to delete file:", error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allFiles"] });
    },
  });
};

export const useGetAllFiles = (
  user_id: number,
  page: number,
  authToken: string
) => {
  return useQuery({
    queryKey: ["allFiles", user_id, page],
    queryFn: () => FileService.getAll(user_id, page),
    enabled: !!user_id,
    staleTime: 1000 * 5,
    retry: 2,
  });
};

export const useUploadFile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ formData }: { formData: FormData }) => {
      return await FileService.uploadFile(formData);
    },
    onMutate: () => {
      console.log(`file uploaded`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allFiles"] });
    },
  });
};

export const useEnableAutoDelete = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ checked, userId }: { checked: boolean; userId: number }) =>
      FileService.enableAutoDelete(checked, userId),
    onMutate: async (id) => {
      console.log(`auto delete enabled`);
    },
    onError: (error) => {
      console.error("Failed to enable:", error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allFiles"] });
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
                file.id === fileId ? { ...file, starred: !starOrWhat } : file
              )
            : old
      );

      queryClient.setQueriesData(
        { queryKey: ["suggestions"], type: "active" },
        (old: any) =>
          old
            ? old.map((file: any) =>
                file.id === fileId ? { ...file, starred: !starOrWhat } : file
              )
            : old
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
    retry: 2,
  });
};

export const useGetSuggestions = (
  word: string,
  userId: number,
  filter: Filter
) => {
  console.log("came here1", word);
  return useQuery({
    queryKey: ["suggestions", userId],
    queryFn: () => SearchService.getSuggestions(word, userId, filter),
    enabled: false,
    staleTime: 1000 * 5,
    retry: 2,
  });
};

export const useGetSearchResults = (word: string, userId: number) => {
  return useQuery({
    queryKey: ["search", userId],
    queryFn: () => SearchService.getSearchResults(word, userId),
    enabled: false,
    staleTime: 1000 * 5,
    retry: 2,
  });
};

export const prefetchInfo = (user_id: number, id: number) => {
  return useQuery({
    queryKey: ["fileInfo", user_id],
    queryFn: () => FileService.getFileInfo(user_id, id),
    enabled: false,
    staleTime: 1000 * 5,
    retry: 2,
  });
};

export const useGetFileInfo = (user_id: number, id: number) => {
  return useQuery({
    queryKey: ["fileInfo", user_id],
    queryFn: () => FileService.getFileInfo(user_id, id),
    enabled: !!user_id,
    staleTime: 1000 * 5,
    retry: 2,
  });
};

export const useGetTrashedFiles = (user_id: number) => {
  return useQuery({
    queryKey: ["trashedFiles", user_id],
    queryFn: () => FileService.getTrashedFiles(user_id),
    enabled: !!user_id,
    staleTime: 1000 * 5,
    retry: 2,
  });
};

export const useGetLastSeen = (userId: number) => {
  return useQuery({
    queryKey: ["lastSeen", userId],
    queryFn: () => FileService.getLastSeen(userId),
    enabled: !!userId,
    staleTime: 1000 * 5,
    retry: 2,
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
                  : file
              )
            : old
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
                  : file
              )
            : old
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

export const useDeleteFile = () => {
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
