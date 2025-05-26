'use client'
import { useEffect, useState } from "react"
import AuthForm from "@/app/components/AuthForm";
import { useAppSelector } from "@/lib/store";
import { useDispatch } from "react-redux";
import { signin, signup } from "../utils/auth";
import { setMode } from "@/lib/slice/statesSlice";

export default function Auth() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const dispatch = useDispatch()

    const mode = useAppSelector(state => state.states.mode) || 'signup'
    console.log(mode)

    return (
        <>
            <button
                onClick={() => mode === 'signup' ? dispatch(setMode('login')) : dispatch(setMode('signup'))}
                className="hover:cursor-pointer"
            >switch</button>
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

        </>
    )
}