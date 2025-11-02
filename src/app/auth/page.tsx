'use client'

import { useEffect, useState } from "react"
import AuthForm from "@/app/components/auth/AuthForm";
import { useAppSelector } from "@/lib/store";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import SmallLogo from "../components/ui/SmallLogo";
import ForgotModal from "../components/auth/ForgotModal";
import { useLoginUser, useSignupUser } from "../hooks/useUser";
import Status from "../components/shared/Status";
import { motion } from 'framer-motion'
import { jwtDecode } from 'jwt-decode'
import { setEUID } from "@/lib/slice/userSlice";

export default function Auth() {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('')
    const [username, setUsername] = useState<string>('')
    const [visible, setVisible] = useState<boolean>(false)
    const [checked, setChecked] = useState<boolean>(false)
    const [show, setShow] = useState<boolean>(true)
    const euid = useAppSelector(state => state.user.EUID)

    const { mutate: loginUser, isSuccess, error, data } = useLoginUser()
    const { mutate: signupUser } = useSignupUser()
    const router = useRouter()
    const dispatch = useDispatch()

    // console.log(data)

    useEffect(() => {
        if (isSuccess) {

            const accessKey = data.access_token
            const decoded: any = jwtDecode(accessKey)
            console.log(accessKey, decoded)

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
    }, [isSuccess])
    
    const mode = useAppSelector(state => state.utility.mode) || 'Create an account'

    return (
        <>
            {
                isSuccess ? <Status type="SUCCESS" message={`Welcome`} /> : error ? <Status type="ERROR" message={error?.response.data.message} /> : ''
            }
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
                    {
                        !isSuccess ? <>
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
                        </> : <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.1, ease: 'easeInOut' }}
                            className="font-product mt-12 text-4xl text-secondary"> Hey {euid.username} 👋</motion.p>
                    }
                </div>

            </div>
        </>
    )
}