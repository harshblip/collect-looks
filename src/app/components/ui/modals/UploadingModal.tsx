import { Progress } from "@/components/ui/progress"
import { motion } from "framer-motion"

export default function UploadingModal({ progress }: {
    progress: number
}) {
    return (
        <>
            <motion.div
                key="uploading"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="border-2 border-dashed w-[32rem] p-6 h-32 rounded-lg flex flex-col items-center justify-center text-center cursor-pointer transition-colors duration-300 bg-white"
            >
                <p className="text-md text-primary font-medium mb-2">uploading...</p>
                <Progress value={progress} className="h-4 rounded-full" />
                <p className="text-sm mt-2">{progress}%</p>
            </motion.div>
        </>
    )
}