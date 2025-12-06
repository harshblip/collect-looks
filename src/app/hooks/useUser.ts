import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { UserService } from "../api/user"

export const useGetUserData = (id: number) => {
    return useQuery({
        queryKey: ['userData', id],
        queryFn: () => UserService.getUserData(id),
        enabled: !!id,
        staleTime: 1000 * 5,
        retry: 2
    })
}

export const useLoginUser = () => {

    return useMutation({
        mutationFn: ({ email, password, checked }: { email: string; password: string; checked: boolean }) => UserService.loginUser(email, password, checked),

        onError: (error: any) => {
            console.error('Login failed:', error)
        },
    })
}

export const useSignupUser = () => {
    return useMutation({
        mutationFn: async ({ username, email, password }: {
            username: string,
            email: string,
            password: string
        }) => {
            return await UserService.signupUser(username, email, password)
        },
        onMutate: async () => {
            console.log("user created")
        },
        onError: (error) => {
            console.error("Failed to create user: ", error)
        },
        onSuccess: () => {
            console.error("user created")
        }
    })
}

export const useUpdateUser = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ username, email, id }: {
            username: string,
            email: string,
            id: number
        }) => {
            return await UserService.updateUserData(username, email, id)
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

export const useUpdateLastOpened = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ type, fileId }: {
            type: string,
            fileId: number
        }) => {
            return await UserService.updateLastOpened(type, fileId)
        },
        onMutate: async () => {
            console.log("last opened updated")
        },
        onError: (error) => {
            console.error("Failed to update latest time: ", error)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["allFiles"] })
        }
    })
}

