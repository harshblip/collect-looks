'use client'

import { EyeIcon, EyeSlashIcon, KeyIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { updatePassword } from "../utils/useful";
import { useAppSelector } from "@/lib/store";
import ResetForm from "../components/auth/ResetForm";

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
                    <ResetForm
                        setA={setA}
                        setB={setB}
                        setSee={setSee}
                        see={see}
                        submit={submit}
                    />
                </div>
            </div>
        </>
    )
}