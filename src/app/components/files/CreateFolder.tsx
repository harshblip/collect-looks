'use client'

import React, { useEffect, useState } from "react"
import Checkbox from "../ui/Checkbox"
import { AnimatePresence, motion } from "framer-motion"
import { EyeIcon } from "@heroicons/react/24/solid"
import { useCreateFolder } from "@/app/hooks/useFolder"
import { useDispatch } from "react-redux"
import { setViewCreateFolder } from "@/lib/slice/folderSlice"
import { useAppSelector } from "@/lib/store"

interface PropTypes {
    showMe: boolean
}

function CreateFolder() {

    const dispatch = useDispatch()

    const [name, setName] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [locked, setLocked] = useState<boolean>(false)
    const [see, setSee] = useState<boolean>(false)
    const [created, setCreated] = useState<boolean>(false)
    const parent_id = useAppSelector(state => state.user.parent_id)

    console.log("parent_id modal ke andar", parent_id)

    useEffect(() => {
        if (created) {
            const timeout = setTimeout(() => {
                dispatch(setViewCreateFolder(false))
            }, 2000)
            return () => clearTimeout(timeout);
        }
    }, [created])

    const { mutate: createFolder } = useCreateFolder()

    return (
        <>
            <AnimatePresence>
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.1, ease: 'easeInOut' }}
                    className="absolute bg-black/20 top-0 bottom-0 w-full flex justify-center items-center -ml-12 font-product z-2">
                    <div className="bg-white  bg-center bg-contain p-6 rounded-lg flex flex-col justify-center text-primary">
                        {created ? <p className="text-xl"> folder {name} created ✅ </p> : <>
                            <p className="flex items-start text-2xl mt-2"> Create a new folder </p>
                            <hr 
                                className="w-32 border-[0.14rem] border-gray-400 rounded-full mt-2"
                            />
                            <div className="flex flex-col space-y-2 mt-10">
                                <p className="text-secondary text-sm"> folder's name </p>
                                <input
                                    type="text"
                                    name="name"
                                    className="w-[24rem] border-2 border-gray-400 p-2 outline-none rounded-lg"
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="flex flex-col space-y-2 mt-4">
                                <p className="text-secondary text-sm"> about </p>
                                <input
                                    type="text"
                                    name="description"
                                    className="w-[24rem] border-2 border-gray-400 p-2 outline-none rounded-lg"
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                            <div className={`flex ${locked ? `flex-col` : `flex-row`} items-center space-x-2`}>
                                {
                                    locked && <div className="flex flex-col space-y-2 mt-4">
                                        <p className="text-secondary text-sm"> password </p>
                                        <input
                                            type={`${see ? `text` : `password`}`}
                                            name="password"
                                            className="w-[24rem] border-2 border-gray-400 p-2 outline-none rounded-lg slide-in-from-left-full transition-all duration-300"
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                }
                                <div className="flex justify-center w-full items-center space-x-2 mt-4">
                                    {!locked && <p className="text-secondary text-md"> locked ? </p>}
                                    <div className={`${locked && `flex space-x-2`}`}>
                                        {
                                            locked && <EyeIcon
                                                onClick={() => setSee(!see)}
                                                className="hover w-4 text-primary"
                                            />
                                        }
                                        <Checkbox
                                            setChecked={setLocked}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className={`flex justify-around w-full items-center ${locked ? `mt-6` : `mt-16`}`}>
                                <button
                                    className="text-primary rounded-md w-[10rem] border-2 border-gray-200 p-3 hover"
                                    onClick={() => dispatch(setViewCreateFolder(false))}
                                >
                                    cancel
                                </button>
                                <button
                                    className=" rounded-md w-[10rem] border-none bg-gray-600 text-white p-3 hover"
                                    onClick={() => {
                                        setCreated(true)
                                        createFolder({
                                            id: 3,
                                            name: name,
                                            description: description,
                                            is_locked: locked,
                                            password: password,
                                            parent_id: parent_id ?? null
                                        })
                                    }}
                                >
                                    create
                                </button>
                            </div>
                        </>
                        }
                    </div>
                </motion.div>
            </AnimatePresence>
        </>
    )
}

export default React.memo(CreateFolder)