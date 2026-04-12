"use client";

import { byteToSize, getDeletionCountdown } from "@/app/utils/useful";
import { Files } from "@/types/mediaTypes";
import {
  DocumentDuplicateIcon,
  EllipsisVerticalIcon,
  PhotoIcon,
  PlayIcon,
  SignalIcon,
  StarIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";
import MoreDialog from "./MoreDialog";
import { useAppSelector } from "@/lib/store";
import { useDispatch } from "react-redux";
import { setFiles } from "@/lib/slice/filesSlice";
import {
  DocumentIcon,
  DocumentTextIcon,
  FolderIcon,
} from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";

export default function Card({
  data,
  viewMode,
}: {
  data: Files;
  viewMode: "grid" | "list";
}) {
  const [show, setShow] = useState<boolean>(false);
  const files = useAppSelector((state) => state.files.files);
  const dispatch = useDispatch();

  // console.log("data:-> ", files)

  function addOrRemove(data: Files) {
    if (files) {
      if (files.includes(data)) {
        dispatch(setFiles(files.filter((x) => x.file_name !== data.file_name)));
      } else {
        dispatch(setFiles([...files, data]));
      }
    } else {
      dispatch(setFiles([data]));
    }
  }

  return (
    <>
      <div
        className={cn([
          "rounded-lg p-3 space-x-4 font-product transition items-center hover text-secondary",
          `${files && files.includes(data) ? `bg-[#f8f9fa] m-1` : `bg-white`}`,
          `${viewMode === "grid" && `grid gap-6 px-4 py-4 items-center`}`,
        ])}
      >
        {viewMode === "grid" ? (
          <div className="shadow-md rounded-md flex h-[14rem] flex-col gap-4 p-2">
            {/* <div className="text-sm bg-gray-100 relative z-0 flex rounded-md w-fit ml-2 p-2 pl-4 pr-4">
              {data.file_type === "image" ? (
                <p>image</p>
              ) : data.file_type === "video" ? (
                <p>video</p>
              ) : data.file_type === "audio" ? (
                <p>audio</p>
              ) : data.file_type === "document" ? (
                <p>document</p>
              ) : (
                <p>folder</p>
              )}
            </div> */}
            <div className="bg-gray-50 w-full h-52 rounded-md flex justify-center items-center">
              <div className="">
                {data.file_type === "image" ? (
                  <PhotoIcon className="text-emerald-500 w-12" />
                ) : data.file_type === "video" ? (
                  <PlayIcon className="w-12 text-red-500" />
                ) : data.file_type === "audio" ? (
                  <SignalIcon className="w-12 text-cyan-500" />
                ) : data.file_type === "document" ? (
                  <DocumentTextIcon className="w-12 text-orange-600" />
                ) : (
                  <FolderIcon className="w-12 text-indigo-500" />
                )}
              </div>
            </div>
            <hr className="border border-gray-200 rounded-full ml-6 mr-6" />
            <div className="flex flex-col justify-start">
              <div className="rounded-md ml-2 flex items-start">
                <p className="text-lg font-medium"> {data.file_name} </p>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-400 ml-2">
                <p>{byteToSize(parseInt(data.size))}</p>
                <p className="text-gray-300 text-xl">•</p>
                <p>{data.created_at && data.created_at.substring(0, 10)}</p>
                <p className="text-gray-300 text-xl">•</p>
                <p>{data.is_locked ? "protected" : "open"}</p>
              </div>
            </div>
          </div>
        ) : (
          <div
            className={`grid py-2 gap-20 ${data.is_trashed ? "grid-cols-4" : "grid-cols-3"}`}
          >
            <div
              onClick={() => addOrRemove(data)}
              className="flex space-x-4 items-center"
            >
              {data.file_type === "image" ? (
                <PhotoIcon className="text-emerald-500 w-6" />
              ) : data.file_type === "video" ? (
                <PlayIcon className="w-6 text-red-500" />
              ) : data.file_type === "audio" ? (
                <SignalIcon className="w-6 text-cyan-500" />
              ) : data.file_type === "document" ? (
                <DocumentTextIcon className="w-6 text-orange-600" />
              ) : (
                <FolderIcon className="w-6 text-indigo-500" />
              )}
              <p className="text-lg font-medium"> {data.file_name} </p>
              {data.starred ? (
                <p className="text-lg font-medium -ml-1 mt-[0.2rem]">
                  {" "}
                  <StarIcon className="w-4 text-yellow-400" />{" "}
                </p>
              ) : (
                ""
              )}
            </div>
            <div onClick={() => addOrRemove(data)} className="flex justify-end">
              <p className="text-lg font-medium">
                {" "}
                {data.created_at && data.created_at.substring(0, 10)}{" "}
              </p>
            </div>
            {data.is_trashed && (
              <div className="flex items-center justify-end mr-20">
                <p className="text-lg font-medium">
                  {getDeletionCountdown(data.trashed_at)}
                </p>
              </div>
            )}
            <div className="flex items-center space-x-4 justify-end">
              <p className="text-lg font-medium">
                {data.size && byteToSize(parseInt(data.size))}
              </p>
              <button
                className="hover text-lg font-medium z-1"
                onClick={() => setShow(true)}
              >
                {" "}
                <EllipsisVerticalIcon className="w-5" />{" "}
              </button>
            </div>
          </div>
        )}
        {/* <div
          onClick={() => addOrRemove(data)}
          className="flex space-x-4 items-center"
        >
          {data.file_type === "image" ? (
            <PhotoIcon className="text-emerald-500 w-6" />
          ) : data.file_type === "video" ? (
            <PlayIcon className="w-6 text-red-500" />
          ) : data.file_type === "audio" ? (
            <SignalIcon className="w-6 text-cyan-500" />
          ) : data.file_type === "document" ? (
            <DocumentTextIcon className="w-6 text-orange-600" />
          ) : (
            <FolderIcon className="w-6 text-indigo-500" />
          )}
          <p className="text-lg font-medium"> {data.file_name} </p>
          {data.starred ? (
            <p className="text-lg font-medium -ml-1 mt-[0.2rem]">
              {" "}
              <StarIcon className="w-4 text-yellow-400" />{" "}
            </p>
          ) : (
            ""
          )}
        </div>
        <div onClick={() => addOrRemove(data)} className="flex justify-end">
          <p className="text-lg font-medium">
            {" "}
            {data.created_at && data.created_at.substring(0, 10)}{" "}
          </p>
        </div>
        {data.is_trashed && (
          <div className="flex items-center justify-end mr-20">
            <p className="text-lg font-medium">
              {getDeletionCountdown(data.trashed_at)}
            </p>
          </div>
        )}
        <div className="flex items-center space-x-4 justify-end">
          <p className="text-lg font-medium">
            {data.size && byteToSize(parseInt(data.size))}
          </p>
          <button
            className="hover text-lg font-medium z-1"
            onClick={() => setShow(true)}
          >
            {" "}
            <EllipsisVerticalIcon className="w-5" />{" "}
          </button>
        </div> */}
      </div>
      {show && (
        <div className="fixed right-30 -mt-20">
          <MoreDialog cardInfo={data} showMe={setShow} />
        </div>
      )}
    </>
  );
}
