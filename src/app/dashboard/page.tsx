'use client'

import { setAuthState } from "@/lib/slice/userSlice"
import { useAppSelector } from "@/lib/store"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { ArrowDownTrayIcon, ArrowRightIcon, Bars3Icon, CheckCircleIcon, ChevronRightIcon, ExclamationTriangleIcon, PlusCircleIcon, TableCellsIcon, TrashIcon, XMarkIcon } from "@heroicons/react/24/solid"
import { setLoadingState, setMedia } from "@/lib/slice/statesSlice"
import { useGetAllFiles, useMedia } from "../hooks/useMedia"
import { useFolder } from "../hooks/useFolder"
import { motion, AnimatePresence } from 'framer-motion';
import { AllFiles } from "@/types/mediaTypes"
import Card from "../components/shared/Card"

export default function Dashboard() {

    const token = useAppSelector((state) => state.auth.authToken);
    const media = useAppSelector(state => state.states.media);
    const folders = useAppSelector(state => state.states.folders)
    const { getImages } = useMedia()
    const { data, error, isLoading } = useGetAllFiles("manan2@gmail.com")
    const { createFolder, getFolder } = useFolder()

    const [images, setImages] = useState<string[]>([])
    const [files, setFiles] = useState<AllFiles[]>([])
    // folders
    // const [error, setError] = useState<string>('')
    const [check, setCheck] = useState<boolean>(false)
    const [show, setShow] = useState<boolean>(false)
    const [omg, setOmg] = useState<boolean>(false)
    const [count, setCount] = useState<number>(3)
    // const [data, setData] = useState<AllFiles[]>([])

    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!token) {
            setCheck(!check)
            const createInterval = setInterval(() => {
                setCount(prevCount => prevCount - 1)
            }, 1000)
            return () => clearInterval(createInterval)
        }
        dispatch(setMedia([]))
    }, [])

    // useEffect(() => {
    //     if (error) {
    //         const timer = setTimeout(() => {
    //             // setError('')
    //         }, 3000)

    //         return () => clearTimeout(timer)
    //     }
    // }, [error])

    if (count === 0) {
        router.push('/signup')
    }


    function addImage(name: string) {
        if (images.includes(name)) {
            setImages(prevImages => prevImages.filter(x => x !== name))
        } else {
            setImages([...images, name])
        }
    }

    function handleLogout() {
        dispatch(setAuthState(''))
        router.push('/signup')
    }

    return (
        <>
            <div className="flex flex-col space-y-0 mt-4 p-8 font-product">
                <p className="text-4xl w-[75%] fixed font-medium h-40 pt-10 -mt-12 text-primary bg-white"> Welcome to Collect </p>
                <div className="flex flex-col mt-16 bg-white">
                    {
                        files.length ? <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.2 }}
                            className="flex justify-between fixed space-x-4 text-primary transition-all rounded-lg hover p-3 w-[75%] bg-[url('https://cdn.dribbble.com/userupload/36271059/file/original-cbbe37d7a258e4acb0d9c6ac94e7f4c8.jpg?resize=2048x1365&vertical=center')] bg-center">
                            <div className="flex space-x-2">
                                <button onClick={() => setFiles([])}>
                                    <XMarkIcon className="w-6 hover" />
                                </button>
                                <p className="p-2"> {files.length} selected </p>
                            </div>
                            <div className="flex space-x-6 mr-6">
                                <div className="flex space-x-2 active:scale-95">
                                    <TrashIcon className={`w-6 hover`} />
                                </div>
                                <div className="flex space-x-2 active:scale-95">
                                    <PlusCircleIcon className="w-6 hover" />
                                </div>
                                <div className="flex space-x-2 active:scale-95">
                                    <ArrowDownTrayIcon className="w-6 hover" />
                                </div>
                            </div>
                        </motion.div> : <div
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
                                <div className="grid grid-cols-3 gap-4 px-4 py-2 border-b border-gray-200 mt-8">
                                    <p className="text-gray-500 font-semibold">Name</p>
                                    <div className="flex justify-end mr-22">
                                        <p className="text-gray-500 font-semibold">Date</p>
                                    </div>
                                    <div className="flex space-x-4 justify-end">
                                        <p className="text-gray-500 font-semibold">Size</p>
                                    </div>
                                </div>

                                <div className="flex flex-col divide-y divide-gray-100 mt-4">
                                    {
                                        data?.map((x, i) => (
                                            <div key={i}>
                                                <Card
                                                    data={x}
                                                    setFiles={setFiles}
                                                    files={files}
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