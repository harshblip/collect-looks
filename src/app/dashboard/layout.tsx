import { ReactNode } from "react"
import Navbar from "../components/layout/Navbar"
import Sidebar from "../components/layout/Sidebar"

export const metadata = {
    title: 'collect | dashboard',
    description: 'see all your options in a single place'
}

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <>
            <div className="flex flex-col primary-bg h-screen p-8">
                <div className="flex flex-col">
                    <Navbar />
                    <div className="flex">
                        <Sidebar />
                        <div className="rounded-3xl bg-white h-[38rem] overflow-auto w-full ml-16 mt-12">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}