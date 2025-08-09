import { useLockFolder } from "@/app/hooks/useFolder"
import { useLockFile } from "@/app/hooks/useMedia"
import { useAppSelector } from "@/lib/store"
import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"

export default function LockModal() {
    const id = useAppSelector(state => state.folderStates.lockModal.id)
    const lock = useAppSelector(state => state.folderStates.lockModal.lock)
    const type = useAppSelector(state => state.folderStates.lockModal.type)

    const { mutate: setFileLock } = useLockFile()
    const { mutate: setFolderLock } = useLockFolder()

    const [see, setSee] = useState<boolean>(false)
    const [password, setPassword] = useState<string>('')

    return (
        <>
            <AnimatePresence>
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.1, ease: 'easeInOut' }}
                    className="absolute bg-black/20 top-0 bottom-0 w-full flex justify-center items-center -ml-12 font-product z-2">
                    <div className="bg-white bg-[url('https://cdn.dribbble.com/userupload/43609485/file/original-4d5208449d51a62c489343742821ef18.png?resize=1504x1128&vertical=center')] bg-center bg-contain h-[64%] w-[30rem] rounded-lg flex flex-col justify-center items-center text-primary p-4">
                        <p className="text-secondary text-2xl">
                            {
                                lock ? `Lock` : `Unlock`
                            }
                            {type}
                        </p>
                        <p className="text-md text-secondary mt-12"> set a strong password for this file to protect it from <br /> <i> muhehehheheh </i> </p>
                        <div className="mt-8 flex items-center space-x-2">
                            <input
                                type={`${see ? `text` : `password`}`}
                                placeholder="set a password"
                                className="w-[12rem] p-2 text-secondary placeholder:text-gray-200 placeholder:font-stretch-50% outline-none"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                onClick={() => type === 'folder' ? setFolderLock({
                                    password: password,
                                    folderId: id
                                }) : setFileLock({
                                    password: password,
                                    fileId: id
                                })}
                                className="p-2 outline-none bg-gray-600 rounded-md w-10 flex items-center">
                                Go
                            </button>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence >
        </>
    )
}