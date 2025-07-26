// components/MenuItem.tsx
import React from 'react'
import { cn } from '@/lib/utils'

interface MenuItemProps {
    icon: React.ReactNode
    label: string
    onClick?: () => void
    className?: string
}

export default function MenuItem({ icon, label, onClick, className }: MenuItemProps) {
    return (
        <div
            className={cn(
                'flex flex-col space-y-2 items-center hover hover:bg-gray-100 rounded-md p-2 active:scale-95',
                className
            )}
            onClick={onClick}
        >
            <div className="w-6 text-secondary">{icon}</div>
            <p>{label}</p>
        </div>
    )
}
