import { ArrowRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";
;
import { DocumentIcon, PhotoIcon, PlayIcon, SignalIcon } from "@heroicons/react/24/outline";

interface StatCardProps {
    label: string;
    size: string;
    className?: string;
}



export default function StatCard({ label, size, className }: StatCardProps) {
    return (
        <>
            <div
                className={cn(
                    "w-[18rem] h-[12rem] flex justify-between flex-col space-y-2 rounded-md shadow-md p-4 hover:border hover:border-gray-300 transition-all group cursor-pointer",
                    className
                )}
            >
                <p className={`font-pixel text-secondary p-4 text-2xl flex justify-end`}>{size}</p>
                 <hr className="w-full border-2 border-gray-100 -mt-12" />
                <div className="flex justify-between items-end">
                    <div className="text-gray-200 w-16">
                        {
                            label === 'Documents' ? <DocumentIcon
                            /> : label === 'Photos' ? <PhotoIcon
                            /> : label === 'Videos' ? <PlayIcon
                            /> : <SignalIcon />
                        }
                    </div>
                    <div className="flex justify-end items-center text-lg text-secondary space-x-4">
                        <p className="text-xl group-hover:mr-4 transition-all">{label}</p>
                        <ArrowRightIcon className="w-5 text-secondary" />
                    </div>
                </div>
            </div>
        </>
    )
}