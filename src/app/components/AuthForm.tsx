import PasswordStrengthBar from "react-password-strength-bar";
import AuthInput from "./AuthInput";
import React, { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { Gloock, Gochi_Hand } from "next/font/google";
import { setMode } from "@/lib/slice/statesSlice";
import { useDispatch } from "react-redux";
import Checkbox from "./Checkbox";
import { motion, AnimatePresence } from 'framer-motion';
import ForgotModal from "./ForgotModal";

const glook = Gloock({
    weight: ['400'],
    subsets: ['cyrillic-ext']
})

type AuthForm = {
    email: string,
    setEmail: React.Dispatch<React.SetStateAction<string>>
    password: string,
    setPassword: React.Dispatch<React.SetStateAction<string>>,
    username: string,
    setUsername: React.Dispatch<React.SetStateAction<string>>,
    mode: string,
    submit: () => void,
}

function AuthForm({
    email,
    password,
    setEmail,
    setPassword,
    username,
    setUsername,
    mode,
    submit
}: AuthForm) {

    const [see, setSee] = useState(false)
    const [visible, setVisible] = useState(false)
    const dispatch = useDispatch()

    return (
        <>
            {
                visible && <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-40" >
                    <ForgotModal
                        visible={visible}
                        setVisible={setVisible}
                    />
                </div>
            }
            <AnimatePresence mode='wait'>
                <motion.div
                    className="bg-[#EFEFEF] flex justify-start mt-10 flex-col space-y-8"
                >
                    {
                        mode === 'Create an account' && username !== undefined && (
                            <motion.div
                                key="username-input"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                            >
                                <AuthInput
                                    label="Username"
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </motion.div>
                        )
                    }
                    <AuthInput
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <div className="flex space-x-2 md:space-x-4">
                        <AuthInput
                            label="Password"
                            type={`${see ? `text` : `password`}`}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            onClick={() => setSee(!see)}
                            className="hover:cursor-pointer mt-8 w-12 h-12 hover:bg-gray-200 rounded-md flex justify-center active:scale-75 transition-transform duration-150 ease-in-out"
                        >
                            {
                                see ? <EyeIcon
                                    className="hover:cursor-pointer w-6"
                                    onClick={() => setSee(!see)}
                                /> : <EyeSlashIcon
                                    className="hover:cursor-pointer w-6"
                                    onClick={() => setSee(!see)}
                                />
                            }
                        </button>
                    </div>
                    <div className="w-[20rem] -mt-7">
                        <PasswordStrengthBar
                            password={password}
                            className="h-4 rounded-[6px]"
                        />
                    </div>
                    {
                        mode === 'Sign in' && <div className="text-sm flex items-center space-x-4 -mt-6">
                            <a
                                className={`${glook.className} text-[#6C757D] mb-2 hover:cursor-pointer`}
                                onClick={() => setVisible(true)}
                            > Forgot password ? </a>
                        </div>
                    }
                    {
                        mode === 'Sign in' && <div className="flex items-center space-x-4 -mt-6">
                            <Checkbox />
                            <p className={`${glook.className} text-[#495057]`}> Remember me </p>
                        </div>
                    }
                    <button
                        onClick={submit}
                        className={` hover:cursor-pointer ${glook.className} bg-[#495057] text-white p-2 rounded-md w-[20rem] -mt-4`}
                    >
                        {mode}
                    </button>
                    {
                        mode === 'Sign in' ?
                            <p
                                className={`${glook.className} text-sm text-[#6C757D] -mt-6`}>
                                Don't have an account?
                                <a
                                    onClick={() => dispatch(setMode('Create an account'))}>
                                    <span
                                        className="text-[#495057] hover:cursor-pointer">
                                        Sign up
                                    </span>
                                </a></p> :
                            <p
                                className={`${glook.className} text-sm text-[#6C757D] -mt-6`}>
                                Already have an account?
                                <a
                                    onClick={() => dispatch(setMode('Sign in'))}>
                                    <span
                                        className="text-[#495057] hover:cursor-pointer">Sign in
                                    </span>
                                </a></p>
                    }
                </motion.div >
            </AnimatePresence>
        </>
    )
}

export default React.memo(AuthForm)