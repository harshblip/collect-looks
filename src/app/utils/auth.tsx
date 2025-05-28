import { setAuthState } from "@/lib/slice/userSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import axios from "axios";

export async function signup(username: string, email: string, password: string, setError: React.Dispatch<React.SetStateAction<string>>) {
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

export async function signin(email: string, password: string) {

    const router = useRouter()
    const dispatch = useDispatch()

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
            router.push('/dashboard')
        } else {
            console.log("fas gaya")
        }
    } catch (err) {
        console.error("error in signin function", err);
    }
}