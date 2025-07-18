import { setFileModal, setFiles } from "@/lib/slice/statesSlice";
import { useAppSelector } from "@/lib/store";
import { ArrowDownTrayIcon, PlusCircleIcon, TrashIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";

export default function MoreOptions() {
    const dispatch = useDispatch()
    const files = useAppSelector(state => state.states.files)
    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="flex justify-between fixed space-x-4 text-primary transition-all rounded-lg hover p-3 w-[75%] bg-[url('https://cdn.dribbble.com/userupload/36271059/file/original-cbbe37d7a258e4acb0d9c6ac94e7f4c8.jpg?resize=2048x1365&vertical=center')] bg-center">
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
            </motion.div>
        </>
    )
}