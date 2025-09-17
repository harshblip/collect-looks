
export default function Status({ type }: {
    type: 'INFO' | 'ERROR' | 'SUCCESS'
}) {
    return (
        <>
            <div className={`absolute bottom-20 right-40 rounded-md p-2
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