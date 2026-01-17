import PasswordStrengthBar from "react-password-strength-bar";
import AuthInput from "./AuthInput";
import React, { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { setMode } from "@/lib/slice/generalSlice";
import { useDispatch } from "react-redux";
import Checkbox from "../ui/primitives/Checkbox";
import { motion, AnimatePresence } from 'framer-motion';

type AuthForm = {
    email: string,
    setEmail: React.Dispatch<React.SetStateAction<string>>
    password: string,
    setPassword: React.Dispatch<React.SetStateAction<string>>,
    username: string,
    setUsername: React.Dispatch<React.SetStateAction<string>>,
    mode: string,
    visible: boolean,
    setVisible: React.Dispatch<React.SetStateAction<boolean>>,
    setChecked: React.Dispatch<React.SetStateAction<boolean>>,
    submit: () => void,
}

function AuthForm({
    email,
    password,
    setEmail,
    setPassword,
    username,
    setUsername,
    visible,
    setVisible,
    mode,
    setChecked,
    submit
}: AuthForm) {

    const [see, setSee] = useState<boolean>(false)
    const dispatch = useDispatch()

    return (
        <>
            <AnimatePresence mode='wait'>
                <motion.div
                    className="primary-bg flex justify-center items-center mt-10 flex-col space-y-8"
                >
                    {
                        mode === 'Create an account' && username !== undefined && (
                            <motion.div
                                key="username-input"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                            className="mt-3"
                            >
                            <div/>
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
                    <div className="flex ml-14 space-x-2 md:space-x-4">
                        <AuthInput
                            label="Password"
                            type={`${see ? `text` : `password`}`}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            onClick={() => setSee(!see)}
                            className="hover mt-8 w-12 h-12 hover:bg-gray-200 rounded-md flex justify-center active:scale-75"
                        >
                            {
                                see ? <EyeIcon
                                    className="hover w-6"
                                    onClick={() => setSee(!see)}
                                /> : <EyeSlashIcon
                                    className="hover w-6"
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
                        mode === 'Sign in' && <div className="text-sm flex -ml-52  space-x-4 -mt-6">
                            <a
                                className={`font-glook text-secondary mb-2 hover`}
                                onClick={() => setVisible(true)}
                            > Forgot password ? </a>
                        </div>
                    }
                    {
                        mode === 'Sign in' && <div className="flex -ml-44 items-center space-x-4 -mt-6">
                            <Checkbox 
                                setChecked={setChecked}
                            />
                            <p className={`font-glook text-primary`}> Remember me </p>
                        </div>
                    }
                    <button
                        onClick={submit}
                        className={` hover font-glook bg-[#495057] text-white p-2 rounded-md w-[20rem] mt-4`}
                    >
                        {mode}
                    </button>
                    {
                        mode === 'Sign in' ?
                            <p
                                className={`font-glook text-sm text-secondary -mt-6`}>
                                Don't have an account?
                                <a
                                    onClick={() => dispatch(setMode('Create an account'))}>
                                    <span
                                        className="text-primary hover">
                                        Sign up
                                    </span>
                                </a></p> :
                            <p
                                className={`font-glook text-sm text-secondary -mt-6`}>
                                Already have an account?
                                <a
                                    onClick={() => dispatch(setMode('Sign in'))}>
                                    <span
                                        className="text-primary hover">Sign in
                                    </span>
                                </a></p>
                    }
                </motion.div >
            </AnimatePresence>
        </>
    )
}

export default React.memo(AuthForm)