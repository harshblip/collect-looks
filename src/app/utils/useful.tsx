import { setSelectedFolders, setViewFolder } from "@/lib/slice/folderSlice"
import { useAppSelector } from "@/lib/store"
import { Files } from "@/types/mediaTypes"
import axios from "axios"
import { useDispatch } from "react-redux"

export const updatePassword = async (
    email: string,
    password: string,
    setError: React.Dispatch<React.SetStateAction<string>>
) => {
    try {
        const response = await axios.put('http://localhost:4000/user/reset-password', {
            email, password
        })

        if (response.status === 200) {
            console.log("password updated")
        } else {
            console.log("different response code")
        }
    } catch (err: any) {
        setError(err.response.data.message)
        console.log("internal server error", err)
    }
}

export function byteToSize(kb: number): string {
    if (kb === 0) return `0 bytes`;

    const arr = ['bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(kb) / Math.log(1024));
    return `${(kb / (1024 ** i)).toFixed(0)} ${arr[i]}`;
}

export function getFileCategory(mimeType: string): 'image' | 'video' | 'document' | 'audio' | 'other' {
    if (!mimeType) return 'other';

    const type = mimeType.toLowerCase();

    if (type.startsWith('image/')) return 'image';
    if (type.startsWith('video/')) return 'video';
    if (type.startsWith('audio/')) return 'audio';

    // document types
    const docTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
        'application/vnd.ms-powerpoint',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation', // .pptx
        'text/plain',
        'text/csv',
        'application/json',
        'application/x-zip-compressed', // zip treated as document/archive
        'application/zip',
    ];
    if (docTypes.includes(type)) return 'document';

    return 'other';
}
