'use client'
import { useEffect, useState } from "react"
import AuthForm from "@/app/components/AuthForm";
import { useAppSelector } from "@/lib/store";
import { useDispatch } from "react-redux";
import { signin, signup } from "../utils/auth";
import { Gloock, Gochi_Hand } from "next/font/google";
import SmallLogo from "../components/SmallLogo";

const glook = Gloock({
    weight: ['400'],
    subsets: ['cyrillic-ext']
})

const gochi_hand = Gochi_Hand({
    weight: ['400'],
    subsets: ['latin']
})

export default function Auth() {

    const dispatch = useDispatch()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')

    const mode = useAppSelector(state => state.states.mode) || 'Create an account'

    return (
        <>
            {/* <button
                onClick={() => mode === 'signup' ? dispatch(setMode('login')) : dispatch(setMode('signup'))}
                className="hover:cursor-pointer"
            >switch</button> */}
            <div className="bg-[#EFEFEF] md:mt-0 mt-24 lg::items-start justify-center    items-center flex flex-col">
                <div className="md:p-32 flex flex-col p-24">
                    <SmallLogo />
                    <p className={`${glook.className} text-3xl mt-8`}>Sign in</p>
                    {
                        mode === 'signup' ? <AuthForm
                            type="signup"
                            email={email}
                            password={password}
                            setEmail={setEmail}
                            setPassword={setPassword}
                            username={username}
                            setUsername={setUsername}
                            submit={() => signup(username, email, password)}
                        /> : <AuthForm
                            type="login"
                            email={email}
                            password={password}
                            setEmail={setEmail}
                            setPassword={setPassword}
                            username={username}
                            setUsername={setUsername}
                            submit={() => signin(email, password)}
                        />
                    }
                </div>

            </div>
        </>
    )
}