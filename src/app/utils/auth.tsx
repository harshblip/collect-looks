import { setAuthState } from "@/lib/slice/userSlice";
import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { Router } from "next/router";

export const Signup = async (
    username: string,
    email: string,
    password: string,
    setError: React.Dispatch<React.SetStateAction<string>>,
) => {
    try {
        const response = await axios.post("http://localhost:4000/user/signup", {
            username, email, password
        })

        if (response.status === 201) {
            console.log("user signed up", response);
        } else {
            console.log("found error in submit: ", response)
        }

        const response1 = await axios.post('/api/welcome-email')
        if (response1.status === 201) {
            console.log("email sent", response1);
        } else {
            console.log("found error in api welcome-email: ", response1)
        }

    } catch (err) {
        console.error("error in signup/sending mail function", err);
    }
}


export const Signin = async (
    email: string,
    password: string,
    setError: React.Dispatch<React.SetStateAction<string>>,
    dispatch: Dispatch,
    router: Router
) => {
    
    try {
        const response = await axios.get('http://localhost:4000/user/login', {
            params: {
                email, password
            }
        })
        console.log("login", response)
        if (response.status === 200) {
            console.log("signed in")
            dispatch(setAuthState(response.data.access_token))
            // router.push('/dashboard')
        } else {
            console.log("fas gaya")
        }
    } catch (err) {
        console.error("error in signin function", err);
    }
}
