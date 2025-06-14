import React from 'react';
import { twMerge } from 'tailwind-merge';

type Props = {
    label: string;
    icon: React.ReactNode;
    onClick?: () => void;
    className?: string;
};

const CardButton: React.FC<Props> = ({ label, icon, onClick, className }) => (
    <button
        onClick={onClick}
        className={twMerge(
            "hover hover:bg-gray-100 rounded-lg transition-all flex items-center space-x-1",
            className
        )}
    >
        <div className="w-10 h-10 text-primary p-2">{icon}</div>
        <p>{label}</p>
    </button>
);

export default CardButton;
