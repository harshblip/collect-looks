'use client'

import { BugAntIcon } from "@heroicons/react/24/outline"
import { motion } from "framer-motion"
import { Pixelify_Sans } from "next/font/google"
import { useState } from "react"

const pixel = Pixelify_Sans({
    weight: ['400', '500'],
    subsets: ['cyrillic', 'latin']
})

export default function LockScreen({
    password,
    setLocked
}: {
    password: string,
    setLocked: React.Dispatch<React.SetStateAction<boolean>>
}) {
    const [error, setError] = useState<string>("")
    const [typedPassword, setTypedPassword] = useState<string>("")

    function verify(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        password === typedPassword ? (setLocked(false), setError("")) : setError("password's wrong. pls try again")
    }

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.1, ease: 'easeInOut' }}
                className="mt-16 w-full flex justify-center items-center -ml-12 font-product z-1"
            >
                <BugAntIcon
                    className="w-24 text-gray-300 rotate-45 mr-44 -mt-44 z-2"
                />
                <div className="flex flex-col">
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="flex flex-col justify-center items-center"
                    >
                        <p className={`${pixel.className} text-4xl`}> Protected folder </p>
                        <form
                            className="flex items-center space-x-6 mt-16"
                            onSubmit={(e) => verify(e)}
                        >
                            <div className="flex flex-col space-y-2">
                                <input
                                    type="password"
                                    onChange={(e) => setTypedPassword(e.target.value)}
                                    className="w-[16rem] h-[3rem] rounded-md p-4 outline-none border border-gray-400 focus:shadow-md placeholder:text-gray-400 placeholder:text-sm placeholder:italic"
                                    autoFocus={true}
                                    placeholder="type the truth...."
                                />
                                {
                                    error && <p className="absolute mt-14 text-sm text-red-400"> {error} </p>
                                }
                            </div>
                            <motion.button
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.2 }}
                                className="transition bg-white text-gray-600 hover:bg-gray-600 hover:text-white hover text-sm w-10 h-10 rounded-sm border border-black p-2"
                                onClick={() => verify}
                            >
                                Go
                            </motion.button>
                        </form>
                        <div className="bg-gray-100 p-4 rounded-md flex items-center space-y-2 text-gray-400 mt-32">
                            <ul>
                                <li> the owner of the file has protected this file with a password </li>
                                <li> type the password of this folder to access its items </li>
                            </ul>
                        </div>
                    </motion.div>
                </div>
                <BugAntIcon
                    className="w-24 text-gray-300 rotate-225 ml-44 mt-44"
                />
            </motion.div>
        </>
    )
}