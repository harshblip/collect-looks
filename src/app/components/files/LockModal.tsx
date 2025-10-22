import { useLockFolder, useUnlockFolder } from "@/app/hooks/useFolder"
import { useLockFile, useUnlockFile } from "@/app/hooks/useMedia"
import { setViewLockModal } from "@/lib/slice/generalSlice"
import { useAppSelector } from "@/lib/store"
import { EyeSlashIcon } from "@heroicons/react/24/solid"
import { AnimatePresence, motion } from "framer-motion"
import { EyeIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"

export default function LockModal() {
    const temp = useAppSelector(state => state.folders.lockModal)
    const dispatch = useDispatch()

    const { mutate: setFileLock } = useLockFile()
    const { mutate: unlockFile } = useUnlockFile()
    const { mutate: unlockFolder } = useUnlockFolder()
    const { mutate: setFolderLock } = useLockFolder()

    const [see, setSee] = useState<boolean>(false)
    const [password, setPassword] = useState<string>('')
    const [gayab, setGayab] = useState<boolean>(false)

    useEffect(() => {
        const timeout = setTimeout(() => {
            dispatch(setViewLockModal(false))
        }, 1000)
        clearInterval(timeout)
    }, [gayab])

    return (
        <>
            <AnimatePresence>
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.1, ease: 'easeInOut' }}
                    className="absolute bg-black/20 top-0 bottom-0 w-full flex justify-center items-center -ml-12 font-product z-2">
                    <div className="bg-white bg-[url('https://cdn.dribbble.com/userupload/43609485/file/original-4d5208449d51a62c489343742821ef18.png?resize=1504x1128&vertical=center')] bg-center bg-contain h-[50%] w-[30rem] rounded-lg flex flex-col justify-center items-center text-primary p-4">
                        {
                            gayab ? <p className="text-secondary text-sm"> {temp.type} successfully locked ✅ </p> : <> <p className="text-secondary text-2xl">
                                {
                                    temp.lock ? `unlock ` : `Lock `
                                }
                                {temp.type}
                            </p>
                                <p className="text-md text-gray-400 mt-12"> set a strong password for this file to protect it from <br /> <i> muhehehheheh </i> </p>
                                <div className="mt-8 flex items-center space-x-2">
                                    <div className="flex flex-col space-y-2">
                                        <input
                                            type={`${see ? `text` : `password`}`}
                                            placeholder="set a password"
                                            className="w-[18rem] p-4 bg-gray-100/75 border-none text-secondary placeholder:text-gray-400 placeholder:font-stretch-50% outline-none"
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        {
                                            temp.lock && temp.password !== password && <p className="text-sm text-red-400"> oye, don't fool me. password's wrong </p>
                                        }
                                    </div>
                                    <button
                                        onClick={() => setSee(!see)}
                                        className="hover w-12 h-12 hover:bg-gray-200 rounded-md flex justify-center active:scale-75"
                                    >
                                        {
                                            see ? <EyeIcon
                                                className="hover w-6"
                                                onClick={() => setSee(!see)}
                                            /> : <EyeSlashIcon
                                                className="hover w-6"
                                                onClick={() => setSee(!see)}
                                            />
                                        }
                                    </button>
                                </div>
                                <button
                                    onClick={() => temp.type === 'folder' ? !temp.lock ? setFolderLock({
                                        password: password,
                                        folderId: temp.id
                                    }) : password === temp.password && unlockFolder({ folderId: temp.id }) : !temp.lock ? setFileLock({
                                        password: password,
                                        fileId: temp.id
                                    }) : password === temp.password && unlockFile({ fileId: temp.id })}
                                    className="p-2 outline-none bg-gray-600 rounded-md w-32 flex justify-center mt-16 text-white hover">
                                    Go
                                </button>
                            </>
                        }
                    </div>
                </motion.div>
            </AnimatePresence >
        </>
    )
}