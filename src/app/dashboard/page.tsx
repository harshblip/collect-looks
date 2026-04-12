"use client";

import {
  ChevronRightIcon,
  PhotoIcon,
  PlayIcon,
  SignalIcon,
} from "@heroicons/react/24/solid";
import { useAppSelector } from "@/lib/store";
import { useEffect, useState } from "react";
import { useGetAllFiles } from "../hooks/useMedia";
import { motion, AnimatePresence } from "framer-motion";
import Card from "../components/shared/Card";
import MoreOptions from "../components/ui/widgets/MoreOptions";
import ColumnHeaders from "../components/ui/primitives/ColumnHeaders";
import ToggleHeading from "../components/ui/widgets/ToggleHeading";
import {
  setSelectedFolders,
  setFolderItems,
  setViewFolder,
} from "@/lib/slice/folderSlice";
import { Files } from "@/types/mediaTypes";
import { useGetFolderItems } from "../hooks/useFolder";
import { useDispatch } from "react-redux";

import LockScreen from "../components/shared/LockScreen";
import { setIndex } from "@/lib/slice/folderSlice";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  DocumentTextIcon,
  FolderIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { setViewMediaFiles } from "@/lib/slice/filesSlice";
import { setDemoCheck, setViewMedia } from "@/lib/slice/generalSlice";
import Status from "../components/shared/Status";
import { resetEUID, setParentId } from "@/lib/slice/userSlice";
import KeyFeaturesPanel from "../components/ui/placeholders/KeyFeaturesPanel";
import MotionDiv from "../components/ui/primitives/PageTransition";
import ErrorPage from "../components/ui/placeholders/ErrorPage";
import { cn } from "../utils/cn";
import { CheckIcon, Grid, List } from "lucide-react";
import FilterItemsGroup from "../components/ui/widgets/FilterItemsGroup";

