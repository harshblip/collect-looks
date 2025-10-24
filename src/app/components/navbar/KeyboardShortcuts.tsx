import { shortcuts } from "@/lib/utils";
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
                        initial={{ x: '100%', opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: '100%', opacity: 0 }}
                        transition={{ duration: 0.1, ease: 'easeInOut' }}
                        className="bg-white flex flex-col space-x-4 rounded-lg h-[38rem] w-[26rem] shadow-md transform transition-transform duration-500 p-6">
                        <div className="flex flex-col space-y-2">
                            <p className="text-xl text-secondary"> Keyboard Shortcuts </p>
                            <p className="text-xs text-gray-400"> accessible keyboard shortcuts for ease of navigation </p>
                        </div>
                        <div className="flex flex-col space-y-8 mt-8">
                            {
                                shortcuts.map((x, _) => <>
                                    <div className="flex justify-between items-center">
                                        <p className="text-secondary"> {x.action} </p>
                                        <div className="flex space-x-2 items-center text-sm">
                                            <code className="p-2 text-secondary border border-gray-400 rounded-md"> {x.modifier} </code>
                                            <p className="text-secondary">+</p>
                                            <code className="p-2 text-secondary border border-gray-400 rounded-md"> {x.key} </code>
                                        </div>
                                    </div>
                                </>
                                )
                            }
                        </div>
                        <div className="bg-gray-100 flex justify-center items-center text-secondary w-full h-[4rem] rounded-md mt-6">
                            <p><b>Ads</b> by Google</p>
                        </div>
                    </motion.div>
                </motion.div>
            </AnimatePresence>
        </>
    )
}