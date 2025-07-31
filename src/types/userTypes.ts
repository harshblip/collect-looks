export interface User {
    id: number,
    username: string,
    email: string,
    password: string,
    created_at: string,
    updated_at: string,
    failed_attempts: number,
    lockout_level: number,
    locked_until: string,
    remember_me: string,
    photos_size: string,
    videos_size: string,
    audios_size: string,
    documents_size: string
}