import { AnimatePresence, motion } from "framer-motion"
import { useGetFolders } from "../hooks/useFolder"

export default function FolderList({ show }: { show: React.Dispatch<React.SetStateAction<boolean>> }) {
    const { data } = useGetFolders("3")
    return (
        <>
            <AnimatePresence>
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.1, ease: 'easeInOut' }}
                    className="absolute bg-black/20 top-0 bottom-0 w-full flex justify-center items-center -ml-12 font-product z-1">
                    <div className="bg-white bg-[url('https://cdn.dribbble.com/userupload/43609485/file/original-4d5208449d51a62c489343742821ef18.png?resize=1504x1128&vertical=center')] bg-center bg-contain h-[64%] w-[30rem] rounded-lg flex flex-col justify-center items-center text-primary">
                        <div className="bg-white flex flex-col p-4">
                            <h4>Add to a folder</h4>
                            {
                                data?.map((x, i) =>
                                    <p> {x.file_name} </p>
                                )
                            }
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
        </>
    )
}