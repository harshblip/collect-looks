'use client'

import { useAppSelector } from "@/lib/store"
import { useEffect, useState } from "react"
import { useGetAllFiles } from "../hooks/useMedia"
import { motion, AnimatePresence } from 'framer-motion';
import Card from "../components/shared/Card"
import MoreOptions from "../components/ui/MoreOptions"
import ColumnHeaders from "../components/ui/ColumnHeaders"
import { ChevronRightIcon } from "@heroicons/react/24/solid"
import ToggleHeading from "../components/ui/ToggleHeading"
import { setFolderItems, setViewFolder } from "@/lib/slice/statesSlice"
import { setSelectedFolders } from "@/lib/slice/statesSlice"
import { Files } from "@/types/mediaTypes"
import { useGetFolderItems } from "../hooks/useFolder"
import { useDispatch } from "react-redux"
import { Pixelify_Sans } from "next/font/google"
import LockScreen from "../components/shared/LockScreen";

const pixel = Pixelify_Sans({
    weight: ['400', '500'],
    subsets: ['cyrillic', 'latin']
})

export default function Dashboard() {


    const token = useAppSelector((state) => state.auth.authToken);
    const files = useAppSelector(state => state.folderStates.files)
    const viewFolder = useAppSelector(state => state.states.viewFolder)
    const folderItemsArray = useAppSelector(state => state.states.folderItems)
    const dispatch = useDispatch()

    const [selectedFolderId, setSelectedFolderId] = useState<number>(0)
    const [show, setShow] = useState<boolean>(false)
    const [password, setPassword] = useState<string>("")
    const [error, setError] = useState<string>("")
    const [locked, setLocked] = useState<boolean>(false)

    const { data: allFiles } = useGetAllFiles(3)
    const { data: folderItems } = useGetFolderItems(3, selectedFolderId)

    useEffect(() => {
        if (folderItems) {
            dispatch(setFolderItems(folderItems))
        }
    }, [folderItems])

    useEffect(() => {
        // if (!token) {
        //     setCheck(!check)
        //     const createInterval = setInterval(() => {
        //         setCount(prevCount => prevCount - 1)
        //     }, 1000)
        //     return () => clearInterval(createInterval)
        // }
    }, [])

    const folders = useAppSelector(state => state.states.selectedFolders)

    function openFolder(x: Files) {
        dispatch(setViewFolder(true))
        setSelectedFolderId(x.id)
        console.log("locked ?", x.is_locked)
        setError('')
        const obj = {
            id: x.id,
            name: x.file_name
        }
        if (x.is_locked) {
            setLocked(true)
            setPassword(x.password || '')
        }
        if (folders) {
            dispatch(setSelectedFolders([...folders, obj]))
        } else {
            dispatch(setSelectedFolders([obj]))
        }
    }
    
    console.log(selectedFolderId)
    console.log(viewFolder)

    // if (count === 0) {
    //     router.push('/signup')
    // }

    return (
        <>
            <div className="flex flex-col space-y-0 mt-4 p-8 font-product">
                {
                    viewFolder ? <ToggleHeading
                        isLocked={setLocked}
                    /> : <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="text-4xl w-[75%] fixed font-medium h-40 pt-10 -mt-12 text-primary bg-white z-1"> Welcome to Collect </motion.p>
                }
                {
                    locked ? <LockScreen
                        password={password}
                        setLocked={setLocked}
                    /> : <div className="flex flex-col mt-16 bg-white">
                        {
                            files && files.length ? <MoreOptions /> : <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.2 }}
                                className="flex fixed space-x-4 text-primary hover:bg-gray-100 transition-all rounded-lg hover p-3 w-[75%] bg-white z-1"
                                onClick={() => setShow(!show)}
                            >
                                <div
                                    className={`transition-transform duration-300 ease-in-out ${show ? 'rotate-90' : 'rotate-0'}`}
                                >
                                    <ChevronRightIcon className="w-6" />
                                </div>

                                <p className="text-xl text-primary"> Your files </p>
                            </motion.div>
                        }
                        <AnimatePresence>
                            {show && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.2 }}
                                    className="p-6"
                                >
                                    {/* Column Headers */}
                                    <ColumnHeaders />

                                    <div className="flex flex-col divide-y divide-gray-100 mt-4">
                                        {
                                            viewFolder ? folderItemsArray?.map((x, i) => (
                                                    <div
                                                        key={i}
                                                        onDoubleClick={() => openFolder(x)}
                                                    >
                                                        <Card data={x} />
                                                    </div>
                                                ))
                                            : allFiles?.map((x, i) => (
                                                <div
                                                    key={i}
                                                    onDoubleClick={() => openFolder(x)}
                                                >
                                                    <Card data={x} />
                                                </div>
                                            ))
                                        }
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                }
            </div>
        </>
    )
}