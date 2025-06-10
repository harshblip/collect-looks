import { CircleStackIcon, ClockIcon, FolderIcon, HomeIcon, RectangleStackIcon, SparklesIcon, TrashIcon, UserGroupIcon } from "@heroicons/react/24/solid";

export default function Sidebar() {
    return (
        <>
            <div className=" flex flex-col justify-start space-y-4">
                <button className="mt-16 flex justify-center items-center p-2 w-32 bg-white rounded-lg font-product text-primary shadow-md space-x-2 hover:cursor-pointer">
                    <p className="text-xl"> + </p>
                    <p className="text-lg mt-1"> New </p>
                </button>
                <button className="mt-8 flex items-center w-[14rem] space-x-1 hover:cursor-pointer hover:bg-gray-200 transition-all ">
                    <HomeIcon
                        className="w-10 h-10 hover:cursor-pointer hover:bg-gray-200 rounded-lg p-2 transition-all text-primary ml-4"
                    />
                    <p className="font-product font-medium text-primary"> Home </p>
                </button>
                <button className="flex items-center w-[14rem] space-x-1 hover:cursor-pointer hover:bg-gray-200 transition-all ">
                    <FolderIcon
                        className="w-10 h-10 hover:cursor-pointer hover:bg-gray-200 rounded-lg p-2 transition-all text-primary ml-4"
                    />
                    <p className="font-product font-medium text-primary"> My drive </p>
                </button>
                <button className="flex items-center w-[14rem] space-x-1 hover:cursor-pointer hover:bg-gray-200 transition-all ">
                    <RectangleStackIcon
                        className="w-10 h-10 hover:cursor-pointer rounded-lg p-2 transition-all text-primary ml-4"
                    />
                    <p className="font-product font-medium text-primary"> Shared Drives </p>
                </button>
                <hr
                    className="text-secondary opacity-40 w-[14rem] mt-2"
                />
                <button className="flex items-center w-[14rem] space-x-1 hover:cursor-pointer hover:bg-gray-200 transition-all ">
                    <UserGroupIcon
                        className="w-10 h-10 hover:cursor-pointer rounded-lg p-2 transition-all text-primary ml-4"
                    />
                    <p className="font-product font-medium text-primary"> Shared with me </p>
                </button>
                <button className="flex items-center w-[14rem] space-x-1 hover:cursor-pointer hover:bg-gray-200 transition-all ">
                    <ClockIcon
                        className="w-10 h-10 hover:cursor-pointer rounded-lg p-2 transition-all text-primary ml-4"
                    />
                    <p className="font-product font-medium text-primary"> Recent </p>
                </button>
                <button className="flex items-center w-[14rem] space-x-1 hover:cursor-pointer hover:bg-gray-200 transition-all ">
                    <SparklesIcon
                        className="w-10 h-10 hover:cursor-pointer rounded-lg p-2 transition-all text-primary ml-4"
                    />
                    <p className="font-product font-medium text-primary"> Starred </p>
                </button>
                <hr
                    className="text-secondary opacity-40 w-[14rem] mt-2"
                />
                <button className="flex items-center w-[14rem] space-x-1 hover:cursor-pointer hover:bg-gray-200 transition-all ">
                    <TrashIcon
                        className="w-10 h-10 hover:cursor-pointer rounded-lg p-2 transition-all text-primary ml-4"
                    />
                    <p className="font-product font-medium text-primary"> Trash </p>
                </button>
                <button className="flex items-center w-[14rem] space-x-1 hover:cursor-pointer hover:bg-gray-200 transition-all ">
                    <CircleStackIcon
                        className="w-10 h-10 hover:cursor-pointer rounded-lg p-2 transition-all text-primary ml-4"
                    />
                    <p className="font-product font-medium text-primary"> Storage </p>
                </button>
            </div>
        </>
    )
}