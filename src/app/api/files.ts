import { AllFiles } from "@/types/mediaTypes";
import { BASE_URL } from "@/lib/constants";
import axios from "axios";

export async function fetchAllFiles(email: string): Promise<AllFiles[]> {
    const response = await axios.get(`${BASE_URL}/upload/getAllFiles`, {
        params: { email },
    });

    console.log("called")

    if (response.status !== 200) {
        throw new Error(response.data?.message || "error in fetchAllFiles")
    }

    return response.data.message
}

export async function starFile(userId: number, id: number): Promise<string> {
    const response = await axios.post(`${BASE_URL}/upload/starFile`, { userId, id })

    if (response.status !== 201) {
        throw new Error(response.data?.message || "error in starFile")
    }

    return response.data
}

export async function getStarFile(userId: number): Promise<AllFiles[]> {
    const response = await axios.get(`${BASE_URL}/upload/getStars`, {
        params: {
            userId
        }
    })

    if (response.status !== 200) {
        throw new Error(response.data?.message || "error in starFile")
    }

    return response.data.message
}