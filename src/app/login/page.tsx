'use client'
import { useState } from "react"
import axios from "axios";
import PasswordStrengthBar from "react-password-strength-bar";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { setAuthState } from "@/lib/slice/userSlice";

export default function Login() {
    const [see, setSee] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

    const dispatch = useAppDispatch();
    const router = useRouter();

    async function submit() {
        const response = await axios.get('http://localhost:4000/user/login', {
            params: {
                email, password
            }
        })
        console.log(response)
        if (response.status === 200) {
            console.log("signed in", response)
            dispatch(setAuthState(response.data.access_token))
            router.push('/dashboard')
        } else {
            console.log("fas gaya")
        }
    }

    const token = useAppSelector((state) => state.auth.authToken);
    console.log(token)
    return (
        <>
            <div className="flex justify-center items-center mt-12 flex-col space-y-8">
                <div className="flex space-x-4">
                    <p>login</p> <button className="hover:cursor-pointer" onClick={() => router.push('/signup')}>signup</button>
                </div>
                <input
                    type="text"
                    className="h-10 w-[20rem] text-md p-2 border border-gray-500 mt-4 rounded-md"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type={`${see ? `text` : `password`}`}
                    className="h-10 w-[20rem] text-md p-2 border border-gray-500 rounded-md"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    onClick={() => setSee(!see)}
                    className="hover:cursor-pointer"
                >👁</button>
                <div className="w-1/2">
                    <PasswordStrengthBar password={password} />
                </div>
                <button
                    onClick={submit}
                    className="hover:cursor-pointer border border-gray-500 p-2 rounded-md w-[10rem]"
                >
                    submit
                </button>
            </div>
        </>
    )
}