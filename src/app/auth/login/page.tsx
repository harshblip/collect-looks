'use client'
import { useState } from "react"
import axios from "axios";
import PasswordStrengthBar from "react-password-strength-bar";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { setAuthState } from "@/lib/slice/userSlice";
import AuthInput from "@/app/components/AuthInput";
import AuthForm from "@/app/components/AuthForm";

export default function Login() {
    const [see, setSee] = useState<boolean>(false);
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('')

    const dispatch = useAppDispatch();
    const router = useRouter();

    async function submit() {
        // const response = await axios.get('http://localhost:4000/user/login', {
        //     params: {
        //         email, password
        //     }
        // })
        // console.log("login", response)
        // if (response.status === 200) {
        //     console.log("signed in")
        //     dispatch(setAuthState(response.data.access_token))
        //     router.push('/dashboard')
        // } else {
        //     console.log("fas gaya")
        // }
        console.log("submit func called")
    }

    const token = useAppSelector((state) => state.auth.authToken);
    console.log(token)
    return (
        <>
            <AuthForm
                type="login"
                email={email}
                password={password}
                setEmail={setEmail}
                setPassword={setPassword}
                username={username}
                setUsername={setUsername}
                submit={submit}
            />
        </>
    )
}