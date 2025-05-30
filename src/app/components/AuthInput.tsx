
export default function AuthInput({
    label,
    type = "text",
    value,
    onChange
}: {
    label: string,
    type: string,
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}) {
    return (
        <>
            <div className="flex flex-col">
                <label className={`font-gochi text-xl font-medium`}>{label}</label>
                <input
                    type={type}
                    value={value}
                    onChange={onChange}
                    className={`h-10 md:w-[20rem] text-md p-2 border border-none bg-white outline-none transition-all duration-300 ease-in-out focus:shadow-md mt-2 rounded-md font-glook`}
                />
            </div>
        </>
    )
}