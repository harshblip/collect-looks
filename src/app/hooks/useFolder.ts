import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addFilesToFolder, createFolder, getFolderItems, getFolders, setFolderLock, unlockFolder } from "../api/folder";
import { Files } from "@/types/mediaTypes";

export const useCreateFolder = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ name, description, is_locked, password, id, parent_id }: {
            name: string,
            description: string,
            is_locked: boolean,
            password: string,
            id: number,
            parent_id: number | null
        }) => {
            return await createFolder(name, description, is_locked, password, id, parent_id)
        },
        onMutate: async () => {
            console.log(`folder created mutate`)
        },
        onError: (error) => {
            console.error("Failed to create folder: ", error)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["allFiles", "folderItems", "allFolders"] })
        }
    })
}

export const useAddFilestoFolder = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ files, folderId }: {
            files: Files[],
            folderId: number
        }) => {
            return await addFilesToFolder(files, folderId)
        },
        onMutate: async () => {
            console.log(`files added to folder useAddFiles mutate`)
        },
        onError: (error) => {
            console.error("Failed to add files to folder:  ", error)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["allFolders", 'allFiles'] })
        }
    })
}

export const useGetFolders = (id: number) => {
    return useQuery({
        queryKey: ['allFolders', id],
        queryFn: () => getFolders(id),
        enabled: !!id,
        staleTime: 1000 * 5,
        retry: 2
    })
}

export const useGetFolderItems = (userId: number, folderId: number) => {
    return useQuery({
        queryKey: ['folderItems', folderId],
        queryFn: () => getFolderItems(userId, folderId),
        enabled: !!userId,
        staleTime: 1000 * 5,
        retry: 2
    })
}

export const useLockFolder = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ password, folderId }: { password: string, folderId: number }) => {
            return await setFolderLock(password, folderId)
        },
        onMutate: async ({ folderId }: { password: string, folderId: number }) => {
            console.log(`locked folder with folderId ${folderId}`);
        },
        onError: (error) => {
            console.error("Failed to folder file:", error);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['allFiles'] });
        },
    });
}

export const useUnlockFolder = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ folderId }: { folderId: number }) => {
            return await unlockFolder(folderId)
        },
        onMutate: async ({ folderId }: { folderId: number }) => {
            console.log(`folder unlocked with folderId ${folderId}`);
        },
        onError: (error) => {
            console.error("Failed to unlock folder:", error);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['allFiles'] });
        },
    });
}