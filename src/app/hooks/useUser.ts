import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getUserData, updateUserData } from "../api/user"

export const useGetUserData = (id: number) => {
    return useQuery({
        queryKey: ['userData', id],
        queryFn: () => getUserData(id),
        enabled: !!id,
        staleTime: 1000 * 30,
        retry: 2
    })
}

export const useUpateUser = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ username, email, id }: {
            username: string,
            email: string,
            id: number
        }) => {
            return await updateUserData(username, email, id)
        },
        onMutate: async () => {
            console.log("user data updated")
        },
        onError: (error) => {
            console.error("Failed to update user: ", error)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["userData"] })
        }
    })
}
