'use client'

import { prefetchInfo, useStarFile } from "@/app/hooks/useMedia";
import { byteToSize } from "@/app/utils/useful";
import { setInfoData, setViewInfo } from "@/lib/slice/generalSlice";
import { Files } from "@/types/mediaTypes";
import { InformationCircleIcon, PlayIcon, StarIcon, TrashIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function SearchMatchCard({ result }: { result: Files }) {
    const { mutate: starFile } = useStarFile();
    const { data, refetch } = prefetchInfo(3, result.id)

    const dispatch = useDispatch()
    useEffect(() => {
        data && dispatch(setInfoData(data))
    }, [data])

    console.log(result)
    return (
        <>
            <div className="bg-white shadow-md text-secondary rounded-md p-2">
                <div className="p-4 rounded-md flex space-x-8 border border-gray-400">
                    {
                        result.file_type === 'image' ? <Image
                            src={`${result.file_url}`}
                            alt={`${result.file_name}`}
                            height={0}
                            width={150}
                            className="rounded-lg"
                        /> : <div className="w-28 h-30 bg-red-100 flex items-center justify-center rounded-md">
                            <PlayIcon
                                className="w-12 text-red-300"
                            />
                        </div>
                    }
                    <div className="flex flex-col space-y-2 justify-center">
                        <p className="mt-2 text-xs text-gray-400"> <i>matches 100% with your query</i> </p>
                        <div className="flex space-x-2 mt-4 items-center">
                            <p className="text-xl"> {result.file_name} </p>
                            <button
                                onClick={() => starFile({ userId: 3, fileId: result.id })}
                                className={`p-1 h-6 items-center hover rounded-md border hover:bg-amber-400 hover:text-white transition flex space-x-2 ${result.starred ? `bg-amber-400 text-white border-amber-400` : `text-amber-500 border-amber-400`}`}>
                                <StarIcon className="w-4" />
                            </button>
                        </div>
                        <div className="flex space-x-4 items-center">
                            <div className="flex flex-col">
                                <p className="text-sm"> {result.created_at.substring(0, 10)} </p>
                                <p className="text-xs text-gray-300"> created at  </p>
                            </div>
                            <hr
                                className="border border-gray-300 h-6"
                            />
                            <div className="flex flex-col">
                                <p> {byteToSize(parseInt(result.size))} </p>
                                <p className="text-xs text-gray-300"> size  </p>
                            </div>
                        </div>
                        <div className="flex space-x-2 mt-4 items-center">
                            <button
                                onClick={() => {
                                    dispatch(setViewInfo(true))
                                }}
                                className="p-2 h-8 items-center hover rounded-md border border-gray-400 flex space-x-2 text-secondary">
                                <InformationCircleIcon className="w-4" />
                                <p className="text-sm"> know more </p>
                            </button>
                            <button className="p-2 h-8 items-center hover rounded-md border-dashed border border-red-400 hover:bg-red-400 hover:text-white  flex space-x-2 text-red-400">
                                <TrashIcon className="w-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}