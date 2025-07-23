'use client'
import { useAppSelector } from "@/lib/store"
import { HomeIcon } from "@heroicons/react/24/solid"
import { useRouter } from "next/navigation"

export default function SearchResults() {
    const searchQuery = useAppSelector(state => state.states.searchSuggestions)
    const navigate = useRouter()
    return (
        <>
            <div className="flex flex-col space-y-0 mt-4 p-8 font-product text-secondary">
                <div className="flex space-x-2 items-center">
                    <HomeIcon
                        onClick={() => navigate.push('/dashboard')}
                        className="w-10 text-secondary hover hover:bg-gray-200 rounded-lg p-2" />
                    <p> search results for "{searchQuery[searchQuery.length - 1]}" </p>
                </div>
            </div>
        </>
    )
}