export default function ColumnHeaders() {
    return (
        <>
            <div className="grid grid-cols-3 gap-4 px-4 py-2 border-b border-gray-200 mt-8">
                <p className="text-gray-500 font-semibold">Name</p>
                <div className="flex justify-end mr-22">
                    <p className="text-gray-500 font-semibold">Date</p>
                </div>
                <div className="flex space-x-4 justify-end">
                    <p className="text-gray-500 font-semibold">Size</p>
                </div>
            </div>
        </>
    )
}