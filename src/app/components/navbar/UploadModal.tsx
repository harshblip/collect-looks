import { setViewCreateFolder } from "@/lib/slice/folderSlice";
import { PlusIcon } from "@heroicons/react/24/solid";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

interface PropTypes {
    setShow: React.Dispatch<React.SetStateAction<boolean>>
    showFileUploader: React.Dispatch<React.SetStateAction<boolean>>
}

function UploadModal({ setShow, showFileUploader }: PropTypes) {
    const dispatch = useDispatch()
    return (
        <>
            <AnimatePresence>
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.1, ease: 'easeInOut' }}
                    className="bg-white absolute font-product font-medium rounded-lg shadow-lg p-4 flex flex-col space-y-2 z-2"
                // onBlur={() => setShow((show) => !show)}
                >
                    <button
                        className="flex hover hover:bg-gray-100 rounded-lg space-x-2 items-center text-secondary p-2 active:scale-95"
                        onClick={() => {
                            dispatch(setViewCreateFolder(true))
                            setShow(false)
                        }}
                    >
                        <PlusIcon className="w-4" />
                        <p> create new folder </p>
                    </button>
                    <button
                        className="flex hover hover:bg-gray-100 space-x-2 p-2 items-center text-secondary active:scale-95"
                        onClick={() => {
                            setShow(false)
                            showFileUploader(true)
                        }}
                    >
                        <PlusIcon className="w-4" />
                        <p> upload files </p>
                    </button>
                    <button className="flex hover hover:bg-gray-100 space-x-2 p-2 items-center text-secondary active:scale-95">
                        <PlusIcon className="w-4" />
                        <p> upload folder </p>
                    </button>
                </motion.div>
            </AnimatePresence>
        </>
    )
}

export default React.memo(UploadModal)