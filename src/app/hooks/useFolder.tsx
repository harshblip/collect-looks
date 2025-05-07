import { setLoadingState } from "@/lib/slice/statesSlice";
import { useAppSelector } from "@/lib/store";
import axios from "axios"
import { useState } from "react";
import { useDispatch } from "react-redux"

export const useFolder = () => {
    const dispatch = useDispatch();
    const token = useAppSelector(state => state.auth.authToken)

    async function createFolder(name: string, description: string, is_locked: boolean) {
        try {
            const response = await axios.post('http://localhost:4000/upload/createFolder', {
                name, description, is_locked
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (response.status === 201) {
                console.log("folder created")
            } else {
                console.log("error in creating folder: ", response)
            }

        } catch (err) {
            console.log(err)
        }
    }

    return { createFolder }
}