import React, { useState } from "react"
import { ForgotPassword } from "../../utils/auth"

function ForgotModal({ setVisible }: {
    setVisible: React.Dispatch<React.SetStateAction<boolean>>
}) {
    const [email, setEmail] = useState<string>('')
    return (
        <>
            <div className="primary-bg relative z-50 flex flex-col p-8 space-y-4 rounded-md w-[32rem] mx-auto">
                <p className={`font-gochi text-2xl text-primary`}>
                    Enter your mail id
                </p>
                <p className={`font-gochi text-md text-secondary -mt-4`}>
                    enter your registered email. where you will receive an email for password reset
                </p>
                <div className="flex space-x-4 mt-4">
                    <input
                        type="email"
                        className={`bg-white text-md p-2 border-none outline-none transition-all focus:shadow-md font-gochi rounded-md flex-1`}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button
                        className={`font-gochi hover bg-[#495057] text-white p-2 rounded-md w-24 active:scale-95 transition-transform duration-150 ease-in-out`}
                        onClick={() => ForgotPassword(email)}
                    >
                        Submit
                    </button>
                </div>
                <div className="flex flex-col mt-4">
                    <p className={`font-gochi text-primary text-xl`}> Steps to reset your password </p>
                    <div className={`font-gochi mt-2 text-secondary text-md flex flex-col space-y-1`}>
                        <p> 1. receive a link on your registered email id </p>
                        <p> 2. follow that link to new page to reset password </p>
                        <p> 3. enter new password. done. </p>
                    </div>
                </div>
                <button
                    className="absolute top-2 right-2 text-3xl text-primary hover:text-black hover:scale-110 transition-transform p-2 "
                    onClick={() => setVisible(false)}
                >
                    ×
                </button>
            </div>
        </>
    )
}

export default React.memo(ForgotModal)