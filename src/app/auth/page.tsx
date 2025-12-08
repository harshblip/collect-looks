'use client'

import { useEffect, useState } from "react"
import AuthForm from "@/app/components/auth/AuthForm";
import { useAppSelector } from "@/lib/store";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import SmallLogo from "../components/ui/primitives/SmallLogo";
import ForgotModal from "../components/auth/ForgotModal";
import { useLoginUser, useSignupUser } from "../hooks/useUser";
import Status from "../components/shared/Status";
import { motion } from 'framer-motion'
import { jwtDecode } from 'jwt-decode'
import { setEUID } from "@/lib/slice/userSlice";
import { setMode } from "@/lib/slice/generalSlice";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";

export default function Auth() {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('')
    const [username, setUsername] = useState<string>('')
    const [visible, setVisible] = useState<boolean>(false)
    const [checked, setChecked] = useState<boolean>(false)
    const [show, setShow] = useState<boolean>(true)
    const euid = useAppSelector(state => state.user.EUID)

    const {
        mutate: loginUser,
        isSuccess: loginStatus,
        error: loginError,
        data,
    } = useLoginUser()
    const {
        mutate: signupUser,
        error: signupError,
        isSuccess: signupStatus
    } = useSignupUser()
    const router = useRouter()
    const dispatch = useDispatch()
    const successStatus = signupStatus || loginStatus
    const errorStatus = loginError || signupError

    const message = signupStatus ? "Account created" : "Welcome"

    useEffect(() => {
        if (loginStatus) {
            console.log(data)

            const accessKey = data
            const decoded: any = jwtDecode(accessKey)
            console.log(accessKey, decoded)

            localStorage.setItem("access_token", accessKey)

            dispatch(setEUID({
                email: decoded.email,
                username: decoded.username,
                userId: decoded.id,
                authToken: accessKey
            }))

            const timeout = setTimeout(() => {
                router.push('/dashboard')
            }, 2000)

            return () => clearTimeout(timeout)
        }
        if (signupStatus) {
            const timeout = setTimeout(() => {
                router.refresh()
                dispatch(setMode('Sign in'))
            }, 2000)

            return () => clearTimeout(timeout)
        }
    }, [successStatus])

    const mode = useAppSelector(state => state.utility.mode) || 'Create an account'

    return (
        <>
            {
                successStatus ? <Status type="SUCCESS" message={message} /> : errorStatus ? <Status type="ERROR" message={errorStatus?.response.data.message} /> : ''
            }
            <div className="font-product primary md:mt-0 mt-24 lg:items-center justify-center items-center flex flex-col h-screen">
                {
                    visible && <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center" >
                        <ForgotModal
                            setVisible={setVisible}
                        />
                    </div>
                }
                <div className="md:p-32 flex flex-col items-center p-24">
                    <SmallLogo />
                    {
                        loginStatus ? <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.1, ease: 'easeInOut' }}
                            className="font-product mt-12 text-4xl text-secondary"> Hey {euid.username} 👋</motion.p> : signupStatus ? <>
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.1, ease: 'easeInOut' }}
                                    className="text-gray-500 flex flex-col space-y-2 rounded-md p-4 max-w-2xl mt-8 border border-gray-400"
                                >
                                    <code>
                                        {'{'}
                                    </code>
                                    <div className="ml-6 flex flex-col space-y-2">
                                        <code>
                                            "username" : {username}
                                        </code>
                                        <code>
                                            "email": {email}
                                        </code>
                                        <code>
                                            "password": "kpvaG4gRG9lIiwiYWRtW4iOnRydWU"
                                        </code>
                                    </div>
                                    <code>
                                        {'}'}
                                    </code>
                                </motion.div>
                                <div className="mt-4 flex justify-center text-secondary">
                                    <p>please <button 
                                    onClick={() => window.location.reload()}
                                    className="hover:shadow-md border border-gray-400 rounded-md p-2 items-center ml-2 mr-2 hover"> <code className="flex items-center gap-2"> login <span><PaperAirplaneIcon width={20}/></span> </code> </button> with your email to get inside</p>
                                </div>
                            </> : <>
                            <p className={`font-glook text-primary text-3xl mt-8`}>{mode}</p> {mode === 'Create an account' ? <div className="fade-in">
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
                                    submit={() => loginUser({ email: email, password: password, checked: checked })}
                                />
                            </div>
                            }
                        </>
                    }
                </div>

            </div>
        </>
    )
}