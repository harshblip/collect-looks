import { DocumentIcon, FolderIcon, PhotoIcon, SignalIcon } from "@heroicons/react/24/outline";
import { Pixelify_Sans } from "next/font/google";

const pixel = Pixelify_Sans({
    weight: ['400', '500'],
    subsets: ['cyrillic', 'latin']
})

export default function Footer() {

    return (
        <>
            <div className="rounded-md p-4 flex font-product justify-between mt-12 mb-2 mr-16 ml-16">
                <div className="mt-24 flex flex-col">
                    <p className="text-gray-400 ml-[16rem]"> cohesive media cloud <br /> <i>built to last</i></p>
                    <p className={`font-medium text-[8rem] -mt-12 text-gray-300 ml-6`}>
                        Collect
                    </p>
                </div>
                <div className="flex space-x-4 mt-24 ml-24">
                    <div className="">
                        <DocumentIcon className="text-gray-300 w-8 -mt-12 mr-24 rotate-45" />
                        <FolderIcon className="text-gray-300 w-8 mt-12 -ml-32 rotate-20" />
                        <PhotoIcon className="text-gray-300 w-8 mt-12 mr-2 rotate-10" />
                        <SignalIcon className="text-gray-300 w-8 -mt-14 ml-24 rotate-50" />
                    </div>
                    <div className="ml-24">
                        <DocumentIcon className="text-gray-300 w-8  -mt-12 mr-24 rotate-45" />
                        <FolderIcon className="text-gray-300 w-8  mt-12 -ml-32 rotate-20" />
                        <PhotoIcon className="text-gray-300 w-8 mt-12 mr-2 rotate-10" />
                        <SignalIcon className="text-gray-300 w-8 -mt-14 ml-24 rotate-50" />
                    </div>
                </div>
                <div className="flex justify-end items-end mb-6 mr-12">
                    <p className={`${pixel.className} text-gray-400`}>Made with Love</p>
                </div>
            </div>
        </>
    )
}