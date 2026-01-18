"use client";

import { setFileModal } from "@/lib/slice/filesSlice";
import { useAppSelector } from "@/lib/store";
import { ArrowsPointingInIcon } from "@heroicons/react/24/outline";
import { FolderIcon } from "@heroicons/react/24/solid";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useAddFilestoFolder, useGetFolders } from "../../hooks/useFolder";

interface Props {
  show: boolean;
}

export default function FolderList({ show }: Props) {
  const { data } = useGetFolders(3);
  const [id, setId] = useState<number>(0);
  const [name, setName] = useState<string>("");
  const files = useAppSelector((state) => state.files.files);
  console.log("files", files);
  const dispatch = useDispatch();
  const [created, setCreated] = useState<boolean>(false);

  useEffect(() => {
    if (created) {
      const timeout = setTimeout(() => {
        dispatch(setFileModal(false));
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [created]);

  const { mutate: addFilesToFolder } = useAddFilestoFolder();

  console.log("data", id, typeof id);
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.1, ease: "easeInOut" }}
        className="absolute bg-black/20 top-0   bottom-0 w-full flex justify-center items-center font-product -ml-8 h-full z-2"
      >
        <div className="bg-white bg-[url('/sample-bg.png')] bg-center bg-contain overflow-scroll rounded-lg flex flex-col items-center text-primary">
          {created ? (
            <p>
              {" "}
              {files.length} files added to {name} ✅{" "}
            </p>
          ) : (
            <>
              <div className=" flex flex-col mt-6 space-y-6 p-4">
                <h4 className="text-secondary text-xl ml-4">Add to a folder</h4>
                <hr className="ml-4 border-2 border-gray-400 -mt-4 w-[6rem]" />
                <div className="grid grid-cols-3 gap-[1]">
                  {data?.map((x, i) => (
                    <div
                      key={i}
                      className="flex justify-center items-center flex-col space-y-2 hover:bg-gray-200/50 p-4 hover transition rounded-md"
                      onClick={() => {
                        setName(x.file_name);
                        setId(x.id);
                      }}
                    >
                      <FolderIcon width={50} color="text-secondary" />
                      <p className="text-md"> {x.file_name} </p>
                    </div>
                  ))}
                </div>
                <div className={`flex justify-around w-full items-center mt-0`}>
                  {id > 0 ? (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.1, ease: "easeInOut" }}
                      className="bg-gray-600 text-white rounded-md p-3 flex items-center justify-between w-full"
                    >
                      <p className="ml-4">Add file to {name} ?</p>
                      <div className="flex space-x-4 mr-4">
                        <button
                          onClick={() => {
                            dispatch(setFileModal(false));
                            addFilesToFolder({ files: files, folderId: id });
                          }}
                          className="bg-white flex justify-center items-center outline-none text-primary p-2 active:scale-95 rounded-md h-8 w-[3rem] hover"
                        >
                          yes
                        </button>
                        <button
                          onClick={() => dispatch(setFileModal(false))}
                          className="flex justify-center items-center border border-white outline-none text-white p-2 active:scale-95 rounded-md h-8 w-[3rem] hover"
                        >
                          no
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    <button
                      className="text-primary flex justify-center items-center rounded-md w-[3rem] h-[3rem] hover"
                      onClick={() => dispatch(setFileModal(false))}
                    >
                      <ArrowsPointingInIcon className="w-6 text-secondary" />
                    </button>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </>
  );
}
