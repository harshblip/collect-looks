import { FingerPrintIcon, FolderOpenIcon, MagnifyingGlassIcon, SparklesIcon, StarIcon } from "@heroicons/react/24/outline"




export default function KeyFeaturesPanel() {
    return (
        <>
            <div className="mt-12 flex flex-col">
                <div className="flex justify-center items-center">
                    <div className={`font-pixel flex space-x-12 items-center text-secondary z-1 justify-center mt-18 mb-20`}>
                        <div className="p-10 flex flex-col text-center justify-center items-center space-y-4 border bg-gray-50/2 shadow-md rounded-md w-[16rem] h-[16rem]">
                            <div className="text-secondary flex space-x-2">
                                <StarIcon width={42} />
                                <FingerPrintIcon width={30} />
                            </div>
                            <p className="mt-2"> star, trash, hide/unhide files </p>
                        </div>
                        <hr
                            className="border border-gray-300 w-16"
                        />
                        <div className="p-10 flex flex-col text-center justify-center items-center space-y-4 border bg-gray-50/2 shadow-md rounded-md w-[16rem] h-[16rem]">
                            <div className="text-gray-400 flex gap-y-2">
                                <FolderOpenIcon width={62} />
                            </div>
                            <p> create folders. protect them w/ passwords </p>
                        </div>
                        <hr
                            className="border border-gray-300 w-16"
                        />
                        <div className="p-10 flex flex-col text-center justify-center items-center space-y-4 border bg-gray-50/2 shadow-md rounded-md w-[16rem] h-[16rem]">
                            <div className="text-secondary flex space-x-2 mt-2">
                                <MagnifyingGlassIcon width={42} />
                                <SparklesIcon width={30} />
                            </div>
                            <p className="mt-4"> search and find them through Collect's fast search </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}