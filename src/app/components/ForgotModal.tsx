import { Gochi_Hand } from "next/font/google"

const gochi = Gochi_Hand({
    weight: ['400'],
    subsets: ['latin']
})

export default function ForgotModal({ visible, setVisible }: {
    visible: boolean,
    setVisible: React.Dispatch<React.SetStateAction<boolean>>
}) {
    return (
        <>
            <div className="bg-[#EFEFEF] relative z-50 flex flex-col p-4 space-y-4 rounded-md">
                <p className={`${gochi.className} text-lg text-[#495057]`}> Enter your mail id </p>
                <p className="text-sm text-[#6C757D] -mt-4"></p>
                <div className="flex space-x-4">
                    <input
                        type="email"
                        className="bg-white text-md p-2 border-none outline-none transition-all focus:shadow-md rounded-md"
                    />
                    <button className="hover:cursor-pointer ${glook.className} bg-[#495057] text-white p-2 rounded-md w-24">
                        submit
                    </button>
                </div>
            </div>
            <div>
                <a
                    className="absolute right-0 top-0 hover:cursor-pointer"
                    onClick={() => setVisible(false)}
                > x </a>
            </div>
        </>
    )
}