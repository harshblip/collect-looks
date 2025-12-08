'use client'

import { ChevronRightIcon } from "@heroicons/react/24/solid"
import { useAppSelector } from "@/lib/store"
import { useEffect, useState } from "react"
import { useGetAllFiles } from "../hooks/useMedia"
import { motion, AnimatePresence } from 'framer-motion';
import Card from "../components/shared/Card"
import MoreOptions from "../components/ui/widgets/MoreOptions"
import ColumnHeaders from "../components/ui/primitives/ColumnHeaders"
import ToggleHeading from "../components/ui/widgets/ToggleHeading"
import { setSelectedFolders, setFolderItems, setViewFolder } from "@/lib/slice/folderSlice"
import { Files } from "@/types/mediaTypes"
import { useGetFolderItems } from "../hooks/useFolder"
import { useDispatch } from "react-redux"
import { Pixelify_Sans } from "next/font/google"
import LockScreen from "../components/shared/LockScreen";
import { setIndex } from "@/lib/slice/folderSlice";
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon, ChevronLeftIcon, ExclamationTriangleIcon, EyeIcon, FingerPrintIcon, FolderIcon, FolderOpenIcon, MagnifyingGlassIcon, PlusIcon, SparklesIcon, StarIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation"
import { setViewMediaFiles } from "@/lib/slice/filesSlice"
import { setDemoCheck, setViewMedia } from "@/lib/slice/generalSlice"
import Status from "../components/shared/Status"
import { setParentId } from "@/lib/slice/userSlice"
import KeyFeaturesPanel from "../components/ui/placeholders/KeyFeaturesPanel"
import MotionFileItem from "../components/ui/primitives/PageTransition"
import ErrorPage from "../components/ui/placeholders/ErrorPage"

const pixel = Pixelify_Sans({
    weight: ['400', '500'],
    subsets: ['cyrillic', 'latin']
})

