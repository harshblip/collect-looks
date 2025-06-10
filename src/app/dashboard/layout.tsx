import { ReactNode } from "react"
import Navbar from "../components/shared/Navbar"
import Sidebar from "../components/Sidebar"

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <>
            <div className="flex flex-col primary-bg ">
                <div className="flex flex-col p-8">
                    <Navbar />
                    <div className="flex">
                        <Sidebar />
                        <div className="rounded-3xl bg-white w-full ml-16 mt-8">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}