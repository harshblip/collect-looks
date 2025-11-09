
export interface Files {
    id: number,
    user_id: number,
    file_name: string,
    file_url?: string,
    file_type: string,
    size: string,
    created_at: string,
    starred: boolean,
    is_trashed: string,
    folder_id: number,
    description?: string,
    is_locked?: boolean,
    password?: string,
    updated_at: string,
    total_count: number
}

export interface Folders {
    id: number,
    user_id: number,
    file_name: string,
    password: string,
    size: string,
    starred: boolean,
    parent_id: number,
    description: string,
    is_locked: boolean,
    created_at: string,
    updated_at: string,
}

export interface FoldersArray {
    id: number,
    name: string
}

export interface InfoData {
    image: Files[],
    filePath: string[]
}