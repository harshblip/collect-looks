import { AdjustmentsHorizontalIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";

export default function SearchBar() {
    return (
        <>
            <div className="relative w-[30rem]">
                <MagnifyingGlassIcon
                    className="w-10 h-10 hover:cursor-pointer hover:bg-gray-200 rounded-lg p-2 transition-all text-primary absolute left-2 top-1/2 transform -translate-y-1/2"
                />
                <input
                    className="bg-white font-product text-primary rounded-lg py-2 pl-14 pr-10 w-full outline-none h-16"
                    placeholder="Search in Collect"
                />
                <AdjustmentsHorizontalIcon
                    className="w-10 h-10 hover:cursor-pointer hover:bg-gray-200 rounded-lg p-2 transition-all text-primary absolute right-4 top-1/2 transform -translate-y-1/2"
                />
            </div>
        </>
    )
}