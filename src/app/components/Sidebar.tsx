export default function Sidebar() {
    return (
        <>
            <div className=" flex flex-col justify-start space-y-4">
                <button className="mt-16 flex justify-center items-center p-2 w-28 bg-white rounded-md font-product text-primary shadow-md space-x-2 hover:cursor-pointer">
                    <p className="text-2xl"> + </p>
                    <p className="text-xl mt-1"> New </p>
                </button>
            </div>
        </>
    )
}