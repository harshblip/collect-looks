import { BASE_URL } from "@/lib/constants";
import { User } from "@/types/userTypes";
import axios from "axios";

export async function loginUser(email: string, password: string, checked: boolean): Promise<any> {
    const response = await axios.get(`${BASE_URL}/user/login`, {
        params: {
            email: email,
            password: password,
            checked: checked
        }
    })

    if (response.status !== 200) {
        throw new Error(response.data?.message || "error in loginUser")
    }
    console.log(response.data)
    return response.data.message

}

export async function signupUser(username: string, email: string, password: string): Promise<string> {
    const response = await axios.post(`${BASE_URL}/user/signup`, {
        username, email, password
    })

    if (response.status !== 201) {
        throw new Error(response.data?.message || "error in signupUser")
    }

    const response1 = await axios.post('/api/welcome-email')
    if (response1.status === 201) {
        console.log("email sent", response1);
    } else {
        console.log("found error in api welcome-email: ", response1)
    }

    return response.data.message
}

export async function getUserData(id: number): Promise<User> {
    const response = await axios.get(`${BASE_URL}/user/getUserData`, {
        params: {
            id: id
        }
    })

    if (response.status !== 200) {
        throw new Error(response.data?.message || "error in getUserData")
    }

    return response.data.message
}

export async function updateUserData(username: string, email: string, id: number): Promise<string> {
    const response = await axios.patch(`${BASE_URL}/user/update`, { username, email, id })

    if (response.status !== 200) {
        throw new Error(response.data?.message || "error in updateUserData")
    }

    console.log(response.data)

    return response.data.message
}

export async function updateLastOpened(type: string, fileId: number): Promise<string> {
    console.log(type, fileId)
    const response = await axios.post(`${BASE_URL}/upload/updateLastOpened`, { type, fileId })

    if (response.status !== 201) {
        throw new Error(response.data?.message || "error in updateLastOpened")
    }

    return response.data.message
}