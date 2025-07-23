
import { setViewInfo } from "@/lib/slice/folderSlice";
import { InfoData } from "@/types/mediaTypes";
import { FolderIcon, KeyIcon, LockClosedIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { useState, useRef } from 'react';
import { byteToSize } from "@/app/utils/useful";

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
                    className="absolute bg-black/20 top-0 bottom-0 w-full flex justify-center items-center -ml-12 font-product z-1"
                >
                    <div className="bg-white overflow-auto rounded-md p-6 h-[40rem] w-[32rem] flex flex-col space-y-6">
                        <div className="flex justify-center items-center flex-col">
                            <XMarkIcon
                                onClick={() => dispatch(setViewInfo(false))}
                                className="text-primary w-6 hover"
                            />
                            {
                                image.file_url ? <Image
                                    src={image.file_url}
                                    height={0}
                                    width={400}
                                    className=" rounded-md mt-4"
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
                                    !image.is_locked ? <div className="flex flex-col text-secondary space-y-2 text-md">
                                        <p>
                                            No limitations applied
                                        </p>
                                        <p>
                                            If any are applied, they will appear here
                                        </p>
                                    </div> : <div className="flex flex-col space-y-2">
                                        <p>
                                            Password restricted
                                        </p>
                                        <p>
                                            file is protected with password set by the owner
                                        </p>
                                    </div>
                                }
                            </div>
                        </div>

                        <hr
                            className="text-primary border-[1.8px]"
                        />

                        <p className="text-xl text-secondary"> File Details </p>

                        <div className="flex flex-col">
                            <p className="text-sm text-primary"> type </p>
                            <p className=" text-xl text-secondary font-medium"> {image.file_type === 'image' ? 'Image' : image.file_type === 'video' ? 'videos' : image.file_type === 'document' ? 'docs' : 'music'
                            } </p>
                        </div>

                        <div className="flex flex-col">
                            <p className="text-sm text-primary"> size </p>
                            <p className=" text-xl text-secondary font-medium"> {byteToSize(parseInt(image.size))} </p>
                        </div>

                        <div className="flex flex-col">
                            <p className="text-sm text-primary"> name </p>
                            <p className=" text-xl text-secondary font-medium"> {image.file_name} </p>
                        </div>

                        {
                            filePath && <div className="flex flex-col space-y-2">
                                <p className="text-sm text-primary"> Location </p>
                                <div className=" text-xl flex space-x-2 text-secondary font-medium"> {
                                    filePath.map((x, i) => <div className="flex items-center space-x-2"> <div
                                        key={i}
                                        className="flex space-x-2 border border-gray-400 rounded-md p-2"
                                    >
                                        <FolderIcon width={18} className="text-secondary" />
                                        <p className="text-sm"> {x} </p>
                                    </div>
                                    {
                                        i < filePath.length-1 && <p> / </p>
                                    }
                                    </div>
                                    )}
                                </div>
                            </div>
                        }

                        <div className="flex flex-col">
                            <p className="text-sm text-primary"> Created </p>
                            <p className=" text-xl text-secondary font-medium"> {image.created_at.substring(0, 10)} </p>
                        </div>

                        <div className="flex flex-col">
                            <p className="text-sm text-primary"> Opened </p>
                            <p className=" text-xl text-secondary font-medium"> {image.created_at.substring(0, 10)} </p>
                        </div>

                    </div>
                </motion.div>
            </AnimatePresence>
        </>
    )
}