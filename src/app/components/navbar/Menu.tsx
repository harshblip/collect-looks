'use client'

import { FolderOpenIcon, MapIcon, PlayPauseIcon, SignalIcon } from "@heroicons/react/24/solid"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import MenuItem from "../ui/widgets/MenuItem"

export default function Menu() {
    const [clicked, setClicked] = useState<boolean>(false)

    useEffect(() => {
        const timeout = setTimeout(() => {
            setClicked(false)
        }, 2000)

        return () => clearTimeout(timeout)
    }, [clicked])

    function handleClick() {
        setClicked(true)
    }

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.1, ease: 'easeInOut' }}
                className="absolute mt-12    -ml-[15rem] z-2"
            >
                <div className="bg-gray-200 h-[14rem] w-[22rem] rounded-xl p-4">
                    <div className={`bg-white h-[12rem] w-[20rem] grid ${clicked ? `grid-cols-1` : `grid-cols-3`} gap-4 items-center rounded-xl p-4`}>
                        {
                            clicked ? <div className="w-full flex justify-center items-center">
                                <p className="text-lg text-primary">soon to be released !</p>
                            </div> : <>
                                <MenuItem
                                    icon={<MapIcon />}
                                    label="Photos"
                                    onClick={handleClick}
                                />
                                <MenuItem
                                    icon={<PlayPauseIcon />}
                                    label="Stories"
                                    onClick={handleClick}
                                />
                                <MenuItem
                                    icon={<FolderOpenIcon />}
                                    label="Docs"
                                    onClick={handleClick}
                                />
                                <MenuItem
                                    icon={<SignalIcon />}
                                    label="Audio"
                                    onClick={handleClick}
                                />
                            </>
                        }
                    </div>
                </div>
            </motion.div>
        </>
    )
}