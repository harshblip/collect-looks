import { BASE_URL } from "@/lib/constants";
import { AllFiles } from "@/types/mediaTypes";
import axios from "axios";

export async function fetchAllFiles(email: string): Promise<AllFiles[] | []> {
    const response = await axios.get(`${BASE_URL}/upload/getAllFiles`, {
        params: { email },
    });

    if(response.status !== 200){
        throw new Error(response.data?.message || "error in fetchAllFiles")
    }

    return response.data.message
}