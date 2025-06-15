'use client'

import { useEffect, useState } from "react"
import AuthForm from "@/app/components/auth/AuthForm";
import { useAppSelector } from "@/lib/store";
import { Signin, Signup } from "../utils/auth";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import SmallLogo from "../components/widgets/SmallLogo";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import { motion, AnimatePresence } from 'framer-motion';
import ForgotModal from "../components/auth/ForgotModal";

export default function Auth() {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('')
    const [username, setUsername] = useState<string>('')
    const [error, setError] = useState<any>()
    const [visible, setVisible] = useState<boolean>(false)
    const [checked, setChecked] = useState<boolean>(false)

    const router = useRouter()
    const dispatch = useDispatch()

    console.log(checked)

    const mode = useAppSelector(state => state.states.mode) || 'Create an account'

    return (
        <>
            <div className="primary-bg md:mt-0 mt-24 lg:items-start justify-center    items-center flex flex-col h-screen">
                {
                    visible && <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-center justify-center" >
                        <ForgotModal
                            setVisible={setVisible}
                        />
                    </div>
                }
                <div className="md:p-32 flex flex-col p-24">
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
                                submit={() => Signup(username, email, password, setError)}
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
                                submit={() => Signin(email, password, setError, router, dispatch, checked)}
                            />
                        </div>
                    }
                </div>

            </div>
        </>
    )
}