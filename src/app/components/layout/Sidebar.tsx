"use client";

import { useKeyboardShortcuts } from "@/app/hooks/useMedia";
import { setViewCreateFolder } from "@/lib/slice/folderSlice";
import { setViewMedia } from "@/lib/slice/generalSlice";
import { useAppSelector } from "@/lib/store";
import {
    CircleStackIcon,
    ClockIcon,
    FolderIcon,
    HomeIcon,
    RectangleStackIcon,
    SparklesIcon,
    TrashIcon,
    UserGroupIcon,
} from "@heroicons/react/24/solid";
import { AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import CreateFolder from "../files/CreateFolder";
import LockModal from "../files/LockModal";
import SidebarButton from "./sidebar/SidebarButtons";
import InfoCard from "../shared/InfoCard";
const UploadModal = dynamic(() => import("../navbar/UploadModal"));
const FileUploader = dynamic(() => import("../files/FileUploader"));
const MediaViewer = dynamic(() => import("./MediaViewer"));
const FolderList = dynamic(() => import("../files/FolderList"));

export default function Sidebar() {
  const dispatch = useDispatch();
  const [show, setShow] = useState<boolean>(false);
  const showCreateFolder = useAppSelector(
    (state) => state.folders.viewCreateFolder
  );
  const [showFileUpload, setShowFileUpload] = useState<boolean>(false);
  const showFileModal = useAppSelector((state) => state.files.fileModal);
  const infoData = useAppSelector((state) => state.utility.infoData);
  const viewInfo = useAppSelector((state) => state.utility.viewInfo);
  const viewMedia = useAppSelector((state) => state.utility.viewMedia);
  const viewLockModal = useAppSelector((state) => state.utility.viewLockModal);

  const router = useRouter();

  useEffect(() => {
    dispatch(setViewMedia(false));
  }, []);

  useKeyboardShortcuts({
    "^": () => dispatch(setViewCreateFolder(true)),
    i: () => setShowFileUpload((lol) => !lol),
    ".": () => router.push("/dashboard"),
    ";": () => router.push("/dashboard/recent"),
    "*": () => router.push("/dashboard/starred"),
    "!": () => router.push("/dashboard/trash"),
  });

  return (
    <>
      <div className="hidden md:flex flex-col justify-start space-y-4">
        <button
          className="active:scale-95 mt-14 flex justify-center items-center p-2 w-32 bg-white rounded-lg font-product text-primary shadow-md space-x-2 hover"
          onClick={() => setShow(true)}
          // onBlur={() => setShow(false)}
        >
          <p className="text-xl"> + </p>
          <p className="text-lg mt-1"> New </p>
        </button>
        {show && (
          <UploadModal setShow={setShow} showFileUploader={setShowFileUpload} />
        )}
        <AnimatePresence mode="wait">
          {showCreateFolder && <CreateFolder />}
          {showFileUpload && <FileUploader show={setShowFileUpload} />}
          {showFileModal && <FolderList show={showFileModal} />}
          {!viewInfo || (infoData && <InfoCard data={infoData} />)}
          {viewMedia && <MediaViewer />}
          {viewLockModal && <LockModal />}
        </AnimatePresence>
        <div className="mt-0" />
        <SidebarButton
          label="Home"
          icon={<HomeIcon className="w-full h-full" />}
          onClick={() => router.push("/dashboard")}
        />
        <SidebarButton
          label="My Drive"
          icon={<FolderIcon className="w-full h-full" />}
          onClick={() => console.log("Go to My Drive")}
        />
        <SidebarButton
          label="Shared Drives"
          icon={<RectangleStackIcon className="w-full h-full" />}
          onClick={() => console.log("Go to Shared Drives")}
        />
        <hr className="text-secondary opacity-40 w-[14rem] mt-2" />
        <SidebarButton
          label="Shared with me"
          icon={<UserGroupIcon className="w-full h-full" />}
          onClick={() => console.log("Go to Shared with me")}
        />
        <SidebarButton
          label="Recent"
          icon={<ClockIcon className="w-full h-full" />}
          onClick={() => router.push("/dashboard/recent")}
        />
        <SidebarButton
          label="Starred"
          icon={<SparklesIcon className="w-full h-full" />}
          onClick={() => router.push("/dashboard/starred")}
        />
        <hr className="text-secondary opacity-40 w-[14rem] mt-2" />
        <SidebarButton
          label="Trash"
          icon={<TrashIcon className="w-full h-full" />}
          onClick={() => router.push("/dashboard/trash")}
        />
        <SidebarButton
          label="Storage"
          icon={<CircleStackIcon className="w-full h-full" />}
          onClick={() => router.push("/dashboard/storage")}
        />
      </div>
    </>
  );
}
