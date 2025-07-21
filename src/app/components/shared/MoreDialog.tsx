'use client'

import { AnimatePresence, motion } from "framer-motion";
import { InformationCircleIcon, StarIcon, TrashIcon } from "@heroicons/react/24/solid";
import { prefetchInfo, useGetFileInfo, useStarFile } from "@/app/hooks/useMedia";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setInfoData, setViewInfo } from "@/lib/slice/folderSlice";

export default function MoreDialog({ id, showMe }: {
    id: number,
    showMe: React.Dispatch<React.SetStateAction<boolean>>
}) {
    const dispatch = useDispatch()
    const { mutate: starFile } = useStarFile();
    const [show, setShow] = useState<boolean>(false)
    const { data, refetch } = prefetchInfo(3, id)

    useEffect(() => {
        data && dispatch(setInfoData(data))
    }, [data])
    return (
        <>
            <AnimatePresence>
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.1, ease: 'easeInOut' }}
                    className="bg-white absolute font-product font-medium rounded-lg shadow-lg p-3 flex flex-col space-y-2 w-36 z-10"
                >
                    <div
                        className="flex hover hover:bg-gray-100 rounded-lg space-x-2 items-center text-secondary p-2 active:scale-95 w-30"
                        onClick={() => starFile({ userId: 3, fileId: id })}
                    >
                        <StarIcon className="w-5 text-amber-400" />
                        <p> star </p>
                    </div>
                    <button
                        className="flex hover hover:bg-gray-100 rounded-lg space-x-2 p-2 items-center text-secondary active:scale-95 w-30"
                        onClick={() => {
                            dispatch(setViewInfo(true))
                            // showMe(false) 
                        }}
                        onMouseEnter={() => refetch()}
                    >
                        <InformationCircleIcon className="w-5" />
                        <p> info </p>
                    </button>
                    <div className="flex hover hover:bg-red-400 hover:text-white rounded-lg space-x-2 p-2 items-center active:scale-95 w-30">
                        <TrashIcon className="w-5" />
                        <p> delete </p>
                    </div>
                </motion.div>
            </AnimatePresence>
        </>
    )
}