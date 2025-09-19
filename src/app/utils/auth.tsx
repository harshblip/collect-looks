import axios from "axios";

export const ForgotPassword = async (
    email: string
) => {
    try {
        const response = await axios.post('/api/forgot-password', {
            email
        })

        if (response.status === 201) {
            console.log("email sent", response)
        } else {
            console.log("error sending password reset mail", response)
        }

    } catch (err: any) {
        console.error("error in signin function", err.response.data.message);
    }
}