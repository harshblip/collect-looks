'use client'
import { setAuthState } from "@/lib/slice/userSlice"
import { useAppSelector } from "@/lib/store"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { CheckCircleIcon, ExclamationTriangleIcon } from "@heroicons/react/24/solid"

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

export default function Dashboard() {

    const token = useAppSelector((state) => state.auth.authToken);
    const authState = useAppSelector((state) => state.auth.authToken)

    const [media, setMedia] = useState<Media[]>([])
    const [images, setImages] = useState([""])
    const [check, setCheck] = useState<boolean>(false)
    const [count, setCount] = useState<number>(3)
    const [toastMessage, setToastMessage] = useState<string>('')
    const [errorMessage, setErrorMessage] = useState<string>('')

    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!authState) {
            setCheck(!check)
            const createInterval = setInterval(() => {
                setCount(prevCount => prevCount - 1)
            }, 1000)
            return () => clearInterval(createInterval)
        }
    }, [])

    if (count === 0) {
        router.push('/signup')
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
                    setMedia(response.data.message)
                    setToastMessage("images retrieved")
                }
            } else {
                console.log("facing error fetching images: ", response.data)
                setErrorMessage("facing error getting images")
            }
        } catch (err) {
            console.log("error fetching images: ", err)
        }
    }

    async function deleteMedia() {
        const response = await axios.delete('http://localhost:4000/upload/getImages', {
            params: {
                files: images
            }
        })

        if (response.status === 204) {
            setToastMessage("images deleted :)")
        } else {
            setErrorMessage("images weren't deleted due to some error")
        }
    }

    function addImage(name: string) {
        if (images.includes(name)) {
            setImages(prevImages => prevImages.filter(x => x !== name))
        } else {
            setImages([...images, name])
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
            <div className="mt-[14rem] flex flex-col space-y-4 justify-center items-center">
                <p> hi i am dashboard </p>
                <button
                    onClick={getImages}
                    className="hover:cursor-pointer border border-gray-500 p-2 rounded-md w-[10rem]"
                >
                    get images
                </button>
                <button
                    onClick={getImages}
                    className="hover:cursor-pointer border border-gray-500 p-2 rounded-md w-[10rem]"
                >
                    delete {images.length - 1} images
                </button>
                <div className="flex space-x-10 p-6">
                    {
                        media.map((x, i) => (
                            <div key={i} className="h-44 w-44">
                                <img
                                    src={x.file_url}
                                    width={160}
                                    onClick={() => addImage(x.file_name)}
                                    className="rounded-md hover:cursor-pointer"
                                />
                            </div>
                        ))
                    }
                </div>
                {
                    check ? <div className="bg-red-400 absolute z-50 rounded-lg">
                        <div className="p-6 flex items-center space-x-4">
                            <ExclamationTriangleIcon
                                className="text-white w-8"
                            />
                            <p className="text-white flex font-semibold text-md"> <span></span> user not logged in redirecting you in {count}s </p>
                        </div>
                    </div> : ''
                }
                <div className="flex space-x-2">
                    {
                        images.map((x, i) => {
                            return (
                                <p key={i}>{x} |</p>
                            )
                        })
                    }
                </div>
                {
                    errorMessage || toastMessage ?
                        <div className="bg-red-400 absolute z-50 rounded-lg">
                            <div className="p-6 flex items-center space-x-4">
                                {
                                    errorMessage ? <ExclamationTriangleIcon
                                        className="text-white w-8"
                                    /> : <CheckCircleIcon
                                        className="text-white w-8"
                                    />
                                }
                                <p className="text-white flex font-semibold text-md"> <span></span>{toastMessage ? toastMessage : errorMessage} </p>
                            </div>
                        </div> : ' '
                }
            </div>
        </>
    )
}