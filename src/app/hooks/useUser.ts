import { useQuery } from "@tanstack/react-query"
import { getUserData } from "../api/user"

export const useGetUserData = (id: number) => {
    return useQuery({
        queryKey: ['userData', id],
        queryFn: () => getUserData(id),
        enabled: !!id,
        staleTime: 1000 * 30,
        retry: 2
    })
}