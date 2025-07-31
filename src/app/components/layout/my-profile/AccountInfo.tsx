'use client'

import { useUpateUser } from "@/app/hooks/useUser";
import { InformationCircleIcon, LockClosedIcon } from "@heroicons/react/24/solid";
import { Pixelify_Sans } from "next/font/google";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Spinner from "../../ui/Spinner";

const pixel = Pixelify_Sans({
    weight: ['400', '500'],
    subsets: ['cyrillic', 'latin']
})

export default function AccountInfo({ username, email }: {
    username: string,
    email: string
}) {

    const [isEditMode, setIsEditMode] = useState<boolean>(true);
    const [name, setName] = useState<string>(username);
    const [newEmail, setNewEmail] = useState<string>(email);
    const { mutate: updateUserData } = useUpateUser()

    const navigate = useRouter()
    console.log(name)

    useEffect(() => {
        isEditMode && updateUserData({
            username: name,
            email: newEmail,
            id: 3
        })
    }, [isEditMode])

    return (
        <>
            <div className="flex flex-col space-y-10 mt-12 mb-12">
                <div className="flex justify-between">
                    <p className={`${pixel.className} text-4xl ml-10`}> Account Info </p>
                    <button
                        onClick={() => {
                            setIsEditMode((lol) => !lol)
                        }}
                        className={`${pixel.className} mr-10 hover hover:bg-gray-600 hover:text-white transition-all w-24 p-2 rounded-md border-2 border-gray-600 active:scale-95`}
                    >
                        {isEditMode ? `Edit` : `Save`}
                    </button>
                </div>
                <div className="flex justify-around">
                    <div className=" rounded-md flex items-center space-x-4">
                        <p className={`${pixel.className} text-md`}> name </p>
                        <hr
                            className="w-12 border-2 border-gray-100"
                        />
                        {!isEditMode ? (
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className={`w-[24rem] p-4 text-lg text-secondary bg-transparent outline-none border-2 border-gray-400 border-dashed rounded-md`}
                                autoFocus={true}
                            />
                        ) : (
                            <p className={`w-[24rem] p-4 shadow-md text-lg text-secondary`}>
                                {name}
                            </p>
                        )}

                    </div>
                    <div className=" rounded-md flex items-center space-x-4">
                        <p className={`${pixel.className} text-md`}> email </p>
                        <hr
                            className="w-12 border-2 border-gray-100"
                        />
                        {!isEditMode ? (
                            <input
                                type="email"
                                value={newEmail}
                                onChange={(e) => setNewEmail(e.target.value)}
                                className={`w-[24rem] p-4 text-lg text-secondary bg-transparent outline-none border-2 border-gray-400 border-dashed rounded-md`}
                            />
                        ) : (
                            <p className={`w-[24rem] p-4 shadow-md text-lg text-secondary`}>
                                {newEmail}
                            </p>
                        )}
                    </div>
                </div>
                <div className="flex flex-col space-y-4 text-lg p-4 ml-4">
                    <p> Password </p>
                    <div className="primary-bg rounded-md w-1/2 flex justify-between space-x-2 p-4">
                        <div className="flex space-x-4">
                            <LockClosedIcon
                                className="w-6 text-secondary"
                            />
                            <div className="flex flex-col">
                                <p className="text-secondary text-lg">Two-factor authorization</p>
                                <p className="text-sm text-secondary"> use your phone to add an extra layer of security </p>
                            </div>
                        </div>
                        <button className="bg-white p-2 text-secondary text-md w-28 rounded-lg hover shadow-md">
                            Turn on
                        </button>
                    </div>
                    <div className="flex space-x-4 mt-4">
                        <button
                            className="bg-red-400 p-2 text-white text-md w-44 hover shadow-md rounded-md"
                            onClick={() => navigate.push('/reset-password')}
                        >
                            reset password
                        </button>
                        <div className="text-secondary flex items-center space-x-2">
                            <InformationCircleIcon
                                className="w-6 text-secondary"
                            />
                            <p className="text-sm"> reset your password incase forgot or compromised </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}