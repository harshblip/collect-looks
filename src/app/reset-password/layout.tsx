import { ReactNode } from "react"

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