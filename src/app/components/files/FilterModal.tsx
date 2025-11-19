import { AnimatePresence, motion } from "framer-motion";
import { Pixelify_Sans } from "next/font/google"
import { DocumentDuplicateIcon, PhotoIcon, PlayIcon, SignalIcon } from "@heroicons/react/24/solid";
interface PropType {
    setFilters: React.Dispatch<React.SetStateAction<{
        type: 'image' | 'video' | 'audio' | 'document' | '';
        locked: boolean;
        starred: boolean;
        date: string
    }>>
    filters: {
        type: 'image' | 'video' | 'audio' | 'document' | '';
        locked: boolean;
        starred: boolean;
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
                    <div className="bg-white flex flex-col rounded-lg w-[32rem] p-4">
                        <p className="flex justify-center text-gray-600 text-2xl mt-2"> Filter </p>
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
                            <div className="text-primary flex justify-between items-center">
                                <p> starred </p>
                                <div className="flex items-center">
                                    <button
                                        onClick={() => setFilters(fil => ({
                                            ...fil,
                                            starred: false
                                        }))}
                                        className={`${pixel.className} hover:bg-gray-100 w-full p-2 ${filters.starred ? `bg-amber-600 text-white` : `text-gray-600`}`}>
                                        not starred
                                    </button>
                                    <button
                                        onClick={() => setFilters(fil => ({
                                            ...fil,
                                            starred: true
                                        }))}
                                        className={`${pixel.className} p-2 ${filters.starred ? `bg-amber-600 text-white` : `text-gray-600`}`}>
                                        starred
                                    </button>
                                </div>
                            </div>
                            <div className="text-primary flex justify-between items-center">
                                <p> locked </p>
                                <div className="flex items-center">
                                    <button
                                        onClick={() => setFilters(fil => ({
                                            ...fil,
                                            locked: false
                                        }))}
                                        className={`${pixel.className} hover:bg-gray-100 w-full p-2 ${!filters.locked ? `bg-gray-500 text-white` : `text-gray-600`}`}>
                                        unlocked
                                    </button>
                                    <button
                                        onClick={() => setFilters(fil => ({
                                            ...fil,
                                            locked: true
                                        }))}
                                        className={`${pixel.className} p-2 ${filters.locked ? `bg-gray-600 text-white` : `text-gray-600`}`}>
                                        locked
                                    </button>
                                </div>
                            </div>
                            <div className="text-primary flex justify-between">
                                <p> Date </p>
                            </div>
                            <button
                                onClick={() => setShow(false)}
                                className="w-full text-gray-600 p-2 hover:bg-gray-600 hover:text-white transition border border-gray-600 hover">
                                Apply this shit
                            </button>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
        </>
    )
}