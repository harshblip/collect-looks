import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { handleDragLeave, handleDragOver, handleDrop, handleFileInput, handleRemove, handleUpload } from '@/app/utils/fileUploader';
import { CameraIcon, FolderIcon, PhotoIcon, TrashIcon } from '@heroicons/react/24/solid';
import UploadingModal from '../ui/fileuploader/UploadingModal';

export default function FileUploader({ show }: { show: React.Dispatch<React.SetStateAction<boolean>> }) {
    const [files, setFiles] = useState<File[]>([]);
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (progress === 100) {
            const timeout = setTimeout(() => {
                setUploading(false);
                setProgress(0);
            }, 2000);
            return () => clearTimeout(timeout);
        }
    }, [progress]);


    return (
        <div className="flex flex-col">
            <AnimatePresence>
                <motion.div
                    key="file-uploader"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="absolute bg-black/20 top-0 bottom-0 w-[100%] flex justify-center items-center font-product z-2 -ml-8"
                >
                    {
                        uploading ? (
                            <UploadingModal 
                                progress = {progress}
                            />
                        ) : (
                            <div className={`w-[32rem] ${files.length ? `max-h-[40rem]` : `h-[32rem]`} rounded-lg flex flex-col items-center p-6 justify-center text-center cursor-pointer transition-colors duration-300 ${isDragging ? 'bg-gray-100 border-gray-400' : 'border-gray-300 bg-white'}`}>

                                < div
                                    onDrop={(e) => handleDrop(e, setFiles, setIsDragging)}
                                    onDragOver={(e) => handleDragOver(e, setIsDragging)}
                                    onDragLeave={() => handleDragLeave(setIsDragging)}
                                    className={`w-full p-0 ${files.length ? `h-[16rem]` : `h-[32rem]`} rounded-lg flex flex-col items-center justify-center text-center cursor-pointer transition-colors duration-300 ${isDragging ? 'bg-gray-100 border-gray-400' : 'border-gray-300 bg-white'}`}
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    {isDragging ? (
                                        <>
                                            <div className='bg-[#fafaff] p-4 h-full w-full flex items-center justify-center flex-col rounded-md'>
                                                <div className='flex space-x-4 text-gray-600'>
                                                    <PhotoIcon className={`-rotate-20 ${files.length ? `w-4` : `w-6`}`} />
                                                    <CameraIcon className={`${files.length ? `w-4` : `w-8`} -mt-6`} />
                                                    <FolderIcon className={`-rotate-20 ${files.length ? `w-4` : `w-6`}`} />
                                                </div>
                                                <p className="text-gray-600 mt-4">drop them now</p>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className='bg-[#fafaff] shadow-md p-4 h-full w-full flex items-center justify-center flex-col rounded-md'>
                                                <div className='flex space-x-2 text-gray-600'>
                                                    <PhotoIcon className='w-6 -rotate-20' />
                                                    <CameraIcon className='w-8 -mt-4' />
                                                    <FolderIcon className='w-6 rotate-20' />
                                                </div>
                                                <p className="text-gray-600 mt-4 text-xl">
                                                    {
                                                        files.length ? `Drop that one file you forgot` : `Drag & Drop files here`
                                                    }
                                                </p>
                                                <Button variant="outline" className="mt-4 text-md">Or <span className='text-emerald-400 font-semibold'> Browse </span>  to upload</Button>
                                                {
                                                    !files.length && <p className='text-sm text-gray-400 mt-4'> supports all general image, video, <br /> audio  and doc formats </p>
                                                }
                                            </div>
                                        </>
                                    )}
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        multiple
                                        onChange={(e) => handleFileInput(e, setFiles)}
                                        className="hidden"
                                    />
                                </div>
                                {files.length > 0 && (
                                    <div className='max-h-[24rem] w-full rounded-md shadow-md overflow-auto p-3 bg-gray-50 mt-6'>
                                        <motion.div
                                            className="w-full mt-2"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                        >
                                            <ul className="space-y-2">
                                                {files.map((file, index) => (
                                                    <motion.li
                                                        key={index}
                                                        className="flex justify-between items-center p-2 bg-white rounded-md shadow-sm text-gray-600 -mt-0"
                                                        initial={{ opacity: 0, scale: 0.9 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        exit={{ opacity: 0, y: -20 }}
                                                    >
                                                        <span className="text-sm truncate max-w-xs">{file.name}</span>
                                                        <Button
                                                            size="sm"
                                                            variant="destructive"
                                                            onClick={() => handleRemove(index, setFiles, files)}
                                                            className='hover'
                                                        ><TrashIcon /></Button>
                                                    </motion.li>
                                                ))}
                                            </ul>
                                        </motion.div>
                                    </div>
                                )}
                                {
                                    files.length > 0 && <div className='flex w-full mt-2 space-x-4'>
                                        <Button
                                            className="mt-4 w-1/2 hover"
                                            onClick={() => show(false)}
                                            variant={'outline'}
                                        >Close</Button>
                                        <Button className="mt-4 w-1/2 hover" onClick={() => handleUpload(
                                            files,
                                            setFiles,
                                            setUploading,
                                            setProgress
                                        )}>Upload</Button>
                                    </div>
                                }
                            </div>
                        )}
                </motion.div>
            </AnimatePresence>
        </div >
    );
}
