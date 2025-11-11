'use client'

import { setDemoCheck, setSearchQuery, setSearchSuggestions, setViewMedia } from "@/lib/slice/generalSlice";
import { useAppSelector } from "@/lib/store";
import { AdjustmentsHorizontalIcon, MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import FilterModal from "../files/FilterModal";
import SuggestionButtons from "./SuggestionButtons";
import { useRouter } from "next/navigation";
import { useGetSuggestions } from "@/app/hooks/useMedia";
import { Files } from "@/types/mediaTypes";
import SearchResults from "@/app/dashboard/search/page";
import { InformationCircleIcon, PlayIcon, StarIcon, TrashIcon } from "@heroicons/react/24/outline";
import { byteToSize } from "@/app/utils/useful";
import Image from "next/image";
import { setViewMediaFiles } from "@/lib/slice/filesSlice";
import SearchMatchCard from "./SearchMatchCard";

export default function SearchBar() {

    const searchSuggestions = useAppSelector(state => state.utility.searchSuggestions)
    const dispatch = useDispatch()
    const navigate = useRouter()
    const [searchQuery, setSearchQuerY] = useState<string>('')
    const [visible, setVisible] = useState<boolean>(false)
    const [show, setShow] = useState<boolean>(false)
    const { refetch, data } = useGetSuggestions(searchQuery, 3)

    // console.log(searchSuggestions)
    // console.log(data)

    const inputRef = useRef<HTMLInputElement>(null);

    // useEffect(() => {
    //     const timeout = setTimeout(() => {
    //         refetch()
    //     }, 2000)
    //     return () => clearTimeout(timeout)
    // }, [searchQuery, refetch])

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
                e.preventDefault();
                inputRef.current?.focus();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    function viewSuggestions(data: Files[]) {
        // setSearchQuerY()
        dispatch(setViewMedia(true))
        dispatch(setViewMediaFiles(data))
    }

    function removeSuggestion(x: number) {
        dispatch(setSearchSuggestions(searchSuggestions.filter((_, i) => i !== x)))
    }

    function updateSuggestions() {
        console.log(searchQuery, typeof data)
        data && data.length > 0 && searchQuery.toLowerCase() === data[0].file_name.toLowerCase() ?
            dispatch(setSearchSuggestions([...searchSuggestions, data[0]])) :
            dispatch(setSearchSuggestions([...searchSuggestions, searchQuery]))
    }
    console.log(data)
    return (
        <>
            {
                show && <FilterModal
                    setShow={setShow}
                    show={show}
                />
            }
            <button 
            onClick={() => dispatch(setDemoCheck(true))}
            className="absolute bg-transparent text-transparent hover mt-24">
                reset
            </button>
            <div className="relative w-[30rem]">
                <button
                    onClick={() => {
                        setVisible(true)
                        refetch()
                    }}
                    className="w-10 h-10 hover hover:bg-gray-200 rounded-lg p-2 transition-all text-primary absolute left-2 top-1/2 transform -translate-y-1/2"
                >
                    <MagnifyingGlassIcon
                    />
                </button>
                <div
                    className="flex flex-col"
                >
                    <input
                        ref={inputRef}
                        className={`bg-white font-product text-primary rounded-xl focus:shadow-md py-2 pl-14 pr-10 w-full outline-none h-14`}
                        placeholder="Search in Collect   |   cmd+k"
                        onKeyDown={(e) => {
                            dispatch(setSearchQuery(searchQuery))
                            if (e.key === 'Enter') {
                                updateSuggestions()
                                setVisible(true)
                                refetch()
                                navigate.push('/dashboard/search')
                            }
                        }}
                        onChange={(e) => setSearchQuerY(e.target.value)}
                        value={searchQuery}
                        onClick={() => setVisible(!visible)}
                    />
                    <AnimatePresence>
                        {
                            !searchQuery ? visible && searchSuggestions.length ?
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.1, ease: 'easeInOut' }}
                                    className="bg-white shadow-lg rounded-lg flex-col space-y-2 mt-16 w-full p-2 z-5 absolute"
                                    onClick={() => console.log("clicked div")}
                                >
                                    {
                                        searchSuggestions && searchSuggestions.map((x, i) => <SuggestionButtons
                                            key={i}
                                            index={i}
                                            idxValue={x}
                                            type="suggestion"
                                            searchSuggestions={searchSuggestions}
                                            setSearchQuery={setSearchQuerY}
                                            searchQuery={searchQuery}
                                            removeSuggestion={removeSuggestion}
                                            onClick={() => viewSuggestions(searchSuggestions)}
                                        />
                                        )
                                    }
                                </motion.div>
                                : '' : data && <div className="absolute w-full mt-14 z-2">
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.1, ease: 'easeInOut' }}
                                        className="bg-white shadow-lg rounded-lg flex-col space-y-2 mt-2 z-5 p-2"
                                        onClick={() => console.log("clicked div")}
                                    >
                                        {
                                            data.map((_, i) => <SuggestionButtons
                                                key={i}
                                                index={i}
                                                type='data'
                                                idxValue={data}
                                                searchSuggestions={data}
                                                setSearchQuery={setSearchQuerY}
                                                searchQuery={searchQuery}
                                                removeSuggestion={removeSuggestion}
                                                onClick={() => viewSuggestions(data)}
                                            />
                                            )
                                        }
                                    </motion.div>
                                    <motion.div className="mt-2">
                                        {
                                            data.length > 0 && searchQuery.toLowerCase() === data[0].file_name.toLowerCase() && <>
                                                <SearchMatchCard result={data[0]} />
                                            </>
                                        }
                                    </motion.div>
                                </div>
                        }
                    </AnimatePresence>
                </div>
                <AdjustmentsHorizontalIcon
                    className="w-10 h-10 hover hover:bg-gray-200 active:scale-95 rounded-lg p-2 transition-all text-primary absolute right-4 top-1/2 transform -translate-y-1/2"
                    onClick={() => setShow(true)}
                />
            </div>
        </>
    )
}