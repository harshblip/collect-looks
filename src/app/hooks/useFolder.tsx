import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addFilesToFolder, createFolder, getFolders } from "../api/folder";
import { Files } from "@/types/mediaTypes";

export const useCreateFolder = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ name, description, is_locked, password, id }: {
            name: string,
            description: string,
            is_locked: boolean,
            password: string,
            id: string
        }) => {
            return await createFolder(name, description, is_locked, password, id)
        },
        onMutate: async () => {
            console.log(`folder created mutate`)
        },
        onError: (error) => {
            console.error("Failed to create folder: ", error)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["allFiles"] })
        }
    })
}

export const useAddFilestoFolder = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ files, folderId }: {
            files: Files[],
            folderId: string
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
            queryClient.invalidateQueries({ queryKey: ["allFolders"] })
        }
    })
}

export const useGetFolders = (id: string) => {
    return useQuery({
        queryKey: ['allFolders', id],
        queryFn: () => getFolders(id),
        enabled: !!id,
        staleTime: 1000 * 60 * 1,
        retry: 2
    })
}