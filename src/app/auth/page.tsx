'use client'
import { useEffect, useState } from "react"
import AuthForm from "@/app/components/AuthForm";
import { useAppSelector } from "@/lib/store";
import { signin, signup } from "../utils/auth";
import { Gloock } from "next/font/google";
import SmallLogo from "../components/SmallLogo";

const glook = Gloock({
    weight: ['400'],
    subsets: ['latin']
})

export default function Auth() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [error, setError] = useState('')

    const mode = useAppSelector(state => state.states.mode) || 'Create an account'

    return (
        <>
            {/* <button
                onClick={() => mode === 'Create an account' ? dispatch(setMode('Sign in')) : dispatch(setMode('Create an account'))}
                className="hover:cursor-pointer"
            >switch</button> */}
            <div className="bg-[#EFEFEF] md:mt-0 mt-24 lg:items-start justify-center    items-center flex flex-col h-screen">
                <div className="md:p-32 flex flex-col p-24">
                    <SmallLogo />
                    <p className={`${glook.className} text-[#495057] text-3xl mt-8`}>{mode}</p>
                    {
                        mode === 'Create an account' ? <div className="fade-in"> <AuthForm
                            mode={mode}
                            email={email}
                            password={password}
                            setEmail={setEmail}
                            setPassword={setPassword}
                            username={username}
                            setUsername={setUsername}
                            submit={() => signup(username, email, password, setError)}
                        /> </div>: <div className="fade-in"> <AuthForm
                            mode={mode}
                            email={email}
                            password={password}
                            setEmail={setEmail}
                            setPassword={setPassword}
                            username={username}
                            setUsername={setUsername}
                            submit={() => signin(email, password)}
                        /> </div>
                    }
                </div>

            </div>
        </>
    )
}