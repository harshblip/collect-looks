import { useLockFolder, useUnlockFolder } from "@/app/hooks/useFolder";
import { useLockFile, useUnlockFile } from "@/app/hooks/useMedia";
import { setViewLockModal } from "@/lib/slice/generalSlice";
import { useAppSelector } from "@/lib/store";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { EyeSlashIcon } from "@heroicons/react/24/solid";
import { AnimatePresence, motion } from "framer-motion";
import { EyeIcon } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function LockModal() {
  const temp = useAppSelector((state) => state.folders.lockModal);
  const folderId = useAppSelector((state) => state.user.parent_id);
  const dispatch = useDispatch();

  const { mutate: setFileLock } = useLockFile();
  const { mutate: unlockFile } = useUnlockFile();
  const { mutate: unlockFolder } = useUnlockFolder();
  const { mutate: setFolderLock } = useLockFolder();

  const [see, setSee] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [gayab, setGayab] = useState<boolean>(false);

  console.log(temp);

  function setLockUnlock() {
    setGayab(true);
    temp.type === "folder"
      ? !temp.lock
        ? setFolderLock({
            password: password,
            folderId: temp.id,
            parent_id: folderId,
          })
        : password === temp.password &&
          unlockFolder({ parent_id: folderId, folderId: temp.id })
      : !temp.lock
        ? setFileLock({
            password: password,
            fileId: temp.id,
            parent_id: folderId,
          })
        : password === temp.password &&
          unlockFile({ parent_id: folderId, fileId: temp.id });
    const timeout = setTimeout(() => {
      dispatch(setViewLockModal(false));
    }, 2000);
    return () => clearInterval(timeout);
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.1, ease: "easeInOut" }}
        className="absolute bg-black/20 top-0 bottom-0 w-full flex justify-center items-center -ml-12 font-product z-2"
      >
        <div className="bg-white  bg-center bg-contain w-[30rem] rounded-lg flex flex-col justify-center items-center text-primary p-6">
          {gayab ? (
            <AnimatePresence mode="wait">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="p-2 rounded-md"
              >
                <p className="text-secondary text-lg">
                  {" "}
                  {temp.type} successfully{" "}
                  {temp.lock ? `unlocked ✅` : `locked ✅`}{" "}
                </p>
              </motion.div>
            </AnimatePresence>
          ) : (
            <>
              {" "}
              <div className="w-full flex justify-between items-center">
                <button className="ml-14"></button>
                <p className="text-secondary text-2xl">
                  {temp.lock ? `unlock ` : `Lock `}
                  {temp.type}
                </p>
                <button
                  className="hover:border hover:border-black rounded-md transition hover mr-4 text-xl p-2 flex justify-center"
                  onClick={() => dispatch(setViewLockModal(false))}
                >
                  {" "}
                  <XMarkIcon
                    className="
                                w-4 text-secondary"
                  />{" "}
                </button>
              </div>
              <p className="text-md text-gray-400 mt-8">
                {" "}
                set a strong password for this file to protect it from <br />{" "}
                <i> muhehehheheh </i>{" "}
              </p>
              <div className="mt-8 flex items-center space-x-2">
                <div className="flex flex-col space-y-2">
                  <input
                    type={`${see ? `text` : `password`}`}
                    placeholder="set a password"
                    className="w-[18rem] p-4 bg-gray-100/75 border-none text-secondary placeholder:text-gray-400 placeholder:font-stretch-50% outline-none"
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        setLockUnlock();
                      }
                    }}
                  />
                  {temp.lock &&
                    temp.password !== password &&
                    password !== "" && (
                      <p className="text-sm text-red-400">
                        {" "}
                        oye, don't fool me. password's wrong{" "}
                      </p>
                    )}
                </div>
                <button
                  onClick={() => setSee(!see)}
                  className="hover w-12 h-12 hover:bg-gray-200 rounded-md flex justify-center active:scale-75"
                >
                  {see ? (
                    <EyeIcon
                      className="hover w-6 mt-3"
                      onClick={() => setSee(!see)}
                    />
                  ) : (
                    <EyeSlashIcon
                      className="hover w-6"
                      onClick={() => setSee(!see)}
                    />
                  )}
                </button>
              </div>
              <button
                onClick={setLockUnlock}
                className="p-2 outline-none bg-gray-600 rounded-md w-32 flex justify-center mt-10 text-white hover"
              >
                Go
              </button>
            </>
          )}
        </div>
      </motion.div>
    </>
  );
}
