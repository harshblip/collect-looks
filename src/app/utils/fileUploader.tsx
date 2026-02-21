
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