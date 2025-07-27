'use client'

import { ArrowRightStartOnRectangleIcon, HomeIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";

export default function ProfileNavbar() {
    const navigate = useRouter()
    return (
        <>
            <div className="bg-white rounded-lg flex justify-between p-2 mr-2 ml-2">
                <div className="flex space-x-2 items-center">
                    <HomeIcon
                        onClick={() => navigate.push('/dashboard')}
                        className="w-9 text-secondary hover hover:bg-gray-200 rounded-lg p-2"
                    />
                    <p className="text-lg"> / </p>
                    <p className="text-lg text-secondary  ml-2"> Your account </p>
                </div>
                <div>
                    <ArrowRightStartOnRectangleIcon
                        className="w-9 text-secondary hover hover:bg-gray-200 rounded-lg p-2"
                    />
                </div>
            </div>
        </>
    )
}