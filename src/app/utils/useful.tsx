import axios from "axios"

export const updatePassword = async (
    email: string,
    password: string,
    setError: React.Dispatch<React.SetStateAction<string>>
) => {
    try {
        const response = await axios.put('http://localhost:4000/user/reset-password', {
            email, password
        })

        if (response.status === 200) {
            console.log("password updated")
        } else {
            console.log("different response code")
        }
    } catch (err: any) {
        setError(err.response.data.message)
        console.log("internal server error", err)
    }
}