import axios from "axios";

export async function handleUpload(
    files: File[],
    setFiles: React.Dispatch<React.SetStateAction<File[]>>,
    setUploading: React.Dispatch<React.SetStateAction<boolean>>,
    setProgress: React.Dispatch<React.SetStateAction<number>>
) {
    if (!files.length) return;

    setUploading(true);
    setProgress(0);

    const formData = new FormData();
    files.forEach((file) => formData.append('file', file));
    formData.append('username', 'mihir')
    try {
        await axios.post('http://localhost:4000/upload', formData, {
            onUploadProgress: (progressEvent) => {
                const total = progressEvent.total ?? 1;
                const percent = Math.round((progressEvent.loaded * 100) / total);
                setProgress(percent);
            },
        });

        setFiles([]);
    } catch (error) {
        console.error('Upload error:', error);
    } finally {
        setUploading(false);
        setProgress(0);
    }
}

export function handleFileInput(
    e: React.ChangeEvent<HTMLInputElement>,
    setFiles: React.Dispatch<React.SetStateAction<File[]>>
) {
    if (!e.target.files) return;
    const selectedFiles = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...selectedFiles]);
}

export function handleRemove(
    index: number,
    setFiles: React.Dispatch<React.SetStateAction<File[]>>,
    files: File[]
) {
    setFiles(files.filter((_, i) => i !== index));
}

export function handleDragLeave(setIsDragging: React.Dispatch<React.SetStateAction<boolean>>) {
    setIsDragging(false)
}

export function handleDragOver(
    e: React.DragEvent<HTMLDivElement>,
    setIsDragging: React.Dispatch<React.SetStateAction<boolean>>
) {
    e.preventDefault()
    setIsDragging(true)
}

export function handleDrop(
    e: React.DragEvent<HTMLDivElement>,
    setFiles: React.Dispatch<React.SetStateAction<File[]>>,
    setIsDragging: React.Dispatch<React.SetStateAction<boolean>>
) {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles((prev) => [...prev, ...droppedFiles]);
    setIsDragging(false);
}