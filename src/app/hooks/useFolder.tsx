import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFolder, getFolders } from "../api/folder";

export const useCreateFolder = (
    name: string,
    description: string,
    is_locked: boolean,
    password: string,
    id: number
) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: () => createFolder(name, description, is_locked, password, id),
        onMutate: async (name) => {
            console.log(`${name} folder created`)
        },
        onError: (error) => {
            console.error("Failed to create folder: ", error)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["allFiles"] })
        }
    })
}

export const useGetFolders = (id: number) => {
    return useQuery({
        queryKey: ['allFolders', id],
        queryFn: () => getFolders(id),
        enabled: !!id,
        staleTime: 1000 * 60 * 1,
        retry: 2
    })
}