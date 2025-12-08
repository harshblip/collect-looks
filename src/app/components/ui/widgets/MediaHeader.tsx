import { byteToSize } from "@/app/utils/useful"
import { setViewInfo, setViewMedia } from "@/lib/slice/generalSlice"
import { Files } from "@/types/mediaTypes"
import { ArrowsPointingInIcon, ArrowUpRightIcon, InformationCircleIcon } from "@heroicons/react/24/outline"
import { useDispatch } from "react-redux"

export default function MediaHeader({ refetch, file }: {
    file: Files,
    refetch: () => void
}) {
    const dispatch = useDispatch()
    return (
        <>
            <div className="bg-white rounded-md w-[60%] top-10 left-[20%] absolute p-2 shadow-md z-2">
                <div className="bg-gray-100 p-2 rounded-md flex items-center justify-between text-secondary">
                    <div className="flex space-x-4">
                        <button className="ml-2 border border-gray-400 rounded-md p-2"> <ArrowUpRightIcon className="w-4" /> </button>
                        <ArrowsPointingInIcon
                            onClick={() => dispatch(setViewMedia(false))}
                            className="text-primary w-10 hover border border-gray-400 p-2 rounded-md"
                        />
                        <InformationCircleIcon
                            onMouseEnter={() => refetch()}
                            onClick={() => {
                                dispatch(setViewInfo(true))
                            }}
                            className="text-primary w-10 hover border border-gray-400 p-2 rounded-md"
                        />
                    </div>
                    <p className=" text-xl p-2 ml-12 rounded-md"> {file.file_name} </p>
                    <div className="flex items-center space-x-1">
                        <p className="p-2 rounded-md"> {file.created_at.substring(0, 10)} </p>
                        <p className="text-xl">|</p>
                        <p className="p-2 rounded-md"> {byteToSize(parseInt(file.size))} </p>
                    </div>
                </div>
            </div>
        </>
    )
}