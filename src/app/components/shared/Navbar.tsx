'use client'

import Image from "next/image";
import SearchBar from "./SearchBar";
import { Cog6ToothIcon, CubeTransparentIcon, UserIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Navbar() {
    const [toggle, setToggle] = useState<'settings' | 'menu' | 'profile' | ''>('')
    return (
        <>
            <div className="flex items-center justify-between font-product">
                <div className="flex flex-col">
                    <div className="flex items-center space-x-6 mt-0">
                        <Image
                            src='/logo.png'
                            height={0}
                            width={60}
                            alt="collect-logo"
                        />
                        <p className="font-product font-medium text-4xl text-primary"> Collect </p>
                    </div>
                </div>
                <SearchBar />
                <div className="flex space-x-8">
                    <button className="w-10 h-10 hover:cursor-pointer hover:bg-gray-200 rounded-lg p-2 transition-all text-primary active:scale-95"> <Cog6ToothIcon />  </button>
                    <button className="w-10 h-10 hover:cursor-pointer hover:bg-gray-200 rounded-lg p-2 transition-all text-primary active:scale-95"> <CubeTransparentIcon /> </button>
                    <div className="flex flex-col">
                        <button
                            className="w-10 h-10 hover:cursor-pointer hover:bg-gray-200 rounded-lg p-2 transition-all text-primary active:scale-95"
                            onClick={() => setToggle(toggle === 'profile' ? '' : 'profile')}
                        > <UserIcon /> </button>
                        <AnimatePresence>

                            {
                                toggle === 'profile' ? <>
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.1, ease: 'easeInOut' }}
                                        className="absolute mt-10 -ml-[22rem]"
                                    >
                                        <div className="bg-gray-200 h-[29rem] w-[25rem] rounded-xl p-4">
                                            <div className="bg-white h-[27rem] w-[23rem] flex flex-col rounded-xl p-4">
                                                <div className="bg-[#83c5be] flex flex-col items-center justify-center rounded-md h-[10rem] text-white p-10">
                                                    <Image
                                                        src='https://cdn.dribbble.com/userupload/43663406/file/original-2ddbfcb3948ed62d3d9de1bd3ffdcbcc.jpg?resize=1504x1003&vertical=center'
                                                        alt='profile image'
                                                        className="rounded-full"
                                                        height={0}
                                                        width={60}
                                                    />
                                                    <p className="mt-4"> Shreyas </p>
                                                    <div className="flex space-x-2">
                                                        <p>shreyas</p>
                                                        <p>·</p>
                                                        <p>shreyas.iyer@gmail.com</p>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col">
                                                    
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </> : ''
                            }
                        </AnimatePresence>
                    </div>
                </div>
            </div >
        </>
    )
}