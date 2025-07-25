'use client'

import Card from "@/app/components/shared/Card";
import { useGetStarredFiles } from "@/app/hooks/useMedia";
import { setFiles } from "@/lib/slice/statesSlice";
import { Files } from "@/types/mediaTypes";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export default function Starred() {
    const { data, error } = useGetStarredFiles(3) // send userId as parameter
    return (
        <>
            <div className="flex flex-col space-y-0 mt-4 p-8 font-product">
                <p className="text-4xl w-[75%] fixed font-medium h-16 pt-10 -mt-12 text-primary bg-white"> Starred </p>
                <div className="flex flex-col mt-8 bg-white">
                    <AnimatePresence>
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

                            <div className="flex flex-col divide-y divide-gray-100 mt-2">
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
                    </AnimatePresence>

                </div>
            </div>
        </>
    )
}