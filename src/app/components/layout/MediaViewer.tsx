"use client";

import { prefetchInfo } from "@/app/hooks/useMedia";
import { useUpdateLastOpened } from "@/app/hooks/useUser";
import { setInfoData } from "@/lib/slice/generalSlice";
import { useAppSelector } from "@/lib/store";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  FolderIcon,
  QrCodeIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { EyeSlashIcon } from "@heroicons/react/24/solid";
import { AnimatePresence, motion } from "framer-motion";
import { EyeIcon } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import MediaHeader from "../ui/widgets/MediaHeader";
import ShowMedia from "../ui/widgets/ShowMedia";

const MediaViewer = () => {
  const dispatch = useDispatch();
  const index = useAppSelector((state) => state.folders.index);
  const openFiles = useAppSelector((state) => state.files.viewMediaFiles);

  const [see, setSee] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);
  const [showPolice, setShowPolice] = useState<boolean>(false);

  const [updateI, setUpdateI] = useState<number>(index);

  const { mutate: updateLastOpened } = useUpdateLastOpened();
  const { data, refetch } = prefetchInfo(3, openFiles[updateI].id);

  console.log(openFiles[updateI].password, openFiles[updateI]);

  useEffect(() => {
    const type = openFiles[updateI].file_type === null ? "folders" : "files";
    updateLastOpened({ type: type, fileId: openFiles[updateI].id });
  }, []);

  function checkPass() {
    password !== openFiles[updateI].password
      ? setShowPolice(true)
      : setShow(true);
    const timeout = setTimeout(() => {
      setShowPolice(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }

  useEffect(() => {
    data && dispatch(setInfoData(data));
  }, [data]);

  return (
    <>
      <div className="font-product absolute bg-black/20 flex flex-col justify-center items-center w-full top-0 bottom-0 -ml-8 z-10">
        <div className="absolute w-full top-10 flex justify-center">
          {show && openFiles[updateI].is_locked && <MediaHeader updateI={updateI} />}
        </div>
        <div className="flex space-x-4">
          <ArrowLeftIcon
            onClick={() => setUpdateI((x) => (x > 0 ? x - 1 : x))}
            className="w-9 p-2 rounded-md text-secondary active:scale-95 bg-white hover absolute top-[50%] left-20"
          />
          {!show && openFiles[updateI].is_locked ? (
            <>
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.1, ease: "easeInOut" }}
                  className="flex flex-col space-y-4"
                >
                  <div className="flex justify-between items-end w-[34rem] h-[12rem] rounded-md bg-white p-8 text-gray-300">
                    {showPolice ? (
                      <div className="flex space-x-4 items-center">
                        <Image
                          src="/pepe-officer.png"
                          height={0}
                          width={140}
                          alt="wrong password"
                          className="rounded-md transition duration-900 ease-in-out"
                        />
                        <p className="text-xl text-red-400"> nice try </p>
                      </div>
                    ) : (
                      <motion.p
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.1, ease: "easeInOut" }}
                        className="text-5xl transition duration-900 ease-in-out"
                      >
                        {" "}
                        Locked...{" "}
                      </motion.p>
                    )}
                    <QrCodeIcon className="w-16 mr-4 mb-14" />
                  </div>
                  <div className="bg-gray-50 p-5 rounded-md flex items-center justify-center text-white">
                    <div className="flex justify-start items-center space-x-2 -ml-">
                      <input
                        type={`${see ? `text` : `password`}`}
                        placeholder="type your password"
                        className="w-[24rem] border border-gray-400 p-4 text-secondary placeholder:text-gray-400 placeholder:font-stretch-50% outline-none rounded-md focus:shadow-md focus:border-gray-200"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <button
                        onClick={() => setSee(!see)}
                        className="hover w-12 h-12 hover:bg-gray-200 rounded-md flex justify-center active:scale-95 -ml-16 text-gray-400"
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
                      onClick={checkPass}
                      className="p-4 outline-none text-gray-600 rounded-md flex justify-center bg-white hover ml-16 hover:bg-gray-400 hover:text-white transition"
                    >
                      Go
                    </button>
                  </div>
                  <div className="bg-white rounded-md p-4 text-gray-400 flex flex-col">
                    <div className="flex justify-between text-gray-400 space-x-2">
                      <SparklesIcon className="w-6 text-secondary ml-2" />
                      <p>
                        {" "}
                        secured by <span className="text-xl">Collect</span>
                      </p>
                      <SparklesIcon className="w-6 text-secondary mr-2" />
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </>
          ) : (
            <>
              <motion.div
                key={openFiles[updateI].id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.1, ease: "easeInOut" }}
                className="flex flex-col items-center justify-center rounded-lg w-[100%] p-4 overflow-hidden"
              >
                {openFiles[updateI].file_type === null ? (
                  <div className="h-[12rem] primary-bg flex items-center text-secondary justify-center flex-col space-y-4 p-6 rounded-md">
                    <FolderIcon className="w-8" />
                    <p> This is a folder </p>
                    <p className="-mt-2">
                      {" "}
                      exit this view and double tap on it to open{" "}
                    </p>
                  </div>
                ) : (
                  <>
                    <ShowMedia files={openFiles[updateI]} />
                  </>
                )}
              </motion.div>
            </>
          )}

          <ArrowRightIcon
            onClick={() =>
              setUpdateI((x) => (x < openFiles.length ? x + 1 : x))
            }
            className="w-9 p-2 rounded-md text-secondary hover absolute top-[50%] right-20 active:scale-95 bg-white"
          />
        </div>
      </div>
    </>
  );
};

export default React.memo(MediaViewer);
