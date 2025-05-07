import { setLoadingState, setMedia } from "@/lib/slice/statesSlice";
import { useAppSelector } from "@/lib/store";
import axios from "axios"
import { useDispatch } from "react-redux"

export const useMedia = () => {
    const dispatch = useDispatch();
    const token = useAppSelector(state => state.auth.authToken)

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

    async function getImages() {
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
        } catch (err) {
            console.log("error fetching images: ", err)
        }
    }

    return { getImages, deleteMedia }
}
