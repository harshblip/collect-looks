'use client'

import { ChevronRightIcon } from "@heroicons/react/24/solid"
import { useAppSelector } from "@/lib/store"
import { useEffect, useState } from "react"
import { useGetAllFiles } from "../hooks/useMedia"
import { motion, AnimatePresence } from 'framer-motion';
import Card from "../components/shared/Card"
import MoreOptions from "../components/ui/MoreOptions"
import ColumnHeaders from "../components/ui/ColumnHeaders"
import ToggleHeading from "../components/ui/ToggleHeading"
import { setSelectedFolders, setFolderItems, setViewFolder } from "@/lib/slice/folderSlice"
import { Files } from "@/types/mediaTypes"
import { useGetFolderItems } from "../hooks/useFolder"
import { useDispatch } from "react-redux"
import { Pixelify_Sans } from "next/font/google"
import LockScreen from "../components/shared/LockScreen";
import { setIndex, setParentId } from "@/lib/slice/folderSlice";
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon, ChevronLeftIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation"
import { setViewMediaFiles } from "@/lib/slice/filesSlice"
import { setViewMedia } from "@/lib/slice/generalSlice"
import Status from "../components/shared/Status"

const pixel = Pixelify_Sans({
    weight: ['400', '500'],
    subsets: ['cyrillic', 'latin']
})

export default function Dashboard() {

    const token = useAppSelector((state) => state.user.authToken);
    const files = useAppSelector(state => state.files.files)
    const viewFolder = useAppSelector(state => state.folders.viewFolder)
    const folderItemsArray = useAppSelector(state => state.folders.folderItems)
    const dispatch = useDispatch()
    const router = useRouter()

    const [selectedFolderId, setSelectedFolderId] = useState<number>(0)
    const [count, setCount] = useState<number>(1)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [show, setShow] = useState<boolean>(false)
    const [showError, setShowError] = useState<boolean>(false)
    const [password, setPassword] = useState<string>("")
    const [locked, setLocked] = useState<boolean>(false)

    const { data: allFiles, error } = useGetAllFiles(3, currentPage)
    const { data: folderItems } = useGetFolderItems(3, selectedFolderId)

    useEffect(() => {
        // if (!user) {
        //     setShowError(true)
        //     const timeout = setTimeout(() => {
        //         // router.push('/')
        //     }, 2000)
        //     return () => clearTimeout(timeout)
        // }
    }, [])

    useEffect(() => {
        if (folderItems) {
            dispatch(setFolderItems(folderItems))
        }
    }, [folderItems])

    const folders = useAppSelector(state => state.folders.selectedFolders)

    function openFolder(x: Files) {
        setCount(prevCount => prevCount + 1)
        if (folders.length !== 1) {
            console.log(selectedFolderId)
            dispatch(setParentId(selectedFolderId))
        }

        dispatch(setViewFolder(true))
        setSelectedFolderId(x.id)
        console.log("locked ?", x.is_locked)
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

    function openMedia(x: number, type: string) {
        dispatch(setIndex(x))
        dispatch(setViewMedia(true))
        if (type === 'allFiles' && allFiles) {
            dispatch(setViewMediaFiles(allFiles))
        } else if (type === 'folderFiles' && folderItems) {
            dispatch(setViewMediaFiles(folderItems))
        }
    }

    useEffect(() => {
        viewFolder ? folderItems && dispatch(setViewMediaFiles(folderItems)) : allFiles && dispatch(setViewMediaFiles(allFiles))
    }, [viewFolder])


    const openFiles = useAppSelector(state => state.files.viewMediaFiles)
    const pages = viewFolder ? folderItems && Math.max(1, Math.ceil(folderItems.length / 15)) : allFiles && Math.max(1, Math.ceil(allFiles[0].total_count / 15))

    const [btns, setBtns] = useState<number[]>([])
    useEffect(() => {
        setBtns(Array(pages).fill(0))
    }, [pages])
    console.log("error", error)
    return (
        <>
            {
                error || error && <div className="absolute top-20 right-50 left-50">
                    <Status
                        type="ERROR"
                        message={error}
                    />
                </div>
            }
            {
                showError ? <div className="flex justify-center z-1 mt-[15%]">
                    <div className="font-product text-xl w-1/2 h-[12rem] rounded-md p-4 flex flex-col space-y-2 items-center justify-between">
                        <div className="flex items-center space-x-6 mt-10">
                            <p className={`text-red-200 text-2xl -mt-1`}> error </p>
                            <div>
                                <p className={`text-gray-200 text-7xl`}> LOL </p>
                            </div>
                        </div>
                    </div>
                </div> : <div className="flex flex-col space-y-0 mt-4 p-8 font-product">
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
                                    className={`flex fixed space-x-4 text-primary hover:bg-gray-100 transition-all rounded-lg hover p-3 w-[75%] bg-white z-1 ${viewFolder && `-mt-12`}`}
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
                                        className={`${viewFolder && `-mt-10`} p-6`}
                                    >
                                        {/* Column Headers */}
                                        <ColumnHeaders />

                                        <div className="flex flex-col divide-y divide-gray-100 mt-4">
                                            {
                                                viewFolder ? folderItemsArray?.map((x, i) => (
                                                    <motion.div
                                                        initial={{ opacity: 0, y: -10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, y: -20 }}
                                                        transition={{ duration: 0.2 }}
                                                        key={i}
                                                        onDoubleClick={() => x.file_type === null ? openFolder(x) : openMedia(i, 'folderFiles')}
                                                        className="-mt-0"
                                                    >
                                                        <Card data={x} />
                                                    </motion.div>
                                                ))
                                                    : allFiles?.map((x, i) => (
                                                        <motion.div
                                                            initial={{ opacity: 0, y: -10 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            exit={{ opacity: 0, y: -20 }}
                                                            transition={{ duration: 0.2 }}
                                                            key={i}
                                                            onDoubleClick={() => x.file_type === null ? openFolder(x) : openMedia(i, 'allFiles')}
                                                        >
                                                            <Card data={x} />
                                                        </motion.div>
                                                    ))
                                            }
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                            {
                                show && <div className="flex space-x-2 justify-center items-center bg-white shadow-md rounded-md p-2 text-secondary absolute right-25 bottom-15">
                                    <ChevronDoubleLeftIcon className="w-4 hover" />
                                    <ChevronLeftIcon
                                        onClick={() => setCurrentPage((cr) => cr > 0 ? cr - 1 : cr)}
                                        className="w-4 hover" />
                                    {
                                        btns.map((_, i) => <button
                                            key={i}
                                            onClick={() => setCurrentPage(i + 1)}
                                            className="bg-transparent outline-none p-1 pr-2 pl-2 hover hover:bg-gray-200 rounded-sm">
                                            {i + 1}
                                        </button>)
                                    }
                                    <ChevronRightIcon
                                        onClick={() => setCurrentPage((cr) => cr < btns.length ? cr + 1 : cr)}
                                        className="w-4 hover" />
                                    <ChevronDoubleRightIcon className="w-4 hover" />
                                </div>
                            }
                        </div>
                    }
                </div>
            }
        </>
    )
}