
import { setViewInfo } from "@/lib/slice/generalSlice";
import { InfoData } from "@/types/mediaTypes";
import { FolderIcon, HomeIcon, KeyIcon, LockClosedIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { useState, useRef } from 'react';
import { byteToSize } from "@/app/utils/useful";
import { CubeIcon, CubeTransparentIcon, LanguageIcon, LinkIcon, MapPinIcon, Square3Stack3DIcon } from "@heroicons/react/24/outline";

export default function InfoCard({ data }: { data: InfoData }) {
    const image = data.image[0]
    const filePath = data.filePath

    const dispatch = useDispatch()

    console.log(data)
    return (
        <>
            <AnimatePresence>
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.1, ease: 'easeInOut' }}
                    className="absolute bg-black/20 top-0 bottom-0 w-full flex justify-center items-center -ml-12 font-product z-2"
                >
                    <div className="bg-white overflow-auto rounded-md p-6 h-[40rem] w-[32rem] flex flex-col space-y-6">
                        <div className="flex justify-center items-center flex-col">
                            <button
                                onClick={() => dispatch(setViewInfo(false))}
                                className="active:scale-95 hover border border-black flex space-x-2 justify-center p-1 ml-[28.5rem] -mt-2 transition hover:bg-gray-400 hover:border-none hover:text-white text-gray-600">
                                <XMarkIcon
                                    className="w-5"
                                />
                            </button>
                            {
                                image.file_url ? <Image
                                    src={image.file_url}
                                    height={0}
                                    width={400}
                                    className=" rounded-md mt-4 bg-gray-50 p-4 border border-gray-400"
                                    alt={`${image.file_name}`}
                                /> : <FolderIcon />
                            }
                        </div>

                        <div className="flex flex-col space-y-4">
                            <p className="text-xl text-secondary"> Who has access </p>
                            <Image
                                src={image.file_url ? 'https://cdn.dribbble.com/userupload/44201289/file/original-77d7237957eff0cc9adf154a8a9cc6e3.png?resize=2048x1423&vertical=center' : ''}
                                height={0}
                                width={40}
                                className="h-12 w-12 rounded-full"
                                alt="user-dp"
                            />
                        </div>

                        <hr
                            className="text-primary border-[1.8px]"
                        />

                        <div className="flex flex-col space-y-4 rounded-md">
                            <div className="flex items-center space-x-2">
                                <LockClosedIcon
                                    className="w-5 text-secondary"
                                />
                                <p className="text-xl text-secondary"> Security Limitations </p>
                            </div>
                            <div className="bg-gray-100 rounded-md space-y-2 p-4">
                                {
                                    !image.is_locked ? <div className="flex space-x-4 items-center">
                                        <CubeTransparentIcon
                                            className="text-secondary w-8"
                                        />
                                        <div className="flex flex-col text-secondary space-y-1 text-md">
                                            <p>
                                                No limitations applied
                                            </p>
                                            <p>
                                                If any are applied, they will appear here
                                            </p>
                                        </div> </div> : <div className="flex space-x-4 items-center">
                                        <CubeIcon
                                            className="text-secondary w-8"
                                        />
                                        <div className="flex flex-col text-secondary space-y-1">
                                            <p>
                                                Password restricted
                                            </p>
                                            <p>
                                                file is protected with password set by the owner
                                            </p>
                                        </div> </div>
                                }
                            </div>
                        </div>

                        <hr
                            className="text-primary border-[1.8px]"
                        />

                        <p className="text-xl text-secondary"> File Details </p>
                        <div className="border border-gray-400 rounded-md p-4 flex flex-col space-y-4">
                            <div className="flex justify-between ml-2 mr-2 mt-2">
                                <div className="flex items-center space-x-4">
                                    <LanguageIcon className="text-secondary w-6" />
                                    <div className="flex flex-col">
                                        <p className="text-sm text-primary"> name </p>
                                        <p className=" text-lg text-secondary font-medium"> {image.file_name} </p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <Square3Stack3DIcon className="text-secondary w-6" />
                                    <div className="flex flex-col mr-12">
                                        <p className="text-sm text-primary"> size </p>
                                        <p className=" text-lg text-secondary font-medium">
                                            {byteToSize(
                                                typeof image.size === "string" && !isNaN(parseInt(image.size))
                                                    ? parseInt(image.size)
                                                    : 0
                                            )}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4 mt-4 ml-4">
                                <MapPinIcon className="text-secondary w-6" />
                                <div className="flex justify-between ml-2 mr-2">
                                    {
                                        filePath && <div className="-ml-2 flex flex-col space-y-2">
                                            <p className="text-sm text-primary"> Location </p>
                                            <div className=" text-xl flex space-x-2 text-secondary font-medium">
                                                {
                                                    filePath.length > 0 ? filePath.map((x, i) => <div
                                                        key={i}
                                                        className="flex items-center space-x-2"> <div
                                                            className="flex space-x-2 border border-gray-400 rounded-md p-2"
                                                        >
                                                            <FolderIcon width={18} className="text-secondary" />
                                                            <p className="text-sm"> {x} </p>
                                                        </div>
                                                        {
                                                            i < filePath.length - 1 && <p> / </p>
                                                        }
                                                    </div>
                                                    ) : <div className="flex space-x-2 items-center"> <HomeIcon className="w-5 text-secondary" />
                                                        <p className="text-sm">  home directory </p>
                                                    </div>}
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                            <div className="flex items-center space-x-4 ml-2 mt-2">
                                <LinkIcon className="text-secondary w-6" />
                                <div className="flex flex-col p-2 -ml-2">
                                    <p className="text-sm text-primary"> type </p>
                                    <p className=" text-lg text-secondary font-medium"> {image.file_type === 'image' ? 'Image' : image.file_type === 'video' ? 'videos' : image.file_type === 'document' ? 'docs' : 'music'
                                    } </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between mt-6">
                            <div className="flex flex-col">
                                <p className="text-sm text-primary"> Created </p>
                                <p className=" text-4xl text-gray-300 font-medium mt-1"> {image.created_at.substring(0, 10)} </p>
                            </div>

                            <div className="flex flex-col">
                                <p className="flex justify-end text-sm text-primary"> Opened </p>
                                <p className=" text-4xl text-gray-300 font-medium mt-1"> {image.updated_at.substring(0, 10)} </p>
                            </div>
                        </div>

                    </div>
                </motion.div>
            </AnimatePresence>
        </>
    )
}