'use client'

import { AnimatePresence, motion } from "framer-motion"
import { useAddFilestoFolder, useGetFolders } from "../hooks/useFolder"
import { FolderIcon } from "@heroicons/react/24/solid"
import { Files } from "@/types/mediaTypes"
import { useState } from "react"
import { xonokai } from "@react-email/components"
import { useAppSelector } from "@/lib/store"
import { setFileModal } from "@/lib/slice/statesSlice"
import { useDispatch } from "react-redux"

interface Props {
    show: boolean
}

export default function FolderList({ show }: Props) {
    const { data } = useGetFolders(3)
    const [id, setId] = useState<number>(0)
    const files = useAppSelector(state => state.states.files)
    const dispatch = useDispatch()

    const { mutate: addFilesToFolder } = useAddFilestoFolder()

    console.log("data", id, typeof id)
    return (
        <>
            <AnimatePresence>
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.1, ease: 'easeInOut' }}
                    className="absolute bg-black/20 top-0 bottom-0 w-full flex justify-center items-center font-product -ml-8 h-full z-1">
                    <div className="bg-white bg-[url('https://cdn.dribbble.com/userupload/43609485/file/original-4d5208449d51a62c489343742821ef18.png?resize=1504x1128&vertical=center')] bg-center bg-contain h-[64%] w-[30rem] rounded-lg flex flex-col items-center text-primary">
                        <div className=" flex flex-col mt-6 space-y-12 p-4">
                            <h4>Add to a folder</h4>
                            <div className="flex space-x-4 items-start">
                                {
                                    data?.map((x, i) => <div
                                        key={i}
                                        className="flex flex-col space-y-2 hover:bg-gray-200/50 p-4 hover transition rounded-md"
                                        onClick={() => setId(x.id)}
                                    >
                                        <FolderIcon width={60} color="text-secondary" />
                                        <p> {x.file_name} </p>
                                    </div>
                                    )
                                }
                            </div>
                            <div className={`flex justify-around w-full items-center mt-16`}>
                                <button
                                    className="text-primary rounded-md w-[10rem] border-2 border-gray-200 p-3 hover"
                                    onClick={() => dispatch(setFileModal(false))}
                                >
                                    cancel
                                </button>
                                {
                                    id && <button
                                        className=" rounded-md w-[10rem] border-none bg-gray-600 text-white p-3 hover"
                                        onClick={() => addFilesToFolder({files: files, folderId: id})}
                                    >
                                        create
                                    </button>
                                }
                            </div>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
        </>
    )
}