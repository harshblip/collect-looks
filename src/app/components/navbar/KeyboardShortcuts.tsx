import { AnimatePresence, motion } from "framer-motion";

export default function KeyboardShortcuts() {
    return (
        <>
            <AnimatePresence>
                <motion.div
                    className="fixed inset-0 flex justify-end backdrop-blur-sm z-50 
        transition-opacity duration-500 mt-24 ease-in-out"
                >
                    <motion.div
                        className="bg-white flex flex-col space-x-4 rounded-md h-[32rem] w-[22rem] shadow-md transform transition-transform duration-500">
                        <div className="p-4 flex flex-col space-y-2">
                            <p className="text-xl text-secondary"> Keyboard Shortcuts </p>
                            <p className="text-xs text-gray-400"> accessible keyboard shortcuts for ease of navigation </p>
                        </div>
                        <div className="flex flex-col space-y-2 p-4">
                            <div className="flex justify-between items-center">
                                <p className="text-secondary"> Go to Home </p>
                                <div className="flex space-x-2 items-center text-sm">
                                    <code className="p-2 text-secondary border border-gray-400 rounded-md"> ctrl </code>
                                    <p className="text-secondary">+</p>
                                    <code className="p-2 text-secondary border border-gray-400 rounded-md"> . </code>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </AnimatePresence>
        </>
    )
}