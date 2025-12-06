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

    const docTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.ms-powerpoint',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        'text/plain',
        'text/csv',
        'application/json',
        'application/x-zip-compressed', 
        'application/zip',
    ];
    if (docTypes.includes(type)) return 'document';

    return 'other';
}

