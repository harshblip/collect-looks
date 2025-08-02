'use client'

import { setViewMedia } from "@/lib/slice/folderSlice"
import { useAppSelector } from "@/lib/store"
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline"
import { ArrowsPointingInIcon } from "@heroicons/react/24/solid"
import Image from "next/image"
import { useState } from "react"
import { useDispatch } from "react-redux"

export default function MediaViewer() {
    
    const dispatch = useDispatch()
    const index = useAppSelector(state => state.folderStates.index)
    const openFiles = useAppSelector(state => state.folderStates.viewMediaFiles)
    
    const [updateI, setUpdateI] = useState<number>(index)

    return (
        <>
            <div
                className="font-product absolute bg-black/20 flex flex-col justify-center items-center w-full top-0 bottom-0 -ml-8 z-2"
            >
                <ArrowsPointingInIcon
                    onClick={() => dispatch(setViewMedia(false))}
                    className="text-primary w-10 hover bg-white p-2 rounded-md"
                />
                <div className="flex space-x-4">
                    <ArrowLeftIcon
                        onClick={() => setUpdateI((x) => x > 0 ? x - 1 : x)}
                        className="w-10 text-white hover absolute top-[50%] left-20" />
                    <div className="flex flex-col items-center justify-center rounded-lg w-[100%] h-[100%] p-4 overflow-hidden">
                        <Image
                            src={openFiles[updateI].file_url || ''}
                            alt={openFiles[updateI].file_name || ''}
                            width={0}
                            height={0}
                            sizes="100vw"
                            className="h-auto max-h-full w-auto max-w-full object-contain rounded-xl"
                        />
                    </div>
                    <ArrowRightIcon
                        onClick={() => setUpdateI((x) => x < openFiles.length ? x + 1 : x)}
                        className="w-10 text-white hover absolute top-[50%] right-20" />
                </div>

            </div>
        </>
    )
}