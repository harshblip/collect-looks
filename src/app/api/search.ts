import { BASE_URL } from "@/lib/constants";
import { Files } from "@/types/mediaTypes";
import axios from "axios";

export async function getSuggestions(word: string, userId: number): Promise<Files[]> {
    console.log("came here2")
    const response = await axios.get(`${BASE_URL}/upload/getSuggestions`, {
        params: {
            userId: userId,
            words: word
        }
    })


    if (response.status !== 200) {
        throw new Error(response.data?.message || 'error in getSuggestions')
    }

    return response.data.message
}