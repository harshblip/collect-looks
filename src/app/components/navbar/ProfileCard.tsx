import Image from "next/image";
import { motion } from 'framer-motion'
import { BeakerIcon, FireIcon } from "@heroicons/react/24/solid";
import CardButton from "../shared/CardButton";
import { useRouter } from "next/navigation";

export default function ProfileCard({ toggle }: {
    toggle: React.Dispatch<React.SetStateAction<'menu' | 'profile' | 'settings' | ''>>
}) {
    const navigate = useRouter()
    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.1, ease: 'easeInOut' }}
                className="absolute mt-10 -ml-[22rem] z-2"
            >
                <div className="bg-gray-200 h-[14rem] w-[25rem] rounded-xl p-4">
                    <div className="bg-white h-[12rem] w-[23rem] flex flex-col rounded-xl p-4">
                        <button
                            className="flex items-center space-x-3 p-2 hover"
                            onClick={() => {
                                navigate.push('/dashboard/my-profile')
                                toggle('')
                            }}
                        >
                            <Image
                                src='https://cdn.dribbble.com/userupload/44247454/file/3c40a681651173421483c9ec43601a7f.png?resize=1024x1024&vertical=center'
                                alt='profile image'
                                className="w-12 h-12 rounded-full"
                                height={0}
                                width={40}
                            />
                            <div className="flex flex-col items-start">
                                <p className="text-primary"> Shreyas </p>
                                <p className="text-sm text-gray-400">shreyas.iyer@gmail.com</p>
                            </div>
                        </button>
                        <div className="mt-2 flex flex-col divide-gray-200 text-secondary font-medium p-2">
                            <CardButton
                                label="Go to your account"
                                icon={<BeakerIcon />}
                                onClick={() => {
                                    navigate.push('/dashboard/my-profile')
                                    toggle('')
                                }}
                            />
                            <CardButton
                                label="log out"
                                icon={<FireIcon />}
                                onClick={() => console.log("logged out!")}
                            />
                        </div>
                    </div>
                </div>
            </motion.div>
        </>
    )
}