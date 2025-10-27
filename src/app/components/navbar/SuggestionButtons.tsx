import { Files } from "@/types/mediaTypes";
import { DocumentIcon, FolderIcon, PlayCircleIcon, SignalIcon } from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

interface PropTypes {
    index: number;
    searchSuggestions: Files[];
    searchQuery: string;
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>
    removeSuggestion: (x: number) => void;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export default function SuggestionButtons({ index, searchSuggestions, setSearchQuery, searchQuery, removeSuggestion, onClick }: PropTypes) {
    console.log(searchSuggestions[index])
    return (
        <button
            className="flex items-center justify-between hover hover:bg-gray-100 p-2 rounded-lg transition-all w-full z-2"
            onClick={onClick}
        >
            <div className="flex items-center space-x-3">
                <MagnifyingGlassIcon
                    className="w-6 h-6 text-gray-400"
                />
                <p
                    className="text-secondary font-normal "
                > {searchSuggestions[index].file_name} </p>
            </div>
            <div className="flex space-x-2 items-center">
                {
                    searchSuggestions[index].file_type === 'image' && typeof searchSuggestions[index].file_url === 'string' && searchSuggestions[index].file_url.trim() !== '' && 
                    (/^(https?:\/\/|\/)/.test(searchSuggestions[index].file_url)) ? (
                        <Image
                            src={searchSuggestions[index].file_url}
                            alt={searchSuggestions[index].file_name || "image"}
                            width={20}
                            height={20}
                        />
                    ) : searchSuggestions[index].file_type === 'video' ? <PlayCircleIcon width={20} /> : searchSuggestions[index].file_type === 'audio' ? <SignalIcon width={20} /> : searchSuggestions[index].file_type === 'folder' ? <FolderIcon width={20} /> :
                        <DocumentIcon width={20} />
                }
                <XMarkIcon
                    className="w-6 h-6 text-gray-400"
                    onClick={() => removeSuggestion(index)}
                />
            </div>
        </button>
    )
}