import { ReactNode } from "react"
import Navbar from "../components/layout/Navbar"
import Sidebar from "../components/layout/Sidebar"

export const metadata = {
    title: 'reset ☢ password',
    description: 'your whole profile in one place'
}

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <>
            <div>
                {children}
            </div>
        </>
    )
}