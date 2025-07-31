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