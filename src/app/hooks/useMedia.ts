import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query'
import { deleteFiles, fetchAllFiles, getFileInfo, getStarFile, setFileLock, starFile, unlockFile, uploadFile } from "../api/files";

export const useDeleteMedia = (images: string[], username: string, id: number) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: () => deleteFiles(id, username, images),
        onMutate: async (id) => {
            console.log(`${username}, files were successfully deleted`)
        },
        onError: (error) => {
            console.error("Failed to delete file:", error);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["allFiles"] });
        },
    })
}

export const useGetAllFiles = (user_id: number, page: number) => {
    return useQuery({
        queryKey: ['allFiles', user_id, page],
        queryFn: () => fetchAllFiles(user_id, page),
        enabled: !!user_id,
        staleTime: 1000 * 30,
        retry: 2
    })
}

export const useUploadFile = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ formData }: { formData: FormData }) => {
            return await uploadFile(formData)
        },
        onMutate: () => {
            console.log(`file uploaded`)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['allFiles'] })
        }
    })
}

export const useStarFile = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ userId, fileId }: { userId: number, fileId: number }) => {
            console.log("mutationFn called")
            return await starFile(userId, fileId)
        },
        onMutate: async ({ userId, fileId }: { userId: number, fileId: number }) => {
            console.log(`marked file ${fileId} of user ${userId} as starred`);
        },
        onError: (error) => {
            console.error("Failed to mark file:", error);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['allFiles', 'starFiles'] });
        },
    });
}

export const useGetStarredFiles = (userId: number) => {
    return useQuery({
        queryKey: ['starFiles', userId],
        queryFn: () => getStarFile(userId),
        enabled: !!userId,
        staleTime: 1000 * 30,
        retry: 2
    })
}

export const prefetchInfo = (user_id: number, id: number) => {
    return useQuery({
        queryKey: ['fileInfo', user_id],
        queryFn: () => getFileInfo(user_id, id),
        enabled: !!user_id,
        staleTime: 1000 * 30,
        retry: 2
    })
}

export const useGetFileInfo = (user_id: number, id: number) => {
    return useQuery({
        queryKey: ['fileInfo', user_id],
        queryFn: () => getFileInfo(user_id, id),
        enabled: !!user_id,
        staleTime: 1000 * 30,
        retry: 2
    })
}

export const useLockFile = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ password, fileId }: { password: string, fileId: number }) => {
            return await setFileLock(password, fileId)
        },
        onMutate: async ({ password, fileId }: { password: string, fileId: number }) => {
            console.log(`locked file with fileId ${fileId}`);
        },
        onError: (error) => {
            console.error("Failed to lock file:", error);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['allFiles'] });
        },
    });
}

export const useUnlockFile = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ fileId }: { fileId: number }) => {
            return await unlockFile(fileId)
        },
        onMutate: async ({ fileId }: { fileId: number }) => {
            console.log(`file unlocked with fileId ${fileId}`);
        },
        onError: (error) => {
            console.error("Failed to unlock file:", error);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['allFiles'] });
        },
    });
}