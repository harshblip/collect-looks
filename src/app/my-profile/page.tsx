'use client'

import { PuzzlePieceIcon } from "@heroicons/react/24/solid";
import ProfileNavbar from "../components/layout/my-profile/ProfileNavbar";
import Image from "next/image";
import { Pixelify_Sans } from "next/font/google";
import AccountInfo from "../components/layout/my-profile/AccountInfo";
import StorageInfo from "../components/layout/my-profile/StorageInfo";
import DeleteAccount from "../components/layout/my-profile/DeleteAcc";
import { motion, AnimatePresence } from "framer-motion";
import { useGetUserData } from "../hooks/useUser";
import { useAppSelector } from "@/lib/store";

const pixel = Pixelify_Sans({
    weight: ['400', '500'],
    subsets: ['cyrillic', 'latin']
})

export default function MyProfile() {

    const id = useAppSelector(state => state.states.userId)
    const { data } = useGetUserData(3)
    console.log(id, data)

    return (
        <>
            <AnimatePresence>
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                    className="p-4 flex flex-col font-product primary-bg h-full"
                >
                    <ProfileNavbar />
                    <p className="font-glook z-20 mt-[14rem] text-primary text-5xl ml-12"> Hey,
                        {
                            data?.username[0].toUpperCase()
                        }{
                            data?.username.split(' ', 1)[0].slice(1)
                        }
                    </p>
                    <div className="relative w-full h-[24rem] -mt-[14rem] z-10 primary-bg -ml-0 rounded-lg overflow-hidden">
                        <Image
                            src="/profile-banner.png"
                            alt="profile-banner"
                            fill
                            quality={100}
                            className="object-cover object-bottom shadow-md"
                        />
                    </div>
                    <div className="mt-10 flex justify-center items-center space-x-8 z-20">
                        <PuzzlePieceIcon
                            className="w-6 text-gray-400"
                        />
                        <hr className="w-24 border-2 border-gray-300" />
                        <p className={`${pixel.className} text-secondary text-xl`}>
                            Account
                        </p>
                        <hr className="w-24 border-2 border-gray-300" />
                        <PuzzlePieceIcon
                            className="w-6 text-gray-400"
                        />
                    </div>
                    <div className="flex flex-col items-center justify-center w-full">
                        <div className="bg-white w-[90rem] rounded-lg p-4 mt-12">
                            {
                                data && <AccountInfo
                                    username={data.username}
                                    email={data.email}
                                />
                            }
                        </div>
                        <div className="bg-white w-[90rem] rounded-lg p-4 mt-12">
                            <StorageInfo />
                        </div>
                        <div className="bg-white w-[90rem] rounded-lg p-4 mt-12">
                            <DeleteAccount />
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
        </>
    )
}