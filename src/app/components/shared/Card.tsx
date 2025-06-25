import { AllFiles } from "@/types/mediaTypes";
import { DocumentDuplicateIcon, EllipsisVerticalIcon, PhotoIcon, PlayIcon, SignalIcon } from "@heroicons/react/24/solid";

export default function Card({ data }: {
    data: AllFiles
}) {

    function byteToSize(kb: number): string {
        if (kb === 0) return `0 bytes`;
        const arr = ['bytes', 'KB', 'MB']
        const i = (Math.floor(Math.log(kb) / Math.log(1024)), 10)
        return `${(kb / (1024 ** i)).toFixed(1)}${arr[i]}`
    }

    return (
        <>
            <div className="bg-white rounded-lg p-3 space-x-4 font-product hover:bg-gray-100 transition hover text-primary grid grid-cols-3 gap-6 px-4 py-4 items-center">
                <div className="flex space-x-4">

                    {
                        data.file_type === "images" ? <PhotoIcon className="text-emerald-500 w-6" /> :
                            data.file_type === "videos" ? <PlayIcon className="w-6 text-red-500" /> :
                                data.file_type === "audios" ? <SignalIcon className="w-6 text-cyan-500" /> : <DocumentDuplicateIcon className="w-6 text-indigo-500" />
                    }
                    <p className="text-lg font-medium"> {data.file_name} </p>
                </div>
                <div className="flex justify-end">
                    <p className="text-lg font-medium"> {data.created_at.substring(0, 10)} </p>
                </div>
                <div className="flex items-center space-x-4 justify-end">
                    <p className="text-lg font-medium"> {data.size} </p>
                    <p className="text-lg font-medium"> <EllipsisVerticalIcon className="w-5" /> </p>
                </div>
            </div>
        </>
    )
}