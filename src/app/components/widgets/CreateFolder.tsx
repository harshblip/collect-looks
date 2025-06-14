'use client'

import { useState } from "react"
import Checkbox from "./Checkbox"

export default function CreateFolder() {

    const [name, setName] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [locked, setLocked] = useState<boolean>(false)

    return (
        <>
            <div className="absolute bg-black/20 top-0 bottom-0 w-full flex justify-center items-center -ml-12 font-product">
                <div className="bg-white h-[60%] w-1/3 rounded-lg flex flex-col justify-center items-center text-primary">
                    <p className="text-2xl mt-12"> Create a new folder </p>
                    <div className="flex flex-col space-y-2 mt-10">
                        <p className="text-secondary text-sm"> folder's name </p>
                        <input
                            type="text"
                            name="name"
                            className="w-[24rem] border-2 border-gray-400 p-2 outline-none rounded-lg"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col space-y-2 mt-4">
                        <p className="text-secondary text-sm"> about </p>
                        <input
                            type="text"
                            name="description"
                            className="w-[24rem] border-2 border-gray-400 p-2 outline-none rounded-lg"
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center space-x-2">
                        <p className="text-secondary text-md"> locked ? </p>
                        <Checkbox 
                            setChecked={setLocked}
                        />
                    </div>
                    <div className="flex justify-around w-full items-center mt-14">
                        <button className="text-primary rounded-md w-[10rem] border-2 border-gray-200 p-3 hover">
                            cancel
                        </button>
                        <button className=" rounded-md w-[10rem] border-none bg-gray-600 text-white p-3 hover">
                            create
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}