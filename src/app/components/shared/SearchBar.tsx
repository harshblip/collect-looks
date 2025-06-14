'use client'

import { setSearchSuggestions } from "@/lib/slice/statesSlice";
import { useAppSelector } from "@/lib/store";
import { AdjustmentsHorizontalIcon, MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import FilterModal from "../FilterModal";

export default function SearchBar() {

    const searchSuggestions = useAppSelector(state => state.states.searchSuggestions)
    const dispatch = useDispatch()
    const [visible, setVisible] = useState<boolean>(false)
    const [searchQuery, setSearchQuery] = useState<string>('')
    const [show, setShow] = useState<boolean>(false)

    console.log(searchSuggestions)

    const inputRef = useRef<HTMLInputElement>(null);

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


    function addToSuggesstions(x: string) {
        if (searchSuggestions) {
            dispatch(setSearchSuggestions([...searchSuggestions, x]))
        } else {
            dispatch(setSearchSuggestions([x]));
        }
    }

    function removeSuggestion(x: number) {
        dispatch(setSearchSuggestions(searchSuggestions.filter((_, i) => i !== x)))
    }

    return (
        <>
            {
                show && <FilterModal
                    setShow={setShow}
                    show={show}
                />
            }
            <div className="relative w-[30rem]">
                <MagnifyingGlassIcon
                    className="w-10 h-10 hover hover:bg-gray-200 rounded-lg p-2 transition-all text-primary absolute left-2 top-1/2 transform -translate-y-1/2"
                />
                <div className="flex flex-col">
                    <input
                        ref={inputRef}
                        className={`bg-white font-product text-primary rounded-xl focus:shadow-md py-2 pl-14 pr-10 w-full outline-none h-14`}
                        placeholder="Search in Collect   |   cmd+k"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                addToSuggesstions((e.target as HTMLInputElement).value);
                            }
                        }}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        value={searchQuery}
                        onFocus={() => setVisible(true)}
                        onBlur={() => setVisible(false)}
                    />
                    <AnimatePresence>
                        {
                            visible && searchSuggestions.length ?
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.1, ease: 'easeInOut' }}
                                    className="bg-white shadow-lg rounded-lg flex-col space-y-2 absolute mt-16 w-full p-2 z-10"
                                >
                                    {
                                        searchSuggestions.map((x, i) => <button
                                            key={i}
                                            className="flex items-center justify-between hover hover:bg-gray-100 p-2 rounded-lg transition-all w-full"
                                            onClick={() => setSearchQuery(searchSuggestions[i])}
                                        >
                                            <div className="flex items-center space-x-3">
                                                <MagnifyingGlassIcon
                                                    className="w-6 h-6 text-gray-400"
                                                />
                                                <p
                                                    className="text-secondary font-normal "
                                                > {x} </p>
                                            </div>
                                            <div>
                                                <XMarkIcon
                                                    className="w-6 h-6 text-gray-400"
                                                    onClick={() => removeSuggestion(i)}
                                                />
                                            </div>
                                        </button>
                                        )
                                    }
                                </motion.div>
                                : ''
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