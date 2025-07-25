'use client'

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

    function verify() {
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
            > <div className="flex flex-col">
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="flex flex-col justify-center items-center"
                    >
                        <p className={`${pixel.className} text-4xl`}> Protected folder </p>
                        <form
                            className="flex items-center space-x-4 mt-16"
                            onSubmit={verify}
                        >
                            <div className="flex flex-col space-y-2">
                                <input
                                    type="password"
                                    onChange={(e) => setTypedPassword(e.target.value)}
                                    className="w-[16rem] rounded-md p-2 outline-none border-2 border-gray-400"
                                    autoFocus={true}
                                />
                                {
                                    error && <p className="text-sm text-red-400"> {error} </p>
                                }
                            </div>
                            <motion.button
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.2 }}
                                className="bg-gray-400 text-white hover text-sm rounded-md p-2"
                                onClick={verify}
                            >
                                Lets goo
                            </motion.button>
                        </form>
                        <div className="bg-gray-400 p-4 rounded-md flex items-center space-y-2 text-white mt-20">
                            <ul>
                                <li> the owner of the file has protected this file with a password </li>
                                <li> type the password of this folder to access its items </li>
                            </ul>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </>
    )
}