export default function Dashboard() {

    const files = useAppSelector(state => state.files.files)
    const viewFolder = useAppSelector(state => state.folders.viewFolder)
    const folderItemsArray = useAppSelector(state => state.folders.folderItems)
    const userId = useAppSelector(state => state.user.EUID.userId)
    const access_token = useAppSelector(state => state.user.EUID.authToken)
    const check = useAppSelector(state => state.utility.demoCheck)
    const dispatch = useDispatch()
    const router = useRouter()

    const [selectedFolderId, setSelectedFolderId] = useState<number>(0)
    const [count, setCount] = useState<number>(1)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [show, setShow] = useState<boolean>(false)
    const [showError, setShowError] = useState<boolean>(true)
    const [password, setPassword] = useState<string>("")
    const [locked, setLocked] = useState<boolean>(false)

    const { data: allFiles, error: getAllFilesError } = useGetAllFiles(userId, currentPage, access_token)
    const { data: folderItems, error: getFolderItemsError } = useGetFolderItems(userId, selectedFolderId)
    const globalError: any = getAllFilesError || getFolderItemsError

    useEffect(() => {
        if (!userId) {
            setShowError(true)
            const timeout = setTimeout(() => {
                router.push('/')
            }, 2000)
            return () => clearTimeout(timeout)
        }
    }, [])

    useEffect(() => {
        if (folderItems) {
            dispatch(setFolderItems(folderItems))
        }
    }, [folderItems])

    const folders = useAppSelector(state => state.folders.selectedFolders)

    function openFolder(x: Files) {
        const obj = {
            id: x.id,
            name: x.file_name
        }
        if (folders) {
            dispatch(setSelectedFolders([...folders, obj]))
        } else {
            dispatch(setSelectedFolders([obj]))
        }
        setCount(prevCount => prevCount + 1)
        dispatch(setViewFolder(true))
        setSelectedFolderId(x.id)
        dispatch(setParentId(x.id))
        if (x.is_locked) {
            setLocked(true)
            setPassword(x.password || '')
        }
    }

    console.log("parent_id", selectedFolderId, folders)

    function openMedia(x: number, type: string) {
        dispatch(setIndex(x))
        dispatch(setViewMedia(true))
        if (type === 'allFiles' && allFiles) {
            dispatch(setViewMediaFiles(allFiles))
        } else if (type === 'folderFiles' && folderItems) {
            console.log("folderItems", folderItems)
            dispatch(setViewMediaFiles(folderItems))
        }
    }

    useEffect(() => {
        viewFolder ? folderItems && dispatch(setViewMediaFiles(folderItems)) : allFiles && dispatch(setViewMediaFiles(allFiles))
    }, [viewFolder])


    const openFiles = useAppSelector(state => state.files.viewMediaFiles)
    const pages = viewFolder ? folderItems && Math.max(1, Math.ceil(folderItems.length / 15)) : allFiles && Math.max(1, Math.ceil(allFiles[0].total_count / 15))

    useEffect(() => {
        !userId ? setShowError(true) : setShowError(false)
    }, [userId])

    const [btns, setBtns] = useState<number[]>([])
    useEffect(() => {
        setBtns(Array(pages).fill(0))
        // folders.length < 1 && dispatch(setParentId(null))
    }, [pages])
    console.log("error", userId)
    return (
        <>
            {
                globalError && <MotionFileItem
                    className="absolute bottom-5 right-5">
                    <Status
                        type="ERROR"
                        message={globalError.message}
                    />
                </MotionFileItem>
            }
            {
                showError ? <ErrorPage /> : check ? <div className="font-product flex flex-col items-center justify-center z-1 mt-[2.5%]">
                    <p className={`${pixel.className} text-secondary text-2xl`}> welcome to <span className="font-product text-primary text-3xl ml-1">Collect</span> </p>
                    <div className="flex space-x-4 items-center mt-4">
                        <textarea
                            className={`${pixel.className} outline-none border border-gray-200 h-[26rem] w-[36rem] p-4 text-lg active:border-none active:shadow-md text-gray-600 rounded-md transition focus:shadow-md`}
                        />
                    </div>

                    <button
                        onClick={() => dispatch(setDemoCheck(false))}
                        className="border border-black w-[12rem] p-2 text-gray-600 hover hover:bg-gray-600 hover:text-white transition mt-10">Lets get started</button>
                </div> : <div className="flex flex-col space-y-0 mt-4 p-8 font-product">
                    {
                        viewFolder ? <ToggleHeading
                            isLocked={setLocked}
                        /> : <MotionFileItem
                            className="text-4xl w-[75%] fixed font-medium h-40 pt-10 -mt-12 text-primary bg-white"> Welcome to Collect </MotionFileItem>
                    }
                    {
                        locked ? <LockScreen
                            password={password}
                            setLocked={setLocked}
                        /> : <div className="flex flex-col mt-16 bg-white">
                            {
                                files && files.length ? <MoreOptions /> : <div className="flex flex-col">
                                    <MotionFileItem
                                        className={`flex fixed space-x-4 text-primary hover:bg-gray-100 transition-all rounded-lg hover p-3 w-[75%] bg-white z-1 ${viewFolder && `-mt-12`}`}
                                        onClick={() => setShow(!show)}
                                    >
                                        <div
                                            className={`transition-transform duration-300 ease-in-out ${show ? 'rotate-90' : 'rotate-0'}`}
                                        >
                                            <ChevronRightIcon className="w-6" />
                                        </div>

                                        <p className="text-xl text-primary"> Your files </p>
                                    </MotionFileItem>
                                    {
                                        !show && <KeyFeaturesPanel />
                                    }
                                </div>
                            }
                            <AnimatePresence>
                                {show && (
                                    <MotionFileItem
                                        className={`${viewFolder && `-mt-10`} p-6`}
                                    >
                                        {/* Column Headers */}
                                        <ColumnHeaders />

                                        <div className="flex flex-col divide-y divide-gray-100 mt-4">
                                            {
                                                viewFolder ? folderItemsArray?.map((x, i) => (
                                                    <MotionFileItem
                                                        key={i}
                                                        onDoubleClick={() => x.file_type === null ? openFolder(x) : openMedia(i, 'folderFiles')}
                                                        className="-mt-0"
                                                    >
                                                        <Card data={x} />
                                                    </MotionFileItem>
                                                ))
                                                    : allFiles?.map((x, i) => (
                                                        <MotionFileItem
                                                            key={i}
                                                            onDoubleClick={() => x.file_type === null ? openFolder(x) : openMedia(i, 'allFiles')}
                                                        >
                                                            <Card data={x} />
                                                        </MotionFileItem>
                                                    ))
                                            }
                                        </div>
                                    </MotionFileItem>
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