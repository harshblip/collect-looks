'use client'

import { PlusIcon } from "@heroicons/react/24/solid";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import CreateFolder from "../widgets/CreateFolder";

export default function UploadModal() {
    const [show, setShow] = useState<boolean>(false)
    console.log(show)
    return (
        <>
            {
                show && <CreateFolder 
                    
                />
            }
            <AnimatePresence>
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.1, ease: 'easeInOut' }}
                    onClick={() => console.log("clicked div")}
                    className="bg-white  font-product font-medium rounded-lg shadow-lg p-4 flex flex-col space-y-2">
                    <div
                        className="flex hover hover:bg-gray-100 rounded-lg space-x-2 items-center text-secondary p-2"
                        onClick={() => setShow(true)}
                    >
                        <PlusIcon className="w-4" />
                        <p> create new folder </p>
                    </div>
                    <div className="flex hover hover:bg-gray-100 space-x-2 p-2 items-center text-secondary">
                        <PlusIcon className="w-4" />
                        <p> upload files </p>
                    </div>
                    <div className="flex hover hover:bg-gray-100 space-x-2 p-2 items-center text-secondary">
                        <PlusIcon className="w-4" />
                        <p> upload folder </p>
                    </div>
                </motion.div>
            </AnimatePresence>
        </>
    )
}