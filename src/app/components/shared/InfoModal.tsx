import { AnimatePresence, motion } from "framer-motion";

export default function InfoModal() {
    return (
        <>
            <AnimatePresence>
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.1, ease: 'easeInOut' }}
                    className="absolute bg-black/20 top-0 bottom-0 w-full flex justify-center items-center -ml-12 font-product z-1"
                >
                    <div className="bg-white rounded-lg p-4">
                        
                    </div>
                </motion.div>
            </AnimatePresence>
        </>
    )
}