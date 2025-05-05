'use client'
import axios from "axios";
import { useState } from "react"
import EmailTemplate from "../components/Emailtemplate";
import { useRouter } from "next/navigation";

export default function Signup() {
    const [see, setSee] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')

    async function signupUser() {
        try {
            // const response = await axios.post("http://localhost:4000/user/signup", {
            //     username, email, password
            // })

            // if (response.status === 201) {
            //     console.log("user signed up", response);
            // } else {
            //     console.log("found error in signupUser: ", response)
            // }

            const response2 = await axios.post('/api/welcome-email')
            if (response2.status === 201) {
                console.log("email sent", response2);
            } else {
                console.log("found error in signupUser's welcome-email: ", response2)
            }
        } catch (err) {
            console.error("error", err);
        }
    }

    const router = useRouter()

    return (
        <>
            <div className="flex justify-center items-center mt-12 flex-col space-y-8">
                <div className="flex space-x-4">
                    <button
                        onClick={() => router.back()}
                        className="hover:cursor-pointer"
                    > {`<`} </button>
                    <p> signup </p>
                    <button
                        onClick={() => router.forward()}
                        className="hover:cursor-pointer"
                    > {`>`} </button>
                </div>
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
            <EmailTemplate />
        </>
    )
}