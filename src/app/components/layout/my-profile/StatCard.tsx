import { ArrowRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";

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
                    "w-[18rem] flex flex-col space-y-2 rounded-md shadow-md p-4 hover:tracking-widest transition-all group cursor-pointer",
                    className
                )}
            >
                <p className="text-secondary flex justify-end">{size}</p>
                <hr className="w-full border-2 border-gray-100" />
                <div className="flex justify-end items-center text-lg text-secondary space-x-4">
                    <p className="text-lg group-hover:mr-4 transition-all">{label}</p>
                    <ArrowRightIcon className="w-5 text-secondary" />
                </div>
            </div>
        </>
    )
}