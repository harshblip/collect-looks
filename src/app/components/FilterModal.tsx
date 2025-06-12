interface PropType {
    show: boolean,
    setShow: React.Dispatch<React.SetStateAction<boolean>>
}

export default function FilterModal({ show, setShow }: PropType) {
    return (
        <>
            <div
                className="font-product absolute bg-black/20 flex justify-center items-center w-full top-0 bottom-0 -ml-8"
                onClick={() => setShow(false)}
            >
                <div className="bg-white flex flex-col rounded-lg w-[26rem] p-4">
                    <p className="flex justify-center text-2xl mt-2"> Filter </p>
                    <div className="flex flex-col space-y-4 p-4 mt-4 text-md">
                        <div className="text-primary flex justify-between">
                            <p> Filter by type </p>
                        </div>
                        <div className="text-primary flex justify-between">
                            <p> Item name </p>
                        </div>
                        <div className="text-primary flex justify-between">
                            <p> Owner </p>
                        </div>
                        <div className="text-primary flex justify-between">
                            <p> Date range </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}