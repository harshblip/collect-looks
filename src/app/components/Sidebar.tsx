'use client'

import { CircleStackIcon, ClockIcon, FolderIcon, HomeIcon, RectangleStackIcon, SparklesIcon, TrashIcon, UserGroupIcon } from "@heroicons/react/24/solid";
import SidebarButton from "./shared/SidebarButtons";
import { useRouter } from "next/navigation";
import { useState } from "react";
import UploadModal from "./navbar/UploadModal";

export default function Sidebar() {

    const [show, setShow] = useState<boolean>(false)
    const router = useRouter()

    return (
        <>
            <div className=" flex flex-col justify-start space-y-4">
                <UploadModal />
                <button
                    className="active:scale-95 mt-14 flex justify-center items-center p-2 w-32 bg-white rounded-lg font-product text-primary shadow-md space-x-2 hover"
                    onClick={() => setShow(true)}
                    onBlur={() => setShow(false)}
                >
                    <p className="text-xl"> + </p>
                    <p className="text-lg mt-1"> New </p>
                </button>
                {
                    show && <UploadModal />
                }
                <div className="mt-0" />
                <SidebarButton
                    label="Home"
                    icon={<HomeIcon className="w-full h-full" />}
                    onClick={() => router.push("/dashboard")}
                />
                <SidebarButton
                    label="My Drive"
                    icon={<FolderIcon className="w-full h-full" />}
                    onClick={() => console.log("Go to My Drive")}
                />
                <SidebarButton
                    label="Shared Drives"
                    icon={<RectangleStackIcon className="w-full h-full" />}
                    onClick={() => console.log("Go to Shared Drives")}
                />
                <hr
                    className="text-secondary opacity-40 w-[14rem] mt-2"
                />
                <SidebarButton
                    label="Shared with me"
                    icon={<UserGroupIcon className="w-full h-full" />}
                    onClick={() => console.log("Go to Shared with me")}
                />
                <SidebarButton
                    label="Recent"
                    icon={<ClockIcon className="w-full h-full" />}
                    onClick={() => router.push('/dashboard/recent')}
                />
                <SidebarButton
                    label="Starred"
                    icon={<SparklesIcon className="w-full h-full" />}
                    onClick={() => router.push("/dashboard/starred")}
                />
                <hr
                    className="text-secondary opacity-40 w-[14rem] mt-2"
                />
                <SidebarButton
                    label="Trash"
                    icon={<TrashIcon className="w-full h-full" />}
                    onClick={() => router.push("/dashboard/trash")}
                />
                <SidebarButton
                    label="Storage"
                    icon={<CircleStackIcon className="w-full h-full" />}
                    onClick={() => router.push("/dashboard/storage")}
                />
            </div>
        </>
    )
}