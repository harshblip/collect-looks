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

export default function Auth() {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('')
    const [username, setUsername] = useState<string>('')
    const [visible, setVisible] = useState<boolean>(false)
    const [show, setShow] = useState<boolean>(false)
    const [checked, setChecked] = useState<boolean>(false)

    const { refetch, isFetched, data, error } = useLoginUser(email, password, checked)
    const { mutate: signupUser } = useSignupUser()
    const router = useRouter()
    const dispatch = useDispatch()

    console.log(data)

    useEffect(() => {
        setShow(false)
        // router.push('/dashboard')
    }, [isFetched])

    const mode = useAppSelector(state => state.states.mode) || 'Create an account'

    return (
        <>
            {
                isFetched ? <Status type="SUCCESS" message={`Welcome ${data}`} /> : <Status type="ERROR" message={error?.response.data.message} />
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
                    <p className={`font-glook text-primary text-3xl mt-8`}>{mode}</p>
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