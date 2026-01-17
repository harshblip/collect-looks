



export default function DeleteAccount() {
    return (
        <>
            <div className="flex flex-col space-y-2 mt-12 mb-12">
                <p className={`font-pixel text-4xl ml-10`}> Account </p>
                <p className="text-secondary p-4 ml-5"> If you choose to delete your Collect account, all your data, settings,  and content <br /> will be permanently lost. This action cannot be undone </p>
                <button className="bg-red-400 p-2 text-white text-md w-44 hover shadow-md rounded-md ml-8">
                    delete account
                </button>
            </div>
        </>
    )
}