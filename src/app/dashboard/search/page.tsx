'use client'
import Card from "@/app/components/shared/Card"
import { useGetSearchResults } from "@/app/hooks/useMedia"
import { useAppSelector } from "@/lib/store"
import { HomeIcon } from "@heroicons/react/24/solid"
import { AnimatePresence, motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function SearchResults() {
    const searchQuery = useAppSelector(state => state.utility.searchQuery)
    const navigate = useRouter()
    const { data, refetch } = useGetSearchResults(searchQuery, 3)
    useEffect(() => {
        const timeout = setTimeout(() => {
            refetch()
        }, 2000)
        return () => clearTimeout(timeout)
    }, [searchQuery])

    console.log("search", data, searchQuery)
    return (
        <>
            <div className="flex flex-col space-y-0 mt-4 p-8 font-product text-secondary">
                {
                    data ? <> <div className="flex space-x-2 z-2 items-center">
                        <HomeIcon
                            onClick={() => navigate.push('/dashboard')}
                            className="w-10 text-secondary hover hover:bg-gray-200 rounded-lg p-2" />
                        <p> search results for "{searchQuery}"</p>
                    </div>
                        <div className="flex flex-col -mt-6 bg-white">
                            <AnimatePresence>
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.2 }}
                                    className="p-6"
                                >
                                    {/* Column Headers */}
                                    <div className="grid grid-cols-2 gap-4 px-4 py-2 border-b border-gray-200 mt-8">
                                        <p className="text-gray-500 font-semibold">Name</p>
                                        <div className="flex space-x-4 justify-end">
                                            <p className="text-gray-500 font-semibold">Size</p>
                                        </div>
                                    </div>

                                    <div className="flex flex-col divide-y divide-gray-100 mt-2">
                                        {
                                            data?.map((x, i) => (
                                                <div key={i}>
                                                    <Card
                                                        data={x}
                                                    />
                                                </div>
                                            ))
                                        }
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div> </> : <>
                        <p> no search results found for "{searchQuery}"</p>
                    </>
                }
            </div>
        </>
    )
}