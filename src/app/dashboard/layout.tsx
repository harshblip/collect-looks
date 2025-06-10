import { ReactNode } from "react"
import Navbar from "../components/Navbar"

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <>
            <div className="flex flex-col primary-bg ">
                <Navbar />
                <div className="rounded-md bg-white">
                    {children}
                </div>
            </div>
        </>
    )
}