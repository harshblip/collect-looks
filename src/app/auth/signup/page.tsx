'use client'
import axios from "axios";
import { useState } from "react"
import AuthForm from "@/app/components/AuthForm";

export default function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')

    async function submit() {
        try {
            // const response = await axios.post("http://localhost:4000/user/signup", {
            //     username, email, password
            // })

            // if (response.status === 201) {
            //     console.log("user signed up", response);
            // } else {
            //     console.log("found error in submit: ", response)
            // }

            const response2 = await axios.post('/api/welcome-email')
            if (response2.status === 201) {
                console.log("email sent", response2);
            } else {
                console.log("found error in submit's welcome-email: ", response2)
            }
        } catch (err) {
            console.error("error", err);
        }
    }


    return (
        <>
            <AuthForm
                type="signup"
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