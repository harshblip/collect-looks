'use client'
import EmptyTrashPage from "@/app/components/ui/placeholders/EmptyTrashPage";
import { AnimatePresence, motion } from "framer-motion";

export default function Trash() {
    const data = []
    return (
        <>
            <div className="flex flex-col space-y-0 mt-4 p-8 font-product">
                <EmptyTrashPage />
            </div>
        </>
    )
}