'use client'
import { setAuthState } from "@/lib/slice/userSlice"
import { useAppSelector } from "@/lib/store"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"

export default function Dashboard() {

    const authState = useAppSelector((state) => state.auth.authToken)
    const [media, setMedia] = useState<Media[]>([])
    const [check, setCheck] = useState(false)
    const [count, setCount] = useState(3)

    const router = useRouter();
    const dispatch = useDispatch();

    // var count = 3
    useEffect(() => {
        if (authState) {
            setCheck(!check)
            const createInterval = setInterval(() => {
                setCount(prevCount => prevCount - 1)
                console.log(count)
            }, 1000)
            return () => clearInterval(createInterval)
        }
    }, [])

    if (count === 0) {
        router.push('/signup')
    }


    type Media = {
        id: string,
        user_id: string,
        created_at: string,
        display_image_url: string,
        file_name: string,
        file_url: string,
        folder_id: string,
        size: string,
        thumbnail_image_url: string
    }



    const token = useAppSelector((state) => state.auth.authToken);
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
            if (response.status === 200) {
                // console.log(response)
                if (response.data.images) {
                    setMedia(response.data.images)
                }
            } else {
                console.log("facing error fetching images: ", response.data)
            }
        } catch (err) {
            console.log("error fetching images: ", err)
        }
    }

    function handleLogout() {
        dispatch(setAuthState(''))
        router.push('/signup')
    }

    return (
        <>
            <button
                onClick={handleLogout}
                className="absolute p-6 ml-6 border rounded-lg h-[0.2rem] items-center flex">logout</button>
            <div className="mt-[18rem] flex flex-col space-y-4 justify-center items-center">
                <p> hi i am dashboard </p>
                <button
                    onClick={getImages}
                    className="hover:cursor-pointer border border-gray-500 p-2 rounded-md w-[10rem]"
                >
                    get images
                </button>
                <div className="flex space-x-10 p-6">
                    {
                        media.map((x, i) => (
                            <div key={i}>
                                <img
                                    src={x.file_url}
                                    width={160}
                                    className="rounded-md"
                                />
                            </div>
                        ))
                    }
                </div>
                {
                    check ? <div className="bg-red-400 absolute z-50 rounded-lg">
                        <p className="text-white p-12 font-semibold text-md"> user not logged in redirecting you in {count}s </p>
                    </div> : ''
                }
            </div>
        </>
    )
}