export default function Dashboard() {
  const files = useAppSelector((state) => state.files.files);
  const viewFolder = useAppSelector((state) => state.folders.viewFolder);
  const folderItemsArray = useAppSelector((state) => state.folders.folderItems);
  const userId = useAppSelector((state) => state.user.EUID.userId);
  const access_token = localStorage.getItem("access_token");
  const dispatch = useDispatch();
  const router = useRouter();

  const [selectedFolderId, setSelectedFolderId] = useState<number>(0);
  const [count, setCount] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [show, setShow] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(true);
  const [password, setPassword] = useState<string>("");
  const [locked, setLocked] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");

  const { data: allFiles, error: getAllFilesError } = useGetAllFiles(
    userId,
    currentPage,
  );
  const { data: folderItems, error: getFolderItemsError } = useGetFolderItems(
    userId,
    selectedFolderId,
  );
  const globalError: any = getAllFilesError || getFolderItemsError;

  // console.log("error", globalError, access_token);
  useEffect(() => {
    if (!access_token) {
      setShowError(true);
      dispatch(resetEUID());
      const timeout = setTimeout(() => {
        router.push("/");
      }, 2000);
      return () => clearTimeout(timeout);
    } else {
      setShowError(false);
    }
  }, []);

  useEffect(() => {
    if (folderItems) {
      dispatch(setFolderItems(folderItems));
    }
  }, [folderItems]);

  const folders = useAppSelector((state) => state.folders.selectedFolders);

  function openFolder(x: Files) {
    const obj = {
      id: x.id,
      name: x.file_name,
    };
    if (folders) {
      dispatch(setSelectedFolders([...folders, obj]));
    } else {
      dispatch(setSelectedFolders([obj]));
    }
    setCount((prevCount) => prevCount + 1);
    dispatch(setViewFolder(true));
    setSelectedFolderId(x.id);
    dispatch(setParentId(x.id));
    if (x.is_locked) {
      setLocked(true);
      setPassword(x.password || "");
    }
  }

  // console.log("parent_id", selectedFolderId);
  console.log(viewFolder)

  function openMedia(x: number, type: string) {
    dispatch(setIndex(x));
    dispatch(setViewMedia(true));
    if (type === "allFiles" && allFiles) {
      dispatch(setViewMediaFiles(allFiles));
    } else if (type === "folderFiles" && folderItems) {
      console.log("folderItems", folderItems);
      dispatch(setViewMediaFiles(folderItems));
    }
  }

  useEffect(() => {
    viewFolder
      ? folderItems && dispatch(setViewMediaFiles(folderItems))
      : allFiles && dispatch(setViewMediaFiles(allFiles));
  }, [viewFolder]);

  const getPageCount = (itemCount: number) =>
    Math.max(1, Math.ceil(itemCount / 15));

  const pages = viewFolder
    ? getPageCount(folderItems?.length ?? 0)
    : getPageCount(allFiles?.[0]?.total_count ?? 0);

  const [btns, setBtns] = useState<number[]>([]);
  useEffect(() => {
    setBtns(Array(pages).fill(0));
    // folders.length < 1 && dispatch(setParentId(null))
  }, [pages]);
  return (
    <>
      {globalError && (
        <MotionDiv className="absolute bottom-5 right-5">
          <Status type="ERROR" message={globalError.message} />
        </MotionDiv>
      )}
      {showError ? (
        <ErrorPage />
      ) : (
        <div className="flex flex-col space-y-0 mt-4 p-8 font-product">
          {viewFolder ? (
            <ToggleHeading isLocked={setLocked} />
          ) : (
            <MotionDiv className="text-4xl w-[75%] fixed font-medium h-40 pt-10 -mt-12 text-primary bg-white">
              {" "}
              Welcome to Collect{" "}
            </MotionDiv>
          )}
          {locked ? (
            <LockScreen password={password} setLocked={setLocked} />
          ) : (
            <div className="flex flex-col mt-16 bg-white">
              {files && files.length ? (
                <MoreOptions />
              ) : (
                <div className="flex flex-col">
                  <div className="fixed w-[75%] flex justify-between items-center">
                    <MotionDiv
                      className={`flex items-center text-primary hover:bg-gray-100 transition-all rounded-lg hover p-3 h-12 w-[160%] bg-white z-1 ${viewFolder && `-mt-12`}`}
                      onClick={() => setShow(!show)}
                    >
                      <div className="flex space-x-4">
                        <div
                          className={`transition-transform duration-300 ease-in-out ${show ? "rotate-90" : "rotate-0"}`}
                        >
                          <ChevronRightIcon className="w-6" />
                        </div>
                        <p className="text-xl text-primary"> Your files </p>
                      </div>
                    </MotionDiv>
                    <MotionDiv className={`flex space-x-8 justify-end w-[75%] z-1 ${viewFolder && `-mt-11`}`}>
                      {/* <FilterItemsGroup /> */}
                      <div className="flex space-x-2 justify-end items-center">
                        <button
                          onClick={() => setViewMode("grid")}
                          className={cn([
                            "border border-gray-200 rounded-md p-2 text-secondary hover active:scale-95",
                            viewMode === "grid" && "bg-gray-200",
                          ])}
                        >
                          {viewMode === "grid" ? (
                            <div className="flex gap-2 items-center">
                              <Grid />
                              <CheckIcon width={18} />
                            </div>
                          ) : (
                            <Grid />
                          )}
                        </button>
                        <button
                          onClick={() => setViewMode("list")}
                          className={cn([
                            "border border-gray-200 rounded-md p-2 text-secondary hover active:scale-95",
                            viewMode === "list" && "bg-gray-200",
                          ])}
                        >
                          {viewMode === "list" ? (
                            <div className="flex gap-2 items-center">
                              <List />
                              <CheckIcon width={18} />
                            </div>
                          ) : (
                            <List />
                          )}
                        </button>
                      </div>
                    </MotionDiv>
                  </div>
                  {!show && <KeyFeaturesPanel />}
                </div>
              )}
              <AnimatePresence>
                {show && (
                  <MotionDiv className={`${viewFolder && `-mt-2`} -mt-0 p-6`}>
                    {/* Column Headers */}
                    {viewMode === "list" && <ColumnHeaders />}

                    <div
                      className={cn([
                        viewMode === "grid" && "grid grid-cols-3 gap-4 mt-0",
                        viewMode === "list" &&
                          "flex flex-col divide-y divide-gray-100 mt-4",
                      ])}
                    >
                      {viewFolder
                        ? folderItemsArray?.map((x, i) => (
                            <MotionDiv
                              key={i}
                              onDoubleClick={() =>
                                x.file_type === "folder"
                                  ? openFolder(x)
                                  : openMedia(i, "folderFiles")
                              }
                              className="mt-"
                            >
                              <Card data={x} viewMode={viewMode} />
                            </MotionDiv>
                          ))
                        : allFiles?.map((x, i) => (
                            <MotionDiv
                              key={i}
                              onDoubleClick={() =>
                                x.file_type === "folder"
                                  ? openFolder(x)
                                  : openMedia(i, "allFiles")
                              }
                            >
                              <Card data={x} viewMode={viewMode} />
                            </MotionDiv>
                          ))}
                    </div>
                  </MotionDiv>
                )}
              </AnimatePresence>
              {show && (
                <div className="flex space-x-2 justify-center items-center bg-white shadow-md rounded-md p-2 text-secondary absolute right-25 bottom-15">
                  <ChevronDoubleLeftIcon className="w-4 hover" />
                  <ChevronLeftIcon
                    onClick={() =>
                      setCurrentPage((cr) => (cr > 0 ? cr - 1 : cr))
                    }
                    className="w-4 hover"
                  />
                  {btns.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className="bg-transparent outline-none p-1 pr-2 pl-2 hover hover:bg-gray-200 rounded-sm"
                    >
                      {i + 1}
                    </button>
                  ))}
                  <ChevronRightIcon
                    onClick={() =>
                      setCurrentPage((cr) => (cr < btns.length ? cr + 1 : cr))
                    }
                    className="w-4 hover"
                  />
                  <ChevronDoubleRightIcon className="w-4 hover" />
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
}
