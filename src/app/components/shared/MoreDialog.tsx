'use client'

import { AnimatePresence, motion } from "framer-motion";
import { InformationCircleIcon, StarIcon, TrashIcon } from "@heroicons/react/24/solid";

export default function MoreDialog() {
    return (
        <>
            <AnimatePresence>
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.1, ease: 'easeInOut' }}
                    className="bg-white absolute font-product font-medium rounded-lg shadow-lg p-4 flex flex-col space-y-2"
                // onBlur={() => setShow((show) => !show)}
                >
                    <div
                        className="flex hover hover:bg-gray-100 rounded-lg space-x-2 items-center text-secondary p-2 active:scale-95"
                        onClick={() => {}}
                    >
                        <StarIcon className="w-4" />
                        <p> star </p>
                    </div>
                    <div className="flex hover hover:bg-gray-100 space-x-2 p-2 items-center text-secondary active:scale-95">
                        <InformationCircleIcon className="w-4" />
                        <p> info </p>
                    </div>
                    <div className="flex hover hover:bg-gray-100 space-x-2 p-2 items-center text-secondary active:scale-95">
                        <TrashIcon className="w-4" />
                        <p> delete </p>
                    </div>
                </motion.div>
            </AnimatePresence>
        </>
    )
}