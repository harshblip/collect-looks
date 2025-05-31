import { Gochi_Hand } from "next/font/google"

const gochi = Gochi_Hand({
    weight: ['400'],
    subsets: ['latin']
})

export default function ForgotModal({ setVisible }: {
    setVisible: React.Dispatch<React.SetStateAction<boolean>>
}) {
    return (
        <>
            <div className="primary-bg relative z-50 flex flex-col p-4 space-y-4 rounded-md w-[90%] max-w-md mx-auto">
                <p className={`${gochi.className} text-lg text-primary`}>
                    Enter your mail id
                </p>
                <p className="text-sm text-secondary -mt-4"></p>
                <div className="flex space-x-4">
                    <input
                        type="email"
                        className="bg-white text-md p-2 border-none outline-none transition-all focus:shadow-md rounded-md flex-1"
                    />
                    <button
                        className={`${gochi.className} hover:cursor-pointer bg-[#495057] text-white p-2 rounded-md w-24`}
                    >
                        Submit
                    </button>
                </div>

                <button
                    className="absolute top-2 right-2 text-xl text-primary hover:text-black hover:scale-110 transition-transform"
                    onClick={() => setVisible(false)}
                >
                    ×
                </button>
            </div>
        </>
    )
}