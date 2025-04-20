'use client'
import { useAppSelector } from "@/lib/store"
import axios from "axios"

export default function Dashboard() {
    const token = useAppSelector((state) => state.auth.authToken);
    console.log("token", token)
    async function getImages() {
        try {
            const response = await axios.get('http://localhost:3000/upload/getImages', {
                params: {
                    id: 3
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (response.status === 200) {
                console.log(response)
            } else {
                console.log("facing error fetching images: ", response.data)
            }
        } catch (err) {
            console.log("error fetching images: ", err)
        }
    }

    return (
        <>
            <div className="mt-[18rem] flex flex-col space-y-4 justify-center items-center">
                <p> hi i am dashboard </p>
                <button
                    onClick={getImages}
                    className="hover:cursor-pointer border border-gray-500 p-2 rounded-md w-[10rem]"
                >
                    get images
                </button>
            </div>
        </>
    )
}