import { BASE_URL } from "@/lib/constants";
import axios from "axios";

export async function createFolder(
    name: string,
    description: string,
    password: string,
    id: number): Promise<string> {

    const response = await axios.post(`${BASE_URL}/upload/createFolder`, { name, description, password, id })

    if (response.status !== 201) {
        throw new Error(response.data?.message || "error in createFolder")
    }

    return response.data.message;
}

export async function addFilesToFolder(files: [], userId: number) : Promise<string> {
    const response = await axios.post(`${BASE_URL}/upload/addFilestoFolder`, [files, userId])

    if (response.status !== 201) {
        throw new Error(response.data?.message || "error in addFilesToFolder")
    }

    return response.data.message;
}