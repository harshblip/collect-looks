import React, { useState } from "react"

function AuthInput({
    label,
    type = "text",
    value,
    onChange,
    onKeyDown,
    placeholder
}: {
    label: string,
    type: string,
    value: string,
    placeholder?: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
}) {
    return (
        <>
            <div className="flex flex-col">
                <label className={`font-product text-xl text-gray-500 font-medium`}>{label}</label>
                <input
                    type={type}
                    value={value}
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                    placeholder={placeholder}
                    className={`h-10 md:w-[20rem] text-md p-2 border border-none bg-white outline-none transition-all duration-300 ease-in-out focus:shadow-md mt-2 rounded-md font-product text-secondary placeholder:italics placeholder:font-medium`}
                />
            </div>
        </>
    )
}

export default React.memo(AuthInput)