import PasswordStrengthBar from "react-password-strength-bar";
import AuthInput from "./AuthInput";
import React, { useState } from "react";

type AuthForm = {
    email: string,
    setEmail: React.Dispatch<React.SetStateAction<string>>
    password: string,
    setPassword: React.Dispatch<React.SetStateAction<string>>,
    username: string,
    setUsername: React.Dispatch<React.SetStateAction<string>>,
    type: string,
    submit: () => void,
}

function AuthForm({
    email,
    password,
    setEmail,
    setPassword,
    username,
    setUsername,
    type,
    submit
}: AuthForm) {
    const [see, setSee] = useState(false)

    return (
        <>
            <div className="bg-[#EFEFEF] h-full flex justify-start mt-14 flex-col space-y-8">
                {
                    type === 'signup' && username !== undefined && (
                        <AuthInput
                            label="Username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    )
                }
                <AuthInput
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <div className="flex space-x-2 md:space-x-8">
                    <AuthInput
                        label="Password"
                        type={`${see ? `text` : `password`}`}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        onClick={() => setSee(!see)}
                        className="hover:cursor-pointer mt-8"
                    >👁</button>
                </div>
                <div className="w-1/2">
                    <PasswordStrengthBar
                        password={password}
                    />
                </div>
                <button
                    onClick={submit}
                    className="hover:cursor-pointer border border-gray-500 p-2 rounded-md w-[10rem]"
                >
                    submit
                </button>
            </div>
        </>
    )
}

export default React.memo(AuthForm)