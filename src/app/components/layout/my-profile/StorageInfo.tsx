import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { Pixelify_Sans } from "next/font/google";
import StatCard from "./StatCard";

const pixel = Pixelify_Sans({
    weight: ['400', '500'],
    subsets: ['cyrillic', 'latin']
})

export default function StorageInfo() {

    const data = [
        { label: "Photos", size: "4MB" },
        { label: "Videos", size: "12MB" },
        { label: "Documents", size: "8MB" },
        { label: "Audio", size: "1MB" },
    ];

    return (
        <>
            <div className="flex flex-col space-y-10 mt-12 mb-12">
                <p className={`${pixel.className} text-4xl ml-10`}> Storage Usage </p>
                <div className="flex flex-wrap gap-8 justify-center">
                    {data.map((item) => (
                        <StatCard key={item.label} label={item.label} size={item.size} />
                    ))}
                </div>
            </div>
        </>
    )
}