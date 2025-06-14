import { AllFiles } from "@/types/mediaTypes";
import { DocumentDuplicateIcon, PhotoIcon, PlayIcon, SignalIcon } from "@heroicons/react/24/solid";

export default function Card({ data }: {
    data: AllFiles
}) {
    return (
        <>
            <div className="bg-white rounded-lg p-3 flex space-x-4 font-product hover:bg-gray-100 transition  hover">
                {
                    data.file_type === "images" ? <PhotoIcon className="text-primary w-6" /> :
                        data.file_type === "videos" ? <PlayIcon className="text-primary w-6" /> :
                            data.file_type === "audio" ? <SignalIcon className="text-primary w-6" /> : <DocumentDuplicateIcon className="text-primary w-6" />
                }
                <p className="text-lg text-primary"> {data.file_name} </p>
            </div>
        </>
    )
}