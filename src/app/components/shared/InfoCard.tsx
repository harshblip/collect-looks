import { useGetFileInfo } from "@/app/hooks/useMedia";
import { Files } from "@/types/mediaTypes";
import { FolderIcon } from "@heroicons/react/24/solid";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

export default function InfoCard({ data }: { data: Files }) {
    return (
        <>
            <AnimatePresence>
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.1, ease: 'easeInOut' }}
                    className="absolute bg-black/20 top-0 bottom-0 w-full flex justify-center items-center -ml-12 font-product z-1"
                >
                    <div className="bg-white rounded-md p-4 flex flex-col">
                        {
                            data.file_url ? <Image
                                src={data.file_url}
                                height={0}
                                width={100}
                                className="rounded-md"
                                alt={`${data.file_name}`}
                            /> : <FolderIcon />
                        }

                        <div className="flex flex-col space-y-2">
                            <p className="font-sm text-secondary"> name </p>
                            <p className="mt-4 text-primary"> {data.file_name} </p>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
        </>
    )
}