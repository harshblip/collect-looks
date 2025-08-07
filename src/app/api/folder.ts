import { BASE_URL } from "@/lib/constants";
import { Files, Folders } from "@/types/mediaTypes";
import axios from "axios";

export async function createFolder(
    name: string,
    description: string,
    is_locked: boolean,
    password: string,
    id: number): Promise<string> {

    const response = await axios.post(`${BASE_URL}/upload/createFolder`, { name, description, password, is_locked, id })

    if (response.status !== 201) {
        throw new Error(response.data?.message || "error in createFolder")
    }

    return response.data.message;
}

export async function addFilesToFolder(files: Files[], folderId: number): Promise<string> {
    const response = await axios.post(`${BASE_URL}/upload/addFilestoFolder`, { files, folderId })

    if (response.status !== 201) {
        throw new Error(response.data?.message || "error in addFilesToFolder")
    }

    return response.data.message;
}

export async function getFolders(id: number): Promise<Folders[]> {
    const response = await axios.get('http://localhost:4000/upload/getFolders', {
        params: {
            id: id
        }
    })


    if (response.status !== 200) {
        throw new Error(response.data?.message || "error in getFolders")
    }

    return response.data.message
}


export async function getFolderItems(userId: number, folderId: number): Promise<Files[]> {
    const response = await axios.get(`${BASE_URL}/upload/folderItems`, {
        params: {
            userId, folderId
        }
    })

    if (response.status !== 200) {
        throw new Error(response.data?.message || "error in getFolders")
    }

    return response.data.message
}

export async function setFolderLock(password: string, folderId: number): Promise<string> {
    const response = await axios.post(`${BASE_URL}/upload/lockfolder`, {
        password, folderId
    })

    if(response.status !== 201){
        throw new Error(response.data?.message || 'error in setFolderLock')
    }

    return response.data.message
}

export async function unlockFolder(folderId: number): Promise<string> {
    const response = await axios.post(`${BASE_URL}/upload/unlockfolder`, {
        folderId
    })

    if(response.status !== 201){
        throw new Error(response.data?.message || 'error in unlockFolder')
    }

    return response.data.message
}