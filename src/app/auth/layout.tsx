import { ReactNode } from "react"
import { Gloock, Gochi_Hand } from "next/font/google"
import Logo from "../components/logo"

const glook = Gloock({
    weight: ['400'],
    subsets: ['cyrillic-ext']
})

const gochi_hand = Gochi_Hand({
    weight: ['400'],
    subsets: ['latin']
})

export default function AuthLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <div className="flex lg:flex-row flex-col">
                <div className="bg-[#353535] text-[#DEE2E6] md:h-screen md:rounded-r-3xl md:rounded-bl-none rounded-bl-[4rem] rounded-br-[4rem] md:rounded-br-3xl md:w-1/2">
                    <div className="md:p-32 p-20 flex flex-col">
                        <Logo />
                        <p className={`${glook.className} text-3xl mt-8`}>collect</p>
                        <p className={`${glook.className} text-5xl mt-16`}>Welcome to Collect</p>
                        <p className={`${glook.className} hidden md:flex text-[#999999] text-md mt-8`}>a  best-in-class app for your photo and video sharing and some more more random things you’d like</p>
                        <p className={`${glook.className} text-[#C4C2C2] hidden md:flex text-md mt-14`}>Mom says you should always go for the best</p>
                        <div className="bg-[#7A7A7A] rounded-md mr-44 mt-16 hidden md:flex">
                            <div className="p-4">
                                <p className={`${gochi_hand.className} text-lg`}>Meet your friends and family and share your precious memories or voice notes with them</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="primary-bg rounded-md h-screen md:w-1/2">
                    {children}
                </div>
            </div>
        </>
    )
}