import { ReactNode } from "react"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <>
            <div className="flex flex-col primary-bg ">
                <div className="flex flex-col p-8">
                    <Navbar />
                    <Sidebar />
                </div>
                <div className="rounded-md bg-white">
                    {children}
                </div>
            </div>
        </>
    )
}