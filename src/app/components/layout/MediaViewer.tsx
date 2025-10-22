'use client'

import { setViewMedia } from "@/lib/slice/generalSlice"
import { useAppSelector } from "@/lib/store"
import { ArrowLeftIcon, ArrowRightIcon, FolderIcon } from "@heroicons/react/24/outline"
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
                            <div className="bg-gray-600 p-6 rounded-md flex items-center flex-col justify-center text-white">
                                <p> yoooo, this is soooo blocked </p>
                                <div className="flex items-center space-x-2">
                                    <input
                                        type={`${see ? `text` : `password`}`}
                                        placeholder="set a password"
                                        className="w-[18rem] p-4 bg-gray-100/75 border-none text-secondary placeholder:text-gray-600 placeholder:font-stretch-50% outline-none rounded-md mt-16"
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <button
                                        onClick={() => setSee(!see)}
                                        className="hover w-12 h-12 hover:bg-gray-200 rounded-md flex justify-center active:scale-95 mt-16"
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
                                    className="p-2 outline-none text-gray-600 rounded-md w-32 flex justify-center mt-16 bg-white hover">
                                    Go
                                </button>
                            </div>
                        </> : <>
                            <div className="flex flex-col items-center justify-center rounded-lg w-[100%] p-4 overflow-hidden">
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
                                            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                                                <Viewer
                                                    fileUrl={openFiles[updateI].file_url || ''}
                                                    plugins={[defaultLayoutPluginInstance]}
                                                />
                                            </Worker>
                                        </div>
                                    </>
                                }
                            </div>
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