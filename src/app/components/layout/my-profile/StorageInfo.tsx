import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { Pixelify_Sans } from "next/font/google";
import StatCard from "./StatCard";
import { byteToSize } from "@/app/utils/useful";

const pixel = Pixelify_Sans({
    weight: ['400', '500'],
    subsets: ['cyrillic', 'latin']
})

export default function StorageInfo({photo, video, audio, doc} : {
    photo: string,
    video: string,
    audio: string,
    doc: string
}) {

    const data = [
        { label: "Photos", size: `${byteToSize(parseInt(photo))}` },
        { label: "Videos", size: `${byteToSize(parseInt(video))}` },
        { label: "Documents", size: `${byteToSize(parseInt(doc))}` },
        { label: "Audio", size: `${byteToSize(parseInt(audio))}` },
    ];

    console.log("data", data)

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