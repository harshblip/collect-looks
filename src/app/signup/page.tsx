'use client'
import axios from "axios";
import { useState } from "react"

export default function Signup() {
    const [see, setSee] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const useremail = "harsh.jipkate2020@vitbhopal.ac.in"

    async function signupUser() {
        // const response = await axios.post("http://localhost:3000/user/signup", {
        //     username, email, password
        // })

        const response = await axios.post('/api/welcome-email')
        if (response.status === 201) {
            console.log("signedup", response)
        } else {
            console.log("user not signedup")
        }
    }

    return (
        <>
            <div className="flex justify-center items-center mt-12 flex-col space-y-8">
                signup
                <input
                    type="text"
                    className="h-10 w-[20rem] text-md p-2 border border-gray-500 mt-4 rounded-md"
                    onChange={(e) => setUsername(e.target.value)}
                />
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
                    className="hover:cursor-pointer"
                    onClick={() => setSee(!see)}
                >👁</button>
                <button
                    onClick={signupUser}
                    className="hover:cursor-pointer border border-gray-500 p-2 rounded-md w-[10rem]"
                >
                    submit
                </button>
            </div>
        </>
    )
}