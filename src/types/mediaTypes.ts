
export interface Files {
    id: string,
    user_id: string,
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
    hashed_lock_password?: string,
    updated_at?: string,
}