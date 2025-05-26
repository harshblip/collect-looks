import { Gloock, Gochi_Hand } from "next/font/google"

const gochi_hand = Gochi_Hand({
    weight: ['400'],
    subsets: ['latin']
})

const glook = Gloock({
    weight: ['400'],
    subsets: ['cyrillic-ext']
})

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
                <label className={`${gochi_hand.className} text-xl font-medium`}>{label}</label>
                <input
                    type={type}
                    value={value}
                    onChange={onChange}
                    className={`h-10 w-[20rem] text-md p-2 border border-none bg-white border-none outline-none
    transition-all duration-300 ease-in-out
    focus:shadow-md mt-2 rounded-md ${glook.className}`}
                />
            </div>
        </>
    )
}