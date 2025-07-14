import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

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


    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const droppedFiles = Array.from(e.dataTransfer.files);
        setFiles((prev) => [...prev, ...droppedFiles]);
        setIsDragging(false);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleRemove = (index: number) => {
        setFiles(files.filter((_, i) => i !== index));
    };

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const selectedFiles = Array.from(e.target.files);
        setFiles((prev) => [...prev, ...selectedFiles]);
    };

    const handleUpload = async () => {
        if (!files.length) return;

        setUploading(true);
        setProgress(0);

        const formData = new FormData();
        files.forEach((file) => formData.append('file', file));
        formData.append('username', 'mihir')
        try {
            await axios.post('http://localhost:4000/upload', formData, {
                onUploadProgress: (progressEvent) => {
                    const total = progressEvent.total ?? 1;
                    const percent = Math.round((progressEvent.loaded * 100) / total);
                    setProgress(percent);
                },
            });

            setFiles([]);
        } catch (error) {
            console.error('Upload error:', error);
        } finally {
            setUploading(false);
            setProgress(0);
        }
    };

    return (
        <div className="flex flex-col">
            <AnimatePresence>
                <motion.div
                    key="file-uploader"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="absolute bg-black/20 top-0 bottom-0 w-[100%] flex justify-center items-center font-product z-1 -ml-8"
                >
                    {
                        uploading ? (
                            <motion.div
                                key="uploading"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="border-2 border-dashed w-1/2 p-6 h-32 rounded-lg flex flex-col items-center justify-center text-center cursor-pointer transition-colors duration-300 bg-white"
                            >
                                <p className="text-lg font-medium mb-2">Uploading...</p>
                                <Progress value={progress} className="h-4 rounded-full" />
                                <p className="text-sm mt-2">{progress}%</p>
                            </motion.div>
                        ) : (
                            < div
                                onDrop={handleDrop}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                className={`border-2 border-dashed w-1/2 p-6 h-32 rounded-lg flex flex-col items-center justify-center text-center cursor-pointer transition-colors duration-300 ${isDragging ? 'bg-blue-100 border-blue-400' : 'border-gray-300 bg-white'}`}
                                onClick={() => fileInputRef.current?.click()}
                            >
                                {isDragging ? (
                                    <p className="text-blue-600 font-semibold">Drop Here</p>
                                ) : (
                                    <>
                                        <p className="text-gray-600">Drag & Drop files here</p>
                                        <Button variant="outline" className="mt-4">Or Select Files</Button>
                                    </>
                                )}
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    multiple
                                    onChange={handleFileInput}
                                    className="hidden"
                                />
                            </div>
                        )}
                    {files.length > 0 && (
                        <motion.div
                            className="w-full mt-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            <ul className="space-y-2">
                                {files.map((file, index) => (
                                    <motion.li
                                        key={index}
                                        className="flex justify-between items-center p-2 bg-white rounded shadow-sm"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                    >
                                        <span className="text-sm truncate max-w-xs">{file.name}</span>
                                        <Button size="sm" variant="destructive" onClick={() => handleRemove(index)}>Remove</Button>
                                    </motion.li>
                                ))}
                            </ul>
                            <div className='flex space-x-4'>
                                <Button
                                    className="mt-4 w-1/2"
                                    onClick={() => show(false)}
                                    variant={'outline'}
                                >Close</Button>
                                <Button className="mt-4 w-1/2" onClick={handleUpload}>Upload</Button>
                            </div>
                        </motion.div>
                    )}
                </motion.div>
            </AnimatePresence>
        </div >
    );
}
