import React from 'react';
import { twMerge } from 'tailwind-merge';

type Props = {
    label: string;
    icon: React.ReactNode;
    onClick?: () => void;
    className?: string;
};

const SidebarButton: React.FC<Props> = ({ label, icon, onClick, className }) => (
    <button
        onClick={onClick}
        className={twMerge(
            "flex items-center w-[14rem] space-x-1 px-4 hover:cursor-pointer hover:bg-gray-200 transition-all rounded-lg",
            className
        )}
    >
        <div className="w-10 h-10 text-primary p-2">{icon}</div>
        <p className="font-product font-medium text-primary">{label}</p>
    </button>
);

export default SidebarButton;
