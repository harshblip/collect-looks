import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getUserData, loginUser, signupUser, updateLastOpened, updateUserData } from "../api/user"
import { useAuth } from "../context/AuthContext"

export const useGetUserData = (id: number) => {
    return useQuery({
        queryKey: ['userData', id],
        queryFn: () => getUserData(id),
        enabled: !!id,
        staleTime: 1000 * 30,
        retry: 2
    })
}

export const useLoginUser = (email: string, password: string, checked: boolean) => {
    const { login } = useAuth()

    return useMutation({
        mutationFn: ({ email, password, checked }: { email: string; password: string; checked: boolean }) => loginUser(email, password, checked),

        onSuccess: (data) => {
            console.log(data, data.access_token)
            const token = data.access_token
            login(token)
        },

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
            return await signupUser(username, email, password)
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

export const useUpdateLastOpened = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ type, fileId }: {
            type: string,
            fileId: number
        }) => {
            return await updateLastOpened(type, fileId)
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

