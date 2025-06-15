import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/solid";

interface PropTypes {
    index: number;
    searchSuggestions: string[];
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>
    removeSuggestion: (x: number) => void;
}

export default function SuggestionButtons({ index, searchSuggestions, setSearchQuery, removeSuggestion }: PropTypes) {
    return (
        <button
            className="flex items-center justify-between hover hover:bg-gray-100 p-2 rounded-lg transition-all w-full"
            onClick={() => setSearchQuery(searchSuggestions[index])}
        >
            <div className="flex items-center space-x-3">
                <MagnifyingGlassIcon
                    className="w-6 h-6 text-gray-400"
                />
                <p
                    className="text-secondary font-normal "
                > {searchSuggestions[index]} </p>
            </div>
            <div>
                <XMarkIcon
                    className="w-6 h-6 text-gray-400"
                    onClick={() => removeSuggestion(index)}
                />
            </div>
        </button>
    )
}