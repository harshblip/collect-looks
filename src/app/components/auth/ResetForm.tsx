import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid"
import React from "react"

function ResetForm({ setA, setB, setSee, see, submit }: {
    setA: React.Dispatch<React.SetStateAction<string>>,
    setB: React.Dispatch<React.SetStateAction<string>>,
    setSee: React.Dispatch<React.SetStateAction<boolean>>,
    see: boolean,
    submit: () => void
}) {
    return (
        <>
            <div className="flex flex-col space-y-8 mt-2">
                <div className="flex flex-col space-x-2">
                    <p className="font-glook text-lg text-primary "> Enter your new password </p>
                    <div className="flex space-x-4">
                        <input
                            type="text"
                            name="type password"
                            onChange={(e) => setA(e.target.value)}
                            className={`h-10 md:w-[20rem] text-md p-2 border border-none bg-white outline-none transition-all duration-300 ease-in-out focus:shadow-md mt-2 rounded-md font-glook`}
                        />
                        <button
                            onClick={() => setSee(!see)}
                            className="hover:cursor-pointer mt-1 w-12 h-12 hover:bg-gray-200 rounded-md flex justify-center active:scale-75"
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
                </div>
                <div className="flex flex-col space-x-2">
                    <p className="font-glook text-lg text-primary "> re-enter that password </p>
                    <div className="flex space-x-4">
                        <input
                            type="text"
                            name="re-enter password"
                            onChange={(e) => setB(e.target.value)}
                            className={`h-10 md:w-[20rem] text-md p-2 border border-none bg-white outline-none transition-all duration-300 ease-in-out focus:shadow-md mt-2 rounded-md font-glook`}
                        />
                        <button
                            onClick={() => setSee(!see)}
                            className="hover:cursor-pointer mt-1 w-12 h-12 hover:bg-gray-200 rounded-md flex justify-center active:scale-75"
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
                </div>
                <button
                    onClick={submit}
                    className={` hover:cursor-pointer font-glook bg-[#495057] text-white p-2 rounded-md w-[24rem] mt-2`}
                >
                    change password
                </button>
            </div>
        </>
    )
}

export default React.memo(ResetForm)