'use client'
import { useState } from "react"
import axios from "axios";

export default function Login() {
    const [see, setSee] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

    async function submit() {
        const response = await axios.get('http://localhost:3000/user/login', {
            params: {
                email, password
            }
        })

        if (response.status === 200) {
            console.log("signed in")
        }else {
            console.log("fas gaya")
        }
    }

    return (
        <>
            <div className="flex justify-center items-center mt-12 flex-col space-y-8">
                login
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