import { useGetFolderItems } from "@/app/hooks/useFolder";
import { setSelectedFolders } from "@/lib/slice/statesSlice";
import { setFolderItems, setViewFolder } from "@/lib/slice/statesSlice";
import { useAppSelector } from "@/lib/store";
import { FoldersArray } from "@/types/mediaTypes";
import { ChevronRightIcon, HomeIcon } from "@heroicons/react/24/solid";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function ToggleHeading({ isLocked }: { isLocked: React.Dispatch<React.SetStateAction<boolean>> }) {
    const folders = useAppSelector(state => state.states.selectedFolders)
    const dispatch = useDispatch()
    const { data: folderItems } = useGetFolderItems(3, folders[folders.length - 1].id)

    useEffect(() => {
        folderItems && dispatch(setFolderItems(folderItems))
    }, [folders])

    function filterFolders(a: number) {
        dispatch(setSelectedFolders(folders.slice(0, a + 1)))
    }

    return (
        <>
            <AnimatePresence>
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                >
                    <div className="flex space-x-1 truncate">
                        <HomeIcon
                            onClick={() => {
                                dispatch(setViewFolder(false))
                                dispatch(setSelectedFolders([]))
                                isLocked(false)
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
                                        <button
                                            onClick={() => filterFolders(i)}
                                            className="text-primary hover text-md">
                                            {x.name}
                                        </button>
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