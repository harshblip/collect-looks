import { prefetchInfo } from "@/app/hooks/useMedia";
import { byteToSize } from "@/app/utils/useful";
import {
  setInfoData,
  setViewInfo,
  setViewMedia,
} from "@/lib/slice/generalSlice";
import { useAppSelector } from "@/lib/store";
import {
  ArrowsPointingInIcon,
  ArrowUpRightIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import React from "react";
import { useDispatch } from "react-redux";

const MediaHeader = ({ updateI }: { updateI: number }) => {
  const openFiles = useAppSelector((state) => state.files.viewMediaFiles);
  const file = openFiles[updateI];
  const { data, refetch } = prefetchInfo(3, file.id);
  const dispatch = useDispatch();
  return (
    <>
      <div className="bg-white rounded-md w-[60%] p-2 shadow-md z-2">
        <div className="bg-gray-100 p-2 rounded-md flex items-center justify-between text-secondary">
          <div className="flex space-x-4">
            <button className="ml-2 border border-gray-400 rounded-md p-2">
              {" "}
              <ArrowUpRightIcon className="w-4" />{" "}
            </button>
            <ArrowsPointingInIcon
              onClick={() => dispatch(setViewMedia(false))}
              className="text-primary w-10 hovper border border-gray-400 p-2 rounded-md"
            />
            <InformationCircleIcon
              onMouseEnter={() => refetch()}
              onClick={() => {
                dispatch(setViewInfo(true));
                data && dispatch(setInfoData(data));
              }}
              className="text-primary w-10 hover border border-gray-400 p-2 rounded-md"
            />
          </div>
          <p className=" text-xl p-2 ml-12 rounded-md"> {file.file_name} </p>
          <div className="flex items-center space-x-1">
            <p className="p-2 rounded-md">
              {" "}
              {file.created_at.substring(0, 10)}{" "}
            </p>
            <p className="text-xl">|</p>
            <p className="p-2 rounded-md">
              {" "}
              {byteToSize(parseInt(file.size))}{" "}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(MediaHeader);
