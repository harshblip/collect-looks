
export default function Status({ type, message }: {
    type: 'INFO' | 'ERROR' | 'SUCCESS',
    message: string
}) {
    return (
        <>
            <div className={`font-product absolute bottom-20 right-40 rounded-md p-2
                ${type === 'INFO' && `bg-white border border-blue-300`} 
                ${type === 'ERROR' && `bg-red-400 text-white`} 
                ${type === 'SUCCESS' && `bg-emerald-300 text-white`}
                flex justify-center items-center
            `}>
                <div className="flex space-x-2">

                </div>
            </div>
        </>
    )
}