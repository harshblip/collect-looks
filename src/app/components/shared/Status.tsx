'use client'
import { CheckBadgeIcon, ExclamationCircleIcon, InformationCircleIcon } from "@heroicons/react/24/outline"
import { useEffect, useState } from "react"

export default function Status({ type, message }: {
    type: 'INFO' | 'ERROR' | 'SUCCESS',
    message: string
}) {

    const [show, setShow] = useState<boolean>(true)

    useEffect(() => {
        const timeout = setTimeout(() => {
            setShow(false)
        }, 2000);
        setShow(true)
        return () => clearTimeout(timeout);
    }, [])

    return (
        <>
            {
                show && <div className={`z-10 w-32 font-product max-w-xl absolute bottom-10 right-10 rounded-md
                    ${type === 'INFO' && `bg-blue-100 text-blue-400`} 
                    ${type === 'ERROR' && `bg-red-100 text-red-500`} 
                    ${type === 'SUCCESS' && `bg-green-100 text-green-400`}
                    flex justify-center items-center
                `}>
                    <div className="flex space-x-2 p-2 mx-2">
                        {
                            type === 'SUCCESS' ? <CheckBadgeIcon className="w-6" /> :
                                type === 'INFO' ? <InformationCircleIcon className="w-6" /> :
                                    <ExclamationCircleIcon className="w-6" />
                        }
                        <p>{message}</p>
                    </div>
                </div>
            }
        </>
    )
}