import Image from "next/image";
import SearchBar from "./SearchBar";

export default function Navbar() {
    return (
        <>
            <div className="flex items-center space-around">
                <div className="flex items-center space-x-6 mt-4 p-8">
                    <Image
                        src='/logo.png'
                        height={0}
                        width={60}
                        alt="collect-logo"
                    />
                    <p className="font-product font-medium text-4xl text-primary"> Collect </p>
                </div>
                <SearchBar />
                <div className="flex space-x-2">

                </div>
            </div>
        </>
    )
}