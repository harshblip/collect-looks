'use client'

import { setViewMedia } from "@/lib/slice/generalSlice"
import { useAppSelector } from "@/lib/store"
import { ArrowLeftIcon, ArrowRightIcon, FolderIcon, QrCodeIcon, SparklesIcon } from "@heroicons/react/24/outline"
import { ArrowsPointingInIcon, EyeSlashIcon } from "@heroicons/react/24/solid"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { AudioPlayer } from 'react-audio-play';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import Player from "../media-player/VideoPlayer"
import { EyeIcon } from "lucide-react"
import { useUpdateLastOpened } from "@/app/hooks/useUser"
import { AnimatePresence, motion } from "framer-motion"

export default function MediaViewer() {

    const dispatch = useDispatch()
    const index = useAppSelector(state => state.folders.index)
    const openFiles = useAppSelector(state => state.files.viewMediaFiles)

    const [see, setSee] = useState<boolean>(false)
    const [password, setPassword] = useState<string>('')
    const [show, setShow] = useState<boolean>(false)

    const [updateI, setUpdateI] = useState<number>(index)
    const defaultLayoutPluginInstance = defaultLayoutPlugin();

    const { mutate: updateLastOpened } = useUpdateLastOpened()

    console.log(openFiles[updateI].is_locked, openFiles[updateI].password)

    useEffect(() => {
        const type = openFiles[updateI].file_type === null ? 'folders' : 'files'
        updateLastOpened({ type: type, fileId: openFiles[updateI].id })
    }, [])

    return (
        <>
            <div
                className="font-product absolute bg-black/20 flex flex-col justify-center items-center w-full top-0 bottom-0 -ml-8 z-2"
            >
                <ArrowsPointingInIcon
                    onClick={() => dispatch(setViewMedia(false))}
                    className="text-primary w-10 hover bg-white p-2 absolute top-20 right-20 rounded-md"
                />
                <div className="flex space-x-4">
                    <ArrowLeftIcon
                        onClick={() => setUpdateI((x) => x > 0 ? x - 1 : x)}
                        className="w-10 text-white hover absolute top-[50%] left-20" />
                    {
                        !show && openFiles[updateI].is_locked ? <>
                            <AnimatePresence>
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.1, ease: 'easeInOut' }}
                                    className="flex flex-col space-y-4">
                                    <div className="flex justify-between items-end w-[34rem] h-[12rem] rounded-md bg-white p-8 text-gray-300">
                                        <p className="text-5xl"> Locked... </p>
                                        <QrCodeIcon className="w-16 mr-4 mb-14" />
                                    </div>
                                    <div className="bg-gray-50 p-5 rounded-md flex items-center justify-center text-white">
                                        <div className="flex justify-start items-center space-x-2 -ml-">
                                            <input
                                                type={`${see ? `text` : `password`}`}
                                                placeholder="type your password"
                                                className="w-[24rem] border border-gray-400 p-4 text-secondary placeholder:text-gray-400 placeholder:font-stretch-50% outline-none rounded-md focus:shadow-md focus:border-gray-200"
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                            <button
                                                onClick={() => setSee(!see)}
                                                className="hover w-12 h-12 hover:bg-gray-200 rounded-md flex justify-center active:scale-95 -ml-16 text-gray-400"
                                            >
                                                {
                                                    see ? <EyeIcon
                                                        className="hover w-6"
                                                        onClick={() => setSee(!see)}
                                                    /> : <EyeSlashIcon
                                                        className="hover w-6"
                                                        onClick={() => setSee(!see)}
                                                    />
                                                }
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => {
                                                password === openFiles[updateI].password ? setShow(true) : ''
                                            }}
                                            className="p-4 outline-none text-gray-600 rounded-md flex justify-center bg-white hover ml-16 hover:bg-gray-400 hover:text-white transition">
                                            Go
                                        </button>
                                    </div>
                                    <div className="bg-white rounded-md p-4 text-gray-400 flex flex-col">
                                        <div className="flex justify-between text-gray-400 space-x-2">
                                            <SparklesIcon className="w-6 text-secondary ml-2" />
                                            <p> secured by <span className="text-xl">Collect</span></p>
                                            <SparklesIcon className="w-6 text-secondary mr-2" />
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </> : <>
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.1, ease: 'easeInOut' }}
                                className="flex flex-col items-center justify-center rounded-lg w-[100%] p-4 overflow-hidden">
                                {
                                    openFiles[updateI].file_type === null ? <div className="h-[12rem] primary-bg flex items-center text-secondary justify-center flex-col space-y-4 p-6 rounded-md">
                                        <FolderIcon className="w-8" />
                                        <p> This is a folder </p>
                                        <p className="-mt-2"> exit this view and double tap on it to open </p>
                                    </div> : openFiles[updateI].file_type === 'image' ? <>
                                        <Image
                                            src={openFiles[updateI].file_url || ''}
                                            alt={openFiles[updateI].file_name || ''}
                                            width={0}
                                            height={0}
                                            sizes="100vw"
                                            className="h-auto max-h-full w-auto max-w-full object-contain rounded-xl"
                                        />
                                    </> : openFiles[updateI].file_type === 'video' ? <>
                                        <Player
                                            url={openFiles[updateI].file_url || ''}
                                        />
                                    </> : openFiles[updateI].file_type === 'audio' ? <>
                                        <AudioPlayer
                                            src={openFiles[updateI].file_url || ''}
                                            color="#f7b5cd"
                                            sliderColor="#ff669d"
                                            style={{
                                                background: "#000",
                                                borderRadius: "15px",
                                                padding: "30px",
                                                width: '24rem',
                                                height: '1rem',
                                                marginTop: '8rem'
                                            }}
                                        />
                                    </> : <>
                                        <div className="absolute w-[50%] h-[100vh] p-10">
                                            {
                                                openFiles[updateI].file_url && <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                                                    <Viewer
                                                        fileUrl={openFiles[updateI].file_url}
                                                        plugins={[defaultLayoutPluginInstance]}
                                                    />
                                                </Worker>
                                            }
                                        </div>
                                    </>
                                }
                            </motion.div>
                        </>
                    }

                    <ArrowRightIcon
                        onClick={() => setUpdateI((x) => x < openFiles.length ? x + 1 : x)}
                        className="w-10 text-white hover absolute top-[50%] right-20" />
                </div>

            </div>
        </>
    )
}