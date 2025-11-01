import { Files } from "@/types/mediaTypes";
import { DocumentIcon, FolderIcon, PlayCircleIcon, SignalIcon } from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

interface PropTypes {
    index: number;
    searchSuggestions: (string | Files)[];
    searchQuery: string;
    idxValue: string | Files
    type: string
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>
    removeSuggestion: (x: number) => void;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export default function SuggestionButtons({ index, searchSuggestions, setSearchQuery, searchQuery, removeSuggestion, onClick, idxValue, type }: PropTypes) {
    console.log(idxValue, searchSuggestions[index])
    return (
        <div
            className="flex items-center justify-between hover hover:bg-gray-100 p-2 rounded-lg transition-all w-full z-2 "
        >
            <button
                onClick={onClick}
                className="flex justify-between w-full hover">
                <div className="flex items-center space-x-3">
                    <MagnifyingGlassIcon
                        className="w-6 h-6 text-gray-400"
                    />
                    <p
                        className="text-secondary font-normal "
                    > {typeof idxValue === 'string' ? idxValue : searchSuggestions[index].file_name} </p>
                </div>
                <div className="flex space-x-2 items-center">
                    {
                        typeof idxValue !== 'string' &&
                            searchSuggestions[index].file_type === 'image' && typeof searchSuggestions[index].file_url === 'string' && searchSuggestions[index].file_url.trim() !== '' &&
                            (/^(https?:\/\/|\/)/.test(searchSuggestions[index].file_url)) ? (
                            <Image
                                src={searchSuggestions[index].file_url}
                                alt={searchSuggestions[index].file_name || "image"}
                                width={25}
                                height={20}
                                className="rounded-xs mr-2"
                            />
                        ) : searchSuggestions[index].file_type === 'video' ? <PlayCircleIcon width={20} /> : searchSuggestions[index].file_type === 'audio' ? <SignalIcon width={20} /> : searchSuggestions[index].file_type === 'folder' ? <FolderIcon width={20} /> :
                            searchSuggestions[index].file_type === 'document' ? <DocumentIcon width={20} /> : <p className="italic text-gray-300 mr-4"> feeling lucky </p>
                    }
                </div>
            </button>
            {
                type === 'suggestion' && <XMarkIcon
                    className="w-8 h-8 text-gray-400 hover:bg-gray-200 rounded-md p-1"
                    onClick={(e) => {
                        e.preventDefault()
                        removeSuggestion(index)
                    }}
                />
            }
        </div>
    )
}