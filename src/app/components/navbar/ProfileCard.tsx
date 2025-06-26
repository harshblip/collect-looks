import Image from "next/image";
import { motion } from 'framer-motion'
import { BeakerIcon, FingerPrintIcon, FireIcon } from "@heroicons/react/24/solid";
import CardButton from "../shared/CardButton";

export default function ProfileCard() {
    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.1, ease: 'easeInOut' }}
                className="absolute mt-10 -ml-[22rem] z-1"
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
                        <div className="mt-6 flex flex-col divide-gray-200 text-secondary font-medium ">
                            <CardButton
                                label="update profile"
                                icon={<BeakerIcon />}
                                onClick={() => console.log("update profile clicked")}
                            />
                            <CardButton
                                label="view profile"
                                icon={<FireIcon />}
                                onClick={() => console.log("view profile clicked")}
                            />
                            <CardButton
                                label="update profile"
                                icon={<FingerPrintIcon />}
                                onClick={() => console.log("change password clicked")}
                            />
                        </div>
                    </div>
                </div>
            </motion.div>
        </>
    )
}