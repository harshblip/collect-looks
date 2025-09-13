import { Files, InfoData } from "@/types/mediaTypes";
import { BASE_URL } from "@/lib/constants";
import axios from "axios";

export async function uploadFile(formData: FormData): Promise<string> {
    const response = await axios.post(`${BASE_URL}/upload`, { formData })

    if (response.status !== 200) {
        throw new Error(response.data?.message || "error in uploadFile")
    }

    return response.data.message
}

export async function fetchAllFiles(user_id: number, page: number): Promise<Files[]> {
    const response = await axios.get(`${BASE_URL}/upload/getAllFiles`, {
        params: { user_id, page },
    });

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

    console.log("response.data")

    return response.data.message
}

export async function getStarFile(userId: number): Promise<Files[]> {
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

export async function deleteFiles(id: number, username: string, files: string[]): Promise<string> {
    const response = await axios.delete(`${BASE_URL}/upload/deleteMedia`, {
        params: {
            username, id, files
        }
    })

    if (response.status !== 200) {
        throw new Error(response.data?.message || 'error in deleteFiles')
    }

    return response.data.message
}

export async function getFileInfo(user_id: number, id: number): Promise<InfoData> {
    const response = await axios.get(`${BASE_URL}/upload/getFileInfo`, {
        params: {
            user_id, id
        }
    })

    console.log("images: ", response.data.message.images)
    console.log("path: ", response.data.message.filePath)

    if (response.status !== 200) {
        throw new Error(response.data?.message || 'error in getFileInfo')
    }
    return response.data.message
}

export async function setFileLock(password: string, fileId: number): Promise<string> {
    const response = await axios.post(`${BASE_URL}/upload/lockfile`, {
        password, fileId
    })

    console.log(response)

    if (response.status !== 201) {
        throw new Error(response.data?.message || 'error in setFileLock')
    }

    return response.data.message
}

export async function unlockFile(fileId: number): Promise<string> {
    const response = await axios.post(`${BASE_URL}/upload/lockfile`, {
        fileId
    })

    if (response.status !== 201) {
        throw new Error(response.data?.message || 'error in unlockFile')
    }

    return response.data.message
}

export async function getLastSeen(userId: number): Promise<Files[]> {
    const response = await axios.get(`${BASE_URL}/upload/getRecentlyOpened`, {
        params: {
            userId: userId
        }
    })

    if (response.status !== 200) {
        throw new Error(response.data?.message || 'error in getLastSeen')
    }

    return response.data.message
}

export async function trashMedia(files: any): Promise<string> {
    const response = await axios.post(`${BASE_URL}/upload/trashMedia`, {
        files
    })

    if (response.status !== 200) {
        throw new Error(response.data?.message || 'error in deleteFile')
    }

    return response.data.message
}

