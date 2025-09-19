'use client'

import { useEffect, useState } from "react"
import AuthForm from "@/app/components/auth/AuthForm";
import { useAppSelector } from "@/lib/store";
import { Signin, Signup } from "../utils/auth";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import SmallLogo from "../components/ui/SmallLogo";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import { motion, AnimatePresence } from 'framer-motion';
import ForgotModal from "../components/auth/ForgotModal";
import { useLoginUser, useSignupUser } from "../hooks/useUser";

export default function Auth() {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('')
    const [username, setUsername] = useState<string>('')
    const [error, setError] = useState<any>()
    const [visible, setVisible] = useState<boolean>(false)
    const [checked, setChecked] = useState<boolean>(false)

    const { refetch } = useLoginUser(email, password, checked)
    const { mutate: signupUser } = useSignupUser()
    const router = useRouter()
    const dispatch = useDispatch()

    console.log(checked)

    const mode = useAppSelector(state => state.states.mode) || 'Create an account'

    return (
        <>
            <div className="primary md:mt-0 mt-24 lg:items-center justify-center items-center flex flex-col h-screen">
                {
                    visible && <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center" >
                        <ForgotModal
                            setVisible={setVisible}
                        />
                    </div>
                }
                <div className="md:p-32 flex flex-col items-center p-24">
                    <SmallLogo />
                    <p className={`font-glook text-primary text-3xl mt-8`}>{mode}</p>
                    {
                        error && <motion.div
                            key="error-container"
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            transition={{ duration: 0.2 }}
                            className="bg-red-200 text-red-500 w-[20rem] rounded-md mt-8"
                        >
                            <div className="p-4 flex justify-center items-center space-x-4 ">
                                <ExclamationTriangleIcon
                                    className="w-8"
                                />
                                <p className={`text-md font-glook`}> {error || `nothing`} </p>
                            </div>
                        </motion.div>
                    }
                    {
                        mode === 'Create an account' ? <div className="fade-in">
                            <AuthForm
                                mode={mode}
                                email={email}
                                password={password}
                                setEmail={setEmail}
                                setPassword={setPassword}
                                username={username}
                                setUsername={setUsername}
                                visible={visible}
                                setVisible={setVisible}
                                setChecked={setChecked}
                                submit={() => signupUser({ username: username, email: email, password: password })}
                            />
                        </div> : <div className="fade-in">
                            <AuthForm
                                mode={mode}
                                email={email}
                                password={password}
                                setEmail={setEmail}
                                setPassword={setPassword}
                                username={username}
                                setUsername={setUsername}
                                visible={visible}
                                setVisible={setVisible}
                                setChecked={setChecked}
                                submit={() => refetch()}
                            />
                        </div>
                    }
                </div>

            </div>
        </>
    )
}