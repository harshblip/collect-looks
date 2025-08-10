import { CloudIcon, EllipsisVerticalIcon, InformationCircleIcon, MapIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "framer-motion";
import { Pixelify_Sans } from "next/font/google";

const pixel = Pixelify_Sans({
    weight: ['400', '500'],
    subsets: ['cyrillic', 'latin']
})

export default function EmptyStarPage() {
    return (
        <>
            <AnimatePresence>
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                    className="p-6 flex flex-col"
                >
                    <div className="flex items-center justify-around">
                        <CloudIcon className="w-12 text-gray-300 -mt-12" />
                        <CloudIcon className="w-12 text-gray-400 mt-12 -mr-24" />
                        <CloudIcon className="w-6 text-gray-300 -mt-24" />
                        <CloudIcon className="w-24 text-gray-400 -ml-[8rem] -mt-14" />
                        <CloudIcon className="w-10 text-gray-400 mt-10" />
                        <CloudIcon className="w-12 text-gray-300 mt-10" />
                    </div>
                    <p className={`${pixel.className} flex justify-center mt-24 text-secondary text-4xl`}>
                        NULL
                    </p>
                    <div className="flex justify-around mt-32">
                        <MapIcon className="w-12 text-gray-300 rotate-20" />
                        <MapIcon className="w-12 text-gray-400 ml-12 rotate-40" />
                        <MapIcon className="w-6 text-gray-300 -mt-12 ml-24 -rotate-20" />
                        <MapIcon className="w-12 text-gray-400 rotate-10 ml-[8rem] mt-14" />
                        <MapIcon className="w-10 text-gray-400 mt-10 rotate-90" />
                        <MapIcon className="w-12 text-gray-300 -mt-4 ml-32" />
                    </div>
                    <div className="flex justify-center z-1 -mt-[4rem]">
                        <div>
                        </div>
                        <div className="bg-gray-100 rounded-md p-4">
                            <p className={` flex items-center text-gray-500 text-md`}> <span><InformationCircleIcon className="w-4 text-gray-600 mr-2" /></span> start by starring files using the <EllipsisVerticalIcon className="w-4 text-gray-600" /> and clicking the star icon</p>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
        </>
    )
}