import { BASE_URL } from "@/lib/constants";
import axios from "axios";

export async function createFolder(
    name: string,
    description: string,
    is_locked: boolean,
    password: string,
    id: string): Promise<string> {

    const response = await axios.post(`${BASE_URL}/upload/createFolder`, { name, description, password, is_locked, id })

    if (response.status !== 201) {
        throw new Error(response.data?.message || "error in createFolder")
    }

    return response.data.message;
}

export async function addFilesToFolder(files: [], userId: string): Promise<string> {
    const response = await axios.post(`${BASE_URL}/upload/addFilestoFolder`, [files, userId])

    if (response.status !== 201) {
        throw new Error(response.data?.message || "error in addFilesToFolder")
    }

    return response.data.message;
}

export async function getFolders(id: string): Promise<string> {
    const response = await axios.get('http://localhost:4000/upload/getFolders', {
        params: {
            id: id
        }
    })

    if (response.data !== 200) {
        throw new Error(response.data?.message || "error in getFolders")
    }

    return response.data.message
}