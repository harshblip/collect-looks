'use client'

import { byteToSize } from "@/app/utils/useful";
import { Files } from "@/types/mediaTypes";
import { DocumentDuplicateIcon, EllipsisVerticalIcon, PhotoIcon, PlayIcon, SignalIcon, StarIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import MoreDialog from "./MoreDialog";
import { useAppSelector } from "@/lib/store";
import { useDispatch } from "react-redux";
import { setFiles } from "@/lib/slice/folderSlice";

export default function Card({ data }: {
    data: Files
}) {
    const [show, setShow] = useState<boolean>(false)
    const files = useAppSelector(state => state.folderStates.files)
    const dispatch = useDispatch()

    // console.log("data:-> ", files)

    function addOrRemove(data: Files) {
        if (files) {
            if (files.includes(data)) {
                dispatch(setFiles(files.filter(x => x.file_name !== data.file_name)))
            } else {
                dispatch(setFiles([...files, data]))
            }
        } else {
            dispatch(setFiles([data]))
        }
    }

    return (
        <>
            <div
                onClick={() => addOrRemove(data)}
                className={`${files && files.includes(data) ? `bg-[#eef0eb]` : `bg-white`} rounded-lg p-3 space-x-4 font-product transition hover text-primary grid grid-cols-3 gap-6 px-4 py-4 items-center`}>
                <div className="flex space-x-4 items-center">
                    {
                        data.file_type === "image" ? <PhotoIcon className="text-emerald-500 w-6" /> :
                            data.file_type === "video" ?
                                <PlayIcon className="w-6 text-red-500" /> : data.file_type === "audio" ? <SignalIcon className="w-6 text-cyan-500" /> : <DocumentDuplicateIcon className="w-6 text-indigo-500" />
                    }
                    <p className="text-lg font-medium"> {data.file_name} </p>
                    {
                        data.starred ? <p className="text-lg font-medium -ml-1 mt-[0.2rem]"> <StarIcon className="w-4 text-gray-400" /> </p> : ''
                    }
                </div>
                <div className="flex justify-end">
                    <p className="text-lg font-medium"> {data.created_at.substring(0, 10)} </p>
                </div>
                <div className="flex items-center space-x-4 justify-end">
                    <p className="text-lg font-medium">
                        {data.size && byteToSize(parseInt(data.size))}
                    </p>
                    {
                        show && <div className="absolute">
                            <MoreDialog
                                id={data.id}
                                showMe={setShow}
                            />
                        </div>
                    }
                    <button
                        className="hover text-lg font-medium"
                        onClick={() => setShow(true)}
                    > <EllipsisVerticalIcon className="w-5" /> </button>
                </div>
            </div>
        </>
    )
}