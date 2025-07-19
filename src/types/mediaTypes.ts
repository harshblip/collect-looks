
export interface Files {
    id: number,
    user_id: number,
    file_name: string,
    file_url?: string,
    file_type: string,
    size: string,
    created_at: string,
    starred: string,
    is_trashed: string,
    folder_id: number,
    description?: string,
    is_locked?: string,
    password?: string,
    updated_at?: string,
}

export interface Folders {
    id: number,
    user_id: number,
    file_name: string,
    password: string,
    size: string,
    starred: string,
    parent_id: number,
    description: string,
    is_locked: string,
    created_at: string,
    updated_at: string,
}

export interface FoldersArray {
    id: number,
    name: string
}