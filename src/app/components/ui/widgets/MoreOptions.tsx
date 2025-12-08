import { setFiles } from "@/lib/slice/filesSlice";
import { setFileModal } from "@/lib/slice/filesSlice";
import { useAppSelector } from "@/lib/store";
import { ArrowDownTrayIcon, PlusCircleIcon, TrashIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";

export default function MoreOptions() {
    const dispatch = useDispatch()
    const files = useAppSelector(state => state.files.files)
    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="fixed transition-all rounded-lg hover p-3 w-[75%] bg-gray-100 text-white z-1">
                <div className="flex justify-between space-x-4 bg-gray-400 p-2 rounded-md">
                    <div className="flex space-x-2">
                        <button onClick={() => dispatch(setFiles([]))}>
                            <XMarkIcon className="w-6 hover" />
                        </button>
                        <p className="p-2"> {files.length} selected </p>
                    </div>
                    <div className="flex space-x-6 mr-6">
                        <button className="flex space-x-2 active:scale-95">
                            <TrashIcon className={`w-6 hover`} />
                        </button>
                        <button
                            className="flex space-x-2 active:scale-95"
                            onClick={() => dispatch(setFileModal(true))}
                        >
                            <PlusCircleIcon className="w-6 hover" />
                        </button>
                        <button className="flex space-x-2 active:scale-95">
                            <ArrowDownTrayIcon className="w-6 hover" />
                        </button>
                    </div>
                </div>
            </motion.div>
        </>
    )
}