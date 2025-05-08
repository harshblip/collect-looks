
export interface Media {
    id: string,
    user_id: string,
    created_at: string,
    display_image_url: string,
    file_name: string,
    file_url: string,
    folder_id: string,
    size: string,
    thumbnail_image_url: string
}

export interface Folder {
    id: string,
    user_id: string,
    name: string,
    description: string,
    is_locked: string,
    hashed_lock_password: string,
    created_at: Date,
    updated_at: Date,
}