import { useState } from "react"

export default function Signup() {
    const [see, setSee] = useState(false);

    return (
        <>
            <div className="flex justify-center items-center mt-12 flex-col space-y-8">
                signup
                <input
                    type="text"
                    className="h-10 w-[20rem] text-md p-2 border border-gray-500 mt-4 rounded-md"
                />
                <input
                    type="text"
                    className="h-10 w-[20rem] text-md p-2 border border-gray-500 mt-4 rounded-md"
                />
                <input
                    type={`${see ? `text` : `password`}`}
                    className="h-10 w-[20rem] text-md p-2 border border-gray-500 rounded-md"
                />
                <button
                    className="hover:cursor-pointer"
                    onClick={() => setSee(!see)}
                >👁</button>
                <button
                    className="hover:cursor-pointer border border-gray-500 p-2 rounded-md w-[10rem]"
                >
                    submit
                </button>
            </div>
        </>
    )
}