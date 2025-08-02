'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Loader from '../ui/Loader'

export const RouteLoader = () => {
    const pathname = usePathname()
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        const timeout = setTimeout(() => setIsLoading(false), 500)
        return () => clearTimeout(timeout)
    }, [pathname])

    if (!isLoading) return null

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-white bg-opacity-70 z-50 flex items-center justify-center">
            <Loader />
        </div>
    )
}
