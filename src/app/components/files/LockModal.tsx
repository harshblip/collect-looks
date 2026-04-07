import { useLockFolder, useUnlockFolder } from "@/app/hooks/useFolder";
import { useLockFile, useUnlockFile } from "@/app/hooks/useMedia";
import { cn } from "@/app/utils/cn";
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
        <div className="bg-[url('/sample-bg.png')] bg-center bg-cover w-[36rem] rounded-lg flex flex-col justify-center text-primary p-6">
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
            <div className="p-4">
              <div className="w-full flex justify-between">
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between">
                    <p className="text-secondary text-3xl w-full">
                      {temp.lock ? `unlock ` : `Lock `}
                      {temp.type}
                    </p>
                    <div className="w-full flex justify-end items-end"></div>
                  </div>
                  <p className="text-sm text-gray-400">
                    {" "}
                    set a strong password to protect your file from{" "}
                    <i>muheheheheh</i>{" "}
                  </p>
                </div>
              </div>
              <div className="mt-12 flex items-center space-x-2">
                <div className="flex flex-col space-y-6">
                  <div className="flex space-x-4 items-center">
                    <p className="text-gray-500">File name :</p>
                    <p className="bg-gray-50 pl-5 pr-5 text-secondary border border-gray-200 rounded-md p-2">
                      {temp.file_name}
                    </p>
                  </div>
                  <div className="flex space-x-4 items-center">
                    <p className="text-gray-500">Locked :</p>
                    <div className="bg-gray-100 rounded-md p-2 flex space-x-2 w-">
                      <div
                        className={cn([
                          "rounded-md p-2 pl-4 pr-4",
                          temp.lock ? `bg-gray-100` : ``,
                        ])}
                      >
                        lock
                      </div>
                      <div
                        className={cn([
                          "rounded-md p-2 pl-4 pr-4",
                          !temp.lock ? `bg-gray-200` : ``,
                        ])}
                      >
                        unlocked
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-4 items-center">
                    <p className="text-gray-500">Password :</p>
                    <input
                      type={`${see ? `text` : `password`}`}
                      placeholder="set a password"
                      className="w-[18rem] p-3 bg-gray-100/75 border-none text-secondary placeholder:text-gray-400 placeholder:font-stretch-50% outline-none"
                      onChange={(e) => setPassword(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          setLockUnlock();
                        }
                      }}
                    />
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
                  {temp.lock &&
                    temp.password !== password &&
                    password !== "" && (
                      <p className="text-sm text-red-400">
                        {" "}
                        oye, don't fool me. password's wrong{" "}
                      </p>
                    )}
                </div>
              </div>
            </div>
          )}
          <div className="w-full flex justify-end items-center space-x-2 -mt-6">
            <button
              className="border border-black hover:border-none hover:bg-gray-100 rounded-md transition hover text-xl p-2 mt-10"
              onClick={() => dispatch(setViewLockModal(false))}
            >
              {" "}
              <XMarkIcon
                className="
                                w-5 text-secondary"
              />{" "}
            </button>
            <button
              onClick={setLockUnlock}
              className="p-2 outline-none bg-gray-600 rounded-md w-32 flex justify-center mt-10 text-white hover"
            >
              Go
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
}
