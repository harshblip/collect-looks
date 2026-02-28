"use client";

import { prefetchInfo, useDeleteFile, useStarFile } from "@/app/hooks/useMedia";
import { setLockModal } from "@/lib/slice/folderSlice";
import {
  setInfoData,
  setViewInfo,
  setViewLockModal,
} from "@/lib/slice/generalSlice";
import { Files } from "@/types/mediaTypes";
import { LockClosedIcon } from "@heroicons/react/24/outline";
import {
  InformationCircleIcon,
  StarIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { AnimatePresence, motion } from "framer-motion";
import { CircleDashed } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function MoreDialog({
  cardInfo,
  showMe,
}: {
  cardInfo: Files;
  showMe: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const {
    id,
    is_locked,
    file_type,
    password,
    file_name,
    file_url,
    size,
    starred,
    is_trashed
  } = cardInfo;
  const dispatch = useDispatch();
  const { mutate: starFile } = useStarFile();
  const { mutate: trashMedia } = useDeleteFile();
  const [show, setShow] = useState<boolean>(false);
  const { data, refetch } = prefetchInfo(3, id);

  const files: Files[] = [];
  console.log("typee", cardInfo);
  useEffect(() => {
    data && dispatch(setInfoData(data));
  }, [data]);

  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.1, ease: "easeInOut" }}
          className="bg-white font-product font-medium rounded-lg shadow-lg p-3 flex flex-col space-y-2 w-38 z-10"
        >
          <button
            className="flex hover hover:bg-gray-100 rounded-lg space-x-2 items-center text-secondary p-2 active:scale-95 w-full"
            onClick={() => {
              starFile({ userId: 3, fileId: id, starOrWhat: starred });
              showMe(false);
            }}
          >
            <StarIcon className="w-5 text-amber-400" />
            {starred ? <p>de-star</p> : <p> star </p>}
          </button>
          <button
            className="flex hover hover:bg-gray-100 rounded-lg space-x-2 p-2 items-center text-secondary active:scale-95 w-full"
            onClick={() => {
              dispatch(setViewInfo(true));
              showMe(false);
            }}
            onMouseEnter={() => refetch()}
          >
            <InformationCircleIcon className="w-5" />
            <p> info </p>
          </button>
          <button
            onClick={() => {
              dispatch(
                setLockModal({
                  lock: is_locked || false,
                  id: id,
                  type: file_type || "folder",
                  password: password || "",
                })
              );
              dispatch(setViewLockModal(true));
              showMe(false);
            }}
            className="flex hover hover:bg-gray-100 rounded-lg space-x-2 p-2 items-center text-secondary active:scale-95 w-full"
          >
            <LockClosedIcon className="w-5 mr-2" />
            {is_locked ? `unlock` : `lock`}
          </button>
          {
            is_trashed && <button className="flex hover hover:bg-cyan-100 hover:text-cyan-600 rounded-lg space-x-2 items-center active:scale-95 w-full p-2">
               <CircleDashed className="w-5"/>
               <p>recover</p> 
            </button>
          }
          <button
            className="flex hover hover:bg-red-100 hover:text-red-400 rounded-lg space-x-2 items-center p-2 active:scale-95 w-full"
            onClick={() => {
              trashMedia({
                files: [
                  {
                    fileName: file_name,
                    url: file_url,
                    size: size,
                    type: file_type,
                    fileId: id,
                    id: 3,
                  },
                ],
              });
              showMe(false);
            }}
          >
            <TrashIcon className="w-5" />
            <p> delete </p>
          </button>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
