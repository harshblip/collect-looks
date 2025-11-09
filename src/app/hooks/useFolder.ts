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
        onMutate: async (newFolder) => {
            console.log(`folder created mutate`);

            await queryClient.cancelQueries({ queryKey: ['allFiles'] })
            await queryClient.cancelQueries({ queryKey: ['folderItems', newFolder.parent_id] })

            // Store previous data so we can rollback if mutation fails
            const prevAllFiles = queryClient.getQueryData(['allFiles'])
            const prevFolderItems = queryClient.getQueryData(['folderItems', newFolder.parent_id])

            // Update cache immediately
            if (prevFolderItems) {
                queryClient.setQueryData(['folderItems', newFolder.parent_id], (old: any) => [
                    ...(old || []),
                    {
                        file_name: newFolder.name,
                        description: newFolder.description,
                        is_locked: newFolder.is_locked,
                        password: newFolder.password,
                        parent_id: newFolder.parent_id,
                        user_id: newFolder.id
                    },
                ])
            }

            return { prevAllFiles, prevFolderItems }

        },
        onError: (err, newFolder, context) => {
            console.error("Failed to create folder: ", err);
            if (context?.prevAllFiles)
                queryClient.setQueryData(['allFiles'], context.prevAllFiles)
            if (context?.prevFolderItems)
                queryClient.setQueryData(['folderItems', newFolder.parent_id], context.prevFolderItems)
        },
        onSettled: (data, newFolder) => {
            queryClient.invalidateQueries({ queryKey: ['allFiles'] })
            queryClient.invalidateQueries({ queryKey: ['folderItems'] })
        },
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
        mutationFn: async ({ password, folderId }: { parent_id: number | null, password: string, folderId: number }) => {
            return await setFolderLock(password, folderId)
        },
        onMutate: async ({ folderId }: { parent_id: number | null, password: string, folderId: number }) => {
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
        mutationFn: async ({ folderId }: { parent_id: number | null, folderId: number }) => {
            return await unlockFolder(folderId)
        },
        onMutate: async ({ folderId }: { parent_id: number | null, folderId: number }) => {
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