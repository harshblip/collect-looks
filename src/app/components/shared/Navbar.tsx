'use client'

import Image from "next/image";
import SearchBar from "./SearchBar";
import { BeakerIcon, Cog6ToothIcon, CubeTransparentIcon, FingerPrintIcon, FireIcon, UserIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ProfileCard from "../navbar/ProfileCard";

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
                    <button className="w-10 h-10 hover hover:bg-gray-200 rounded-lg p-2 transition-all text-primary active:scale-95"> <Cog6ToothIcon />  </button>
                    <button 
                        className="w-10 h-10 hover rounded-lg p-2 text-primary "> <CubeTransparentIcon /> </button>
                    <div className="flex flex-col">
                        <button
                            className="w-10 h-10 hover hover:bg-gray-200 rounded-lg p-2 transition-all text-primary active:scale-95"
                            onClick={() => setToggle(toggle === 'profile' ? '' : 'profile')}
                        > <UserIcon /> </button>
                        <AnimatePresence>

                            {
                                toggle === 'profile' ? <>
                                    <ProfileCard />
                                </> : ''
                            }
                        </AnimatePresence>
                    </div>
                </div>
            </div >
        </>
    )
}