"use client";

import {
  setDemoCheck,
  setSearchQuery,
  setSearchSuggestions,
  setViewMedia,
} from "@/lib/slice/generalSlice";
import { useAppSelector } from "@/lib/store";
import {
  AdjustmentsHorizontalIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import FilterModal from "../files/FilterModal";
import SuggestionButtons from "./SuggestionButtons";
import { useRouter } from "next/navigation";
import { useGetSuggestions } from "@/app/hooks/useMedia";
import { Files, Filter } from "@/types/mediaTypes";
import SearchResults from "@/app/dashboard/search/page";
import {
  InformationCircleIcon,
  PlayIcon,
  StarIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { byteToSize } from "@/app/utils/useful";
import Image from "next/image";
import { setViewMediaFiles } from "@/lib/slice/filesSlice";
import SearchMatchCard from "./SearchMatchCard";
import { setIndex } from "@/lib/slice/folderSlice";
import { formatDate } from "./DatePicker";
import MotionDiv from "../ui/primitives/PageTransition";

export default function SearchBar() {
  const searchSuggestions = useAppSelector(
    (state) => state.utility.searchSuggestions
  );
  const dispatch = useDispatch();
  const navigate = useRouter();
  const [searchQuery, setSearchQuerY] = useState<string>("");
  const [visible, setVisible] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const [filter, setFilter] = useState<Filter>({
    type: null,
    locked: null,
    starred: null,
    date: undefined,
  });
  const { refetch, data } = useGetSuggestions(searchQuery, 3, filter);
  console.log("data", data);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  function viewSuggestions(x: number, data: Files[]) {
    dispatch(setIndex(x));
    dispatch(setViewMedia(true));
    dispatch(setViewMediaFiles(data));
  }

  function removeSuggestion(x: number) {
    dispatch(setSearchSuggestions(searchSuggestions.filter((_, i) => i !== x)));
  }

  function updateSuggestions() {
    console.log(searchQuery, typeof data);
    data &&
    data.length > 0 &&
    searchQuery.toLowerCase() === data[0].file_name.toLowerCase()
      ? dispatch(setSearchSuggestions([...searchSuggestions, data[0]]))
      : dispatch(setSearchSuggestions([...searchSuggestions, searchQuery]));
  }

  const isFilterThere =
    filter.type || formatDate(filter.date) || filter.locked || filter.starred;
  console.log(filter);
  return (
    <>
      {show && (
        <FilterModal
          setFilters={setFilter}
          filters={filter}
          setShow={setShow}
          show={show}
        />
      )}
      <button
        onClick={() => dispatch(setDemoCheck(true))}
        className="absolute bg-transparent text-transparent hover mt-24"
      >
        reset
      </button>
      <div className="relative w-[30rem]">
        <button
          onClick={() => {
            setVisible(true);
            refetch();
          }}
          className="w-10 h-10 hover hover:bg-gray-200 rounded-lg p-2 transition-all text-primary absolute left-2 top-1/2 transform -translate-y-1/2"
        >
          <MagnifyingGlassIcon />
        </button>
        <div className="flex flex-col">
          <input
            ref={inputRef}
            className={`bg-white font-product text-primary rounded-xl focus:shadow-md py-2 pl-14 pr-10 w-full outline-none h-14`}
            placeholder="Search in Collect   |   cmd+k"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                updateSuggestions();
                setVisible(true);
                refetch();
                navigate.push("/dashboard/search");
              }
            }}
            onChange={(e) => {
              dispatch(
                setSearchQuery(
                  e.target.value === "" ? searchQuery : e.target.value
                )
              );
              setSearchQuerY(e.target.value);
            }}
            value={searchQuery}
            onClick={() => setVisible(!visible)}
          />
          {isFilterThere && (
            <MotionDiv className="flex items-center space-x-2 absolute mt-[3.6rem] w-full rounded-md p-4 text-sm h-10 z-2">
              <AnimatePresence>
                {filter.type && (
                  <button
                    onClick={() =>
                      setFilter((fil) => ({
                        ...fil,
                        type: null,
                      }))
                    }
                    className="border border-gray-400 w-fit h-6 flex items-center justify-center rounded-md text-gray-400 p-3"
                  >
                    <XMarkIcon className="w-4 text-gray-400 mr-1 -ml-1" />
                    {filter.type}
                  </button>
                )}
                {formatDate(filter.date) && (
                  <button
                    onClick={() =>
                      setFilter((fil) => ({
                        ...fil,
                        date: undefined,
                      }))
                    }
                    className="border border-gray-400 w-fit h-6 flex items-center justify-center rounded-md text-gray-400 p-3"
                  >
                    <XMarkIcon className="w-4 text-gray-400 mr-1 -ml-1" />
                    {`>`} {formatDate(filter.date)}
                  </button>
                )}
                {filter.locked && (
                  <button
                    onClick={() =>
                      setFilter((fil) => ({
                        ...fil,
                        locked: null,
                      }))
                    }
                    className="border border-gray-400 w-fit h-6 flex items-center justify-center rounded-md text-gray-400 p-3"
                  >
                    <XMarkIcon className="w-4 text-gray-400 mr-1 -ml-1" />
                    {filter.locked && "locked"}
                  </button>
                )}
                {filter.starred && (
                  <button
                    onClick={() =>
                      setFilter((fil) => ({
                        ...fil,
                        starred: null,
                      }))
                    }
                    className="border border-gray-400 w-fit h-6 flex items-center justify-center rounded-md text-gray-400 p-3"
                  >
                    <XMarkIcon className="w-4 text-gray-400 mr-1 -ml-1" />
                    {filter.starred ? "starred" : "unstarred"}
                  </button>
                )}
                <button
                  onClick={() =>
                    setFilter({
                      type: null,
                      date: undefined,
                      locked: null,
                      starred: null,
                    })
                  }
                  className="hover:cursor-pointer text-gray-400"
                >
                  clear
                </button>
              </AnimatePresence>
            </MotionDiv>
          )}
          <AnimatePresence>
            {!searchQuery ? (
              visible && searchSuggestions.length ? (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.1, ease: "easeInOut" }}
                  className="bg-white shadow-lg rounded-lg flex-col space-y-2 mt-16 w-full p-2 z-5 absolute"
                  onClick={() => console.log("clicked div")}
                >
                  {searchSuggestions &&
                    searchSuggestions.map((x, i) => (
                      <SuggestionButtons
                        key={i}
                        index={i}
                        idxValue={x}
                        type="suggestion"
                        searchSuggestions={searchSuggestions}
                        setSearchQuery={setSearchQuerY}
                        searchQuery={searchQuery}
                        removeSuggestion={removeSuggestion}
                        onClick={() => viewSuggestions(i, searchSuggestions)}
                      />
                    ))}
                </motion.div>
              ) : (
                ""
              )
            ) : (
              data && (
                <div className="absolute w-full mt-14 z-2">
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.1, ease: "easeInOut" }}
                    className="bg-white shadow-lg rounded-lg flex-col space-y-2 mt-2 z-5 p-2"
                    onClick={() => console.log("clicked div")}
                  >
                    {data.length > 0 ? (
                      data.map((_, i) => (
                        <SuggestionButtons
                          key={i}
                          index={i}
                          type="data"
                          idxValue={data}
                          searchSuggestions={data}
                          setSearchQuery={setSearchQuerY}
                          searchQuery={searchQuery}
                          removeSuggestion={removeSuggestion}
                          onClick={() => viewSuggestions(i, data)}
                        />
                      ))
                    ) : (
                      <div>
                        <p className="italic text-gray-400 text-sm p-2">
                          no results found
                        </p>
                      </div>
                    )}
                  </motion.div>
                  <motion.div className="mt-2">
                    {data.length > 0 &&
                      searchQuery.toLowerCase() ===
                        data[0].file_name.toLowerCase() && (
                        <>
                          <SearchMatchCard result={data[0]} />
                        </>
                      )}
                  </motion.div>
                </div>
              )
            )}
          </AnimatePresence>
        </div>
        <button
          className="w-10 h-10 hover hover:bg-gray-200 active:scale-95 rounded-lg p-2 transition-all text-primary absolute right-4 top-1/2 transform -translate-y-1/2"
          onClick={() => setShow(true)}
        >
          <AdjustmentsHorizontalIcon />
        </button>
      </div>
    </>
  );
}
