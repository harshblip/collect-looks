'use client'

import { EyeIcon, EyeSlashIcon, KeyIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { updatePassword } from "../utils/useful";
import { useAppSelector } from "@/lib/store";

export default function ResetPassword() {
    const [see, setSee] = useState<boolean>(false)
    const [a, setA] = useState<string>('')
    const [b, setB] = useState<string>('')
    const [error, setError] = useState<string>('')

    const email = useAppSelector(state => state.states.email)

    function submit() {
        if (a != b) {
            setError('passwords don\'t match. try again')
        } else {
            updatePassword(email, a, setError)
        }
    }

    return (
        <>
            <div className="primary-bg h-screen flex justify-center items-center w-full">
                <div className="flex justify-center items-center flex-col space-y-6 -mt-44">
                    <div className="flex items-center space-x-4">
                        <KeyIcon
                            className={`w-20 ${error ? `bg-red-200` : `bg-gray-200`} ${error ? `text-red-500` : `text-gray-500`} transition-all duration-150 ease-in-out rounded-full p-6`}
                        />
                        {
                            error && <p className="font-glook text-2xl text-red-500 transition-transform duration-150">
                                {error}
                            </p>
                        }
                    </div>
                    <p className="font-glook text-4xl text-primary "> Change your password </p>
                    <div className="flex flex-col space-y-8 mt-2">
                        <div className="flex flex-col space-x-2">
                            <p className="font-glook text-lg text-primary "> Enter your new password </p>
                            <div className="flex space-x-4">
                                <input
                                    type="text"
                                    name="type password"
                                    onChange={(e) => setA(e.target.value)}
                                    className={`h-10 md:w-[20rem] text-md p-2 border border-none bg-white outline-none transition-all duration-300 ease-in-out focus:shadow-md mt-2 rounded-md font-glook`}
                                />
                                <button
                                    onClick={() => setSee(!see)}
                                    className="hover:cursor-pointer mt-1 w-12 h-12 hover:bg-gray-200 rounded-md flex justify-center active:scale-75 transition-transform duration-150 ease-in-out"
                                >
                                    {
                                        see ? <EyeIcon
                                            className="hover:cursor-pointer w-6"
                                            onClick={() => setSee(!see)}
                                        /> : <EyeSlashIcon
                                            className="hover:cursor-pointer w-6"
                                            onClick={() => setSee(!see)}
                                        />
                                    }
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-col space-x-2">
                            <p className="font-glook text-lg text-primary "> re-enter that password </p>
                            <div className="flex space-x-4">
                                <input
                                    type="text"
                                    name="re-enter password"
                                    onChange={(e) => setB(e.target.value)}
                                    className={`h-10 md:w-[20rem] text-md p-2 border border-none bg-white outline-none transition-all duration-300 ease-in-out focus:shadow-md mt-2 rounded-md font-glook`}
                                />
                                <button
                                    onClick={() => setSee(!see)}
                                    className="hover:cursor-pointer mt-1 w-12 h-12 hover:bg-gray-200 rounded-md flex justify-center active:scale-75 transition-transform duration-150 ease-in-out"
                                >
                                    {
                                        see ? <EyeIcon
                                            className="hover:cursor-pointer w-6"
                                            onClick={() => setSee(!see)}
                                        /> : <EyeSlashIcon
                                            className="hover:cursor-pointer w-6"
                                            onClick={() => setSee(!see)}
                                        />
                                    }
                                </button>
                            </div>
                        </div>
                        <button
                            onClick={submit}
                            className={` hover:cursor-pointer font-glook bg-[#495057] text-white p-2 rounded-md w-[24rem] mt-2`}
                        >
                            change password
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}