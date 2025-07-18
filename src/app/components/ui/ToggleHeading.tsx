import { setSelectedFolders } from "@/lib/slice/folderSlice";
import { setViewFolder } from "@/lib/slice/statesSlice";
import { useAppSelector } from "@/lib/store";
import { ChevronRightIcon, HomeIcon } from "@heroicons/react/24/solid";
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch } from "react-redux";

export default function ToggleHeading() {
    const folders = useAppSelector(state => state.folderStates.selectedFolders)
    const dispatch = useDispatch()
    return (
        <>
            <AnimatePresence>
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                >
                    <div className="flex space-x-1">
                        <HomeIcon
                            onClick={() => {
                                dispatch(setViewFolder(false))
                                dispatch(setSelectedFolders([]))
                            }}
                            className="w-10 text-secondary hover hover:bg-gray-200 rounded-lg p-2"
                        />
                        {
                            folders && folders.map((x, i) => <motion.div
                                key={i}
                                className="flex items-center space-x-2"
                                initial={{ opacity: 0, x: -5 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.2 }}
                            >
                                {
                                    x && <>
                                        <ChevronRightIcon className="w-6 text-secondary" />
                                        <p className="text-primary text-md"> {x} </p>
                                    </>
                                }
                            </motion.div>)
                        }
                    </div>
                </motion.div>
            </AnimatePresence>
        </>
    )
}