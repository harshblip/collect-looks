import Image from "next/image";
import SearchBar from "./SearchBar";
import { Cog6ToothIcon, CubeTransparentIcon, UserIcon } from "@heroicons/react/24/solid";

export default function Navbar() {
    return (
        <>
            <div className="flex items-center justify-between">
                <div className="flex flex-col">
                    <div className="flex items-center space-x-6 mt-0">
                        <Image
                            src='/logo.png'
                            height={0}
                            width={60}
                            alt="collect-logo"
                        />
                        <p className="font-product font-medium text-4xl text-primary"> Collect </p>
                    </div>
                </div>
                <SearchBar />
                <div className="flex space-x-8">
                    <button className="w-10 h-10 hover:cursor-pointer hover:bg-gray-200 rounded-lg p-2 transition-all text-primary active:scale-95"> <Cog6ToothIcon />  </button>
                    <button className="w-10 h-10 hover:cursor-pointer hover:bg-gray-200 rounded-lg p-2 transition-all text-primary active:scale-95"> <CubeTransparentIcon /> </button>
                    <button 
                        className="w-10 h-10 hover:cursor-pointer hover:bg-gray-200 rounded-lg p-2 transition-all text-primary active:scale-95"> <UserIcon /> </button>
                </div>
            </div>
        </>
    )
}