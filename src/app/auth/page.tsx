'use client'
import { useEffect, useState } from "react"
import AuthForm from "@/app/components/AuthForm";
import { useAppSelector } from "@/lib/store";
import { Signin, Signup } from "../utils/auth";
import { Gloock } from "next/font/google";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import SmallLogo from "../components/SmallLogo";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";

const glook = Gloock({
    weight: ['400'],
    subsets: ['latin']
})

export default function Auth() {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('')
    const [username, setUsername] = useState<string>('')
    const [error, setError] = useState<any>()

    const router = useRouter()
    const dispatch = useDispatch()

    const mode = useAppSelector(state => state.states.mode) || 'Create an account'

    // {
    //     error ? console.log(error) : ''
    // }

    return (
        <>
            <div className="bg-[#EFEFEF] md:mt-0 mt-24 lg:items-start justify-center    items-center flex flex-col h-screen">
                <div className="md:p-32 flex flex-col p-24">
                    <SmallLogo />
                    <p className={`${glook.className} text-[#495057] text-3xl mt-8`}>{mode}</p>
                    {
                        error && <div className="bg-red-200 text-red-500 w-[20rem] rounded-md mt-8">
                            <div className="p-4 flex justify-center items-center space-x-4 ">
                                <ExclamationTriangleIcon
                                    className="w-8"
                                />
                                <p className={`text-md ${glook.className}`}> {error || `nothing`} </p>
                            </div>
                        </div>
                    }
                    {
                        mode === 'Create an account' ? <div className="fade-in"> <AuthForm
                            mode={mode}
                            email={email}
                            password={password}
                            setEmail={setEmail}
                            setPassword={setPassword}
                            username={username}
                            setUsername={setUsername}
                            submit={() => Signup(username, email, password, setError)}
                        /> </div> : <div className="fade-in"> <AuthForm
                            mode={mode}
                            email={email}
                            password={password}
                            setEmail={setEmail}
                            setPassword={setPassword}
                            username={username}
                            setUsername={setUsername}
                            submit={() => Signin(email, password, setError, router, dispatch)}
                        /> </div>
                    }
                </div>

            </div>
        </>
    )
}