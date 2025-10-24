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
}

export default function SuggestionButtons({ index, searchSuggestions, setSearchQuery, searchQuery, removeSuggestion }: PropTypes) {
    console.log(searchSuggestions[index])
    return (
        <div className="flex items-center space-x-10">
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
                            src={`${searchSuggestions[index].file_url}`}
                            alt={`${searchSuggestions[index].file_name}`}
                            width={20}
                            height={20}
                        /> : searchSuggestions[index].file_type === 'video' ? <PlayCircleIcon width={20} /> : searchSuggestions[index].file_type === 'audio' ? <SignalIcon width={20} /> : searchSuggestions[index].file_type === 'folder' ? <FolderIcon width={20} /> :
                            <DocumentIcon width={20} />
                    }
                    <XMarkIcon
                        className="w-6 h-6 text-gray-400"
                        onClick={() => removeSuggestion(index)}
                    />
                </div>
            </button>
        </div>
    )
}