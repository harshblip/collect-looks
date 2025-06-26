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

export function byteToSize(kb: number): string {
    if (kb === 0) return `0 bytes`;

    const arr = ['bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(kb) / Math.log(1024));
    return `${(kb / (1024 ** i)).toFixed(0)} ${arr[i]}`;
}
