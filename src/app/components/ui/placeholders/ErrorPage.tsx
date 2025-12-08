export default function ErrorPage() {
    return (
        <>
            <div className="flex justify-center z-1 mt-[15%]">
                <div className="font-product text-xl w-1/2 h-[12rem] rounded-md p-4 flex flex-col space-y-2 items-center justify-between">
                    <div className="flex items-center space-x-6 mt-10">
                        <p className={`text-red-200 text-3xl -mt-1`}> error </p>
                        <div>
                            <p className={`text-gray-200 text-8xl font-medium`}> 401 </p>
                        </div>
                    </div>
                    <div>
                        <p className={`text-gray-200 text-lg mt-4`}> GET OUT !! </p>
                    </div>
                </div>
            </div>
        </>
    )
}