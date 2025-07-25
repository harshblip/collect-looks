import { useAppSelector } from "@/lib/store";
import axios from "axios"
import { useDispatch } from "react-redux"
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query'
import { deleteFiles, fetchAllFiles, getFileInfo, getStarFile, starFile, uploadFile } from "../api/files";

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

export const useGetAllFiles = (user_id: number) => {
    return useQuery({
        queryKey: ['allFiles', user_id],
        queryFn: () => fetchAllFiles(user_id),
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
            queryClient.invalidateQueries({ queryKey: ["allFiles"] })
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
            queryClient.invalidateQueries({ queryKey: ["allFiles", "starFiles"] });
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