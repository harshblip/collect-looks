import { BASE_URL } from "@/lib/constants";
import { setLoadingState, setMedia } from "@/lib/slice/statesSlice";
import { useAppSelector } from "@/lib/store";
import { AllFiles } from "@/types/mediaTypes";
import axios from "axios"
import { useDispatch } from "react-redux"
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query'
import { fetchAllFiles, getStarFile, starFile } from "../api/files";


export const useMedia = () => {
    const dispatch = useDispatch();
    const token = useAppSelector(state => state.auth.authToken)

    async function uploadFile(formData: FormData) {
        try {
            const response = await axios.post('http://localhost:4000/upload', formData)
            if (response.status === 200) {
                // dispatch(setMedia(response.data.message))
                console.log(response.data)
            } else {
                console.log("facing error fetching images: ", response.data)
                // setErrorMessage("facing error getting images")
            }
        } catch (err: any) {
            // setError(err.response.data.message)
            console.log("error fetching images: ", err)
        }
    }

    async function deleteMedia(images: string[]) {
        const response = await axios.delete('http://localhost:4000/upload/deleteMedia', {
            params: {
                files: images,
                username: 'mihir',
                id: 3
            },
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        if (response.status === 204) {
            dispatch(setLoadingState(false))
        } else {
            // setErrorMessage("images weren't deleted due to some error")
        }
    }

    async function getImages(setError: React.Dispatch<React.SetStateAction<string>>) {
        try {
            const response = await axios.get('http://localhost:4000/upload/getImages', {
                params: {
                    id: 3
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(response.data.message[0])
            if (response.status === 200) {
                if (response.data.message) {
                    dispatch(setMedia(response.data.message))
                }
            } else {
                console.log("facing error fetching images: ", response.data)
                // setErrorMessage("facing error getting images")
            }
        } catch (err: any) {
            setError(err.response.data.message)
            console.log("error fetching images: ", err)
        }
    }

    return { getImages, deleteMedia, uploadFile }
}

export const useGetAllFiles = (email: string) => {
    return useQuery({
        queryKey: ['allFiles', email],
        queryFn: () => fetchAllFiles(email),
        enabled: !!email,
        staleTime: 1000 * 60 * 1,
        retry: 2
    })
}

export const useStarFile = (userId: number, id: number) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: () => starFile(userId, id),
        onMutate: async (id) => {
            console.log(`marked file ${id} as starred`);
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
        staleTime: 1000 * 60 * 1,
        retry: 2
    })
}