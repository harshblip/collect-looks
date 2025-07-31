import { BASE_URL } from "@/lib/constants";
import { User } from "@/types/userTypes";
import axios from "axios";

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