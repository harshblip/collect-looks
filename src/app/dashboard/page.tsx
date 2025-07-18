'use client'

import { useAppSelector } from "@/lib/store"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useGetAllFiles } from "../hooks/useMedia"
import { motion, AnimatePresence } from 'framer-motion';
import Card from "../components/shared/Card"
import MoreOptions from "../components/widgets/MoreOptions"
import ColumnHeaders from "../components/widgets/ColumnHeaders"
import { ChevronRightIcon } from "@heroicons/react/24/solid"
import ToggleHeading from "../components/shared/ToggleHeading"
import { setViewFolder } from "@/lib/slice/statesSlice"
import { setSelectedFolders } from "@/lib/slice/folderSlice"
import { Files } from "@/types/mediaTypes"
import { useGetFolderItems } from "../hooks/useFolder"
import { useDispatch } from "react-redux"

export default function Dashboard() {

    const token = useAppSelector((state) => state.auth.authToken);
    const files = useAppSelector(state => state.states.files)
    const viewFolder = useAppSelector(state => state.states.viewFolder)
    const dispatch = useDispatch()

    // folders
    const [selectedFolderId, setSelectedFolderId] = useState<number>(0)
    const [check, setCheck] = useState<boolean>(false)
    const [show, setShow] = useState<boolean>(false)
    const [count, setCount] = useState<number>(3)

    const { data: allFiles } = useGetAllFiles(3)
    const { data: folderItems } = useGetFolderItems(3, selectedFolderId)
    const router = useRouter();

    useEffect(() => {
        if (!token) {
            setCheck(!check)
            const createInterval = setInterval(() => {
                setCount(prevCount => prevCount - 1)
            }, 1000)
            return () => clearInterval(createInterval)
        }
    }, [])

    const folders = useAppSelector(state => state.folderStates.selectedFolders)

    function openFolder(x: Files) {
        dispatch(setViewFolder(true))
        console.log(x)
        setSelectedFolderId(x.id)
        if (folders) {
            dispatch(setSelectedFolders([...folders, x.file_name]))
        } else {
            dispatch(setSelectedFolders([x.file_name]))
        }
    }

    console.log(viewFolder)

    if (count === 0) {
        router.push('/signup')
    }

    return (
        <>
            <div className="flex flex-col space-y-0 mt-4 p-8 font-product">
                {
                    viewFolder ? <ToggleHeading /> : <p className="text-4xl w-[75%] fixed font-medium h-40 pt-10 -mt-12 text-primary bg-white"> Welcome to Collect </p>
                }
                <div className="flex flex-col mt-16 bg-white">
                    {
                        files && files.length ? <MoreOptions /> : <div
                            className="flex fixed space-x-4 text-primary hover:bg-gray-100 transition-all rounded-lg hover p-3 w-[75%] bg-white"
                            onClick={() => setShow(!show)}
                        >
                            <div
                                className={`transition-transform duration-300 ease-in-out ${show ? 'rotate-90' : 'rotate-0'}`}
                            >
                                <ChevronRightIcon className="w-6" />
                            </div>

                            <p className="text-xl text-primary"> Your files </p>
                        </div>
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
                                        viewFolder ? folderItems?.map((x, i) => (
                                            <div
                                                key={i}
                                                onDoubleClick={() => openFolder(x)}
                                            >
                                                <Card
                                                    data={x}
                                                />
                                            </div>
                                        )) : allFiles?.map((x, i) => (
                                            <div
                                                key={i}
                                                onDoubleClick={() => openFolder(x)}
                                            >
                                                <Card
                                                    data={x}
                                                />
                                            </div>
                                        ))
                                    }
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                </div>
            </div>
        </>
    )
}