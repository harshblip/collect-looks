import { Files } from "@/types/mediaTypes";
import { DocumentIcon, FolderIcon, PlayCircleIcon, SignalIcon } from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

interface PropTypes {
    index: number;
    searchSuggestions: Files[];
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>
    removeSuggestion: (x: number) => void;
}

export default function SuggestionButtons({ index, searchSuggestions, setSearchQuery, removeSuggestion }: PropTypes) {
    return (
        <button
            className="flex items-center justify-between hover hover:bg-gray-100 p-2 rounded-lg transition-all w-full z-2"
            onClick={() => setSearchQuery(searchSuggestions[index].file_name)}
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
                    searchSuggestions[index].file_type === 'image' ? <Image
                        src={`${searchSuggestions[index].file_name}`}
                        alt={`${searchSuggestions[index].file_name}`}
                        width={6}
                    /> : searchSuggestions[index].file_type === 'video' ? <PlayCircleIcon width={6} /> : searchSuggestions[index].file_type === 'audio' ? <SignalIcon width={6} /> : searchSuggestions[index].file_type === 'folder' ? <FolderIcon width={6} /> :
                        <DocumentIcon width={6} />
                }
                <XMarkIcon
                    className="w-6 h-6 text-gray-400"
                    onClick={() => removeSuggestion(index)}
                />
            </div>
        </button>
    )
}