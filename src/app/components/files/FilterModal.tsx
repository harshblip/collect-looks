'use client'

import { AnimatePresence, motion } from "framer-motion";
import { Pixelify_Sans } from "next/font/google"
import { DocumentDuplicateIcon, PhotoIcon, PlayIcon, SignalIcon } from "@heroicons/react/24/solid";
import { Calendar29 } from "../navbar/DatePicker";
import { SparklesIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
interface PropType {
    setFilters: React.Dispatch<React.SetStateAction<{
        type: 'image' | 'video' | 'audio' | 'document' | '';
        locked: boolean | null;
        starred: boolean | null;
        date: string
    }>>
    filters: {
        type: 'image' | 'video' | 'audio' | 'document' | '';
        locked: null;
        starred: null;
        date: string
    }
    show: boolean,
    setShow: React.Dispatch<React.SetStateAction<boolean>>
}

const pixel = Pixelify_Sans({
    weight: ['400', '500'],
    subsets: ['cyrillic', 'latin']
})

export default function FilterModal({ setFilters, filters, show, setShow }: PropType) {
    const [showInfo, setShowInfo] = useState<boolean>(true)
    return (
        <>
            <AnimatePresence>
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.1, ease: 'easeInOut' }}
                    className="font-product absolute bg-black/20 flex justify-center items-center w-full top-0 bottom-0 -ml-8 z-10"
                // onClick={() => setShow(false)}
                >
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.1, ease: 'easeInOut' }}
                        className="bg-[url('/sample-bg.png')] bg-center bg-contain flex flex-col rounded-lg w-[32rem] p-4">
                        <p className="flex justify-center text-gray-600 text-2xl mt-4 font-medium"> Advanced search </p>
                        <div className="flex flex-col space-y-6 p-4 mt-4 text-md">
                            <div className="text-primary flex flex-col space-y-2 justify-between">
                                <p> Filter by type </p>
                                <div className={`transition text-gray-600 items-center flex space-x-4  ${pixel.className}`}>
                                    <button onClick={() => setFilters(fil => ({
                                        ...fil,
                                        type: 'image'
                                    }))}
                                        className={`flex justify-center w-full p-2  hover ${filters.type === 'image' ? `bg-gray-600 text-white` : `hover:bg-gray-100`}`}>
                                        <PhotoIcon
                                            width={20}
                                            className="mr-2"
                                        />
                                        image
                                    </button>
                                    <button
                                        onClick={() => setFilters(fil => ({
                                            ...fil,
                                            type: 'video'
                                        }))}
                                        className={`p-2 flex justify-center hover  ${filters.type === 'video' ? `bg-gray-600 text-white` : `text-gray-600 hover:bg-gray-100`}`}>
                                        <PlayIcon
                                            width={20}
                                            className="mr-2"
                                        />
                                        video
                                    </button>
                                    <button
                                        onClick={() => setFilters(fil => ({
                                            ...fil,
                                            type: 'audio'
                                        }))}
                                        className={`w-full p-2 flex justify-center hover ${filters.type === 'audio' ? `bg-gray-600 text-white` : `text-gray-600 hover:bg-gray-100`}`}>
                                        <SignalIcon
                                            width={20}
                                            className="mr-2"
                                        />
                                        audio
                                    </button>
                                    <button
                                        onClick={() => setFilters(fil => ({
                                            ...fil,
                                            type: 'document'
                                        }))}
                                        className={`${filters.type === 'document' ? `bg-gray-600 text-white` : `text-gray-600 hover:bg-gray-100`} p-2  hover flex justify-center`}>
                                        <DocumentDuplicateIcon
                                            width={20}
                                            className="mr-2"
                                        />
                                        document
                                    </button>
                                </div>
                            </div>
                            <div className="text-primary flex justify-between items-center font-medium">
                                <p> starred </p>
                                <div className={`${pixel.className} flex items-center`}>
                                    <button
                                        onClick={() => setFilters(fil => ({
                                            ...fil,
                                            starred: fil.starred === false ? null : false
                                        }))}
                                        className={`${!filters.starred && filters.starred !== null ? `bg-gray-600 text-white` : `text-gray-600 hover:bg-gray-100`} p-2  hover flex justify-center`}>
                                        not starred
                                    </button>
                                    <button
                                        onClick={() => setFilters(fil => ({
                                            ...fil,
                                            starred: fil.starred === true ? null : true
                                        }))}
                                        className={`${filters.starred && filters.starred !== null ? `bg-gray-600 text-white` : `text-gray-600 hover:bg-gray-100`} p-2  hover flex justify-center`}>
                                        starred
                                    </button>
                                </div>
                            </div>
                            <div className="text-primary flex justify-between items-center">
                                <p> locked </p>
                                <div className={`${pixel.className} flex items-center`}>
                                    <button
                                        onClick={() => setFilters(fil => ({
                                            ...fil,
                                            locked: fil.locked === false ? null : false
                                        }))}
                                        className={`${!filters.locked && filters.locked !== null ? `bg-gray-600 text-white` : `text-gray-600 hover:bg-gray-100`} p-2  hover flex justify-center`}>
                                        unlocked
                                    </button>
                                    <button
                                        onClick={() => setFilters(fil => ({
                                            ...fil,
                                            locked: fil.locked === true ? null : true
                                        }))}
                                        className={`${filters.locked && filters.locked !== null ? `bg-gray-600 text-white` : `text-gray-600 hover:bg-gray-100`} p-2  hover flex justify-center`}>
                                        locked
                                    </button>
                                </div>
                            </div>
                            <div className="text-primary flex justify-between items-center">
                                <p> Date </p>
                                <div>
                                    <Calendar29 />
                                </div>
                            </div>
                            {
                                showInfo && <div className="p-3 w-full rounded-md bg-gray-100 flex space-x-4 items-center">
                                    <SparklesIcon
                                        width={20}
                                        className="text-secondary"
                                    />
                                    <p className="text-sm text-secondary">try using natural language, like <i>tomorrow</i>, <i>next week</i> to set dates</p>
                                    <button
                                        onClick={() => setShowInfo(false)}
                                        className="hover">
                                        <XMarkIcon
                                            width={20}
                                            className="text-secondary -mt-6 ml-4"
                                        />
                                    </button>
                                </div>
                            }
                            <button
                                onClick={() => setShow(false)}
                                className="w-full text-gray-600 p-2 hover:bg-gray-600 hover:text-white transition border border-gray-600 hover">
                                Apply this shit
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            </AnimatePresence>
        </>
    )
}