'use client'
import { setAuthState } from "@/lib/slice/userSlice"
import { useAppSelector } from "@/lib/store"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { ArrowRightIcon, Bars3Icon, CheckCircleIcon, ChevronRightIcon, ExclamationTriangleIcon, TableCellsIcon } from "@heroicons/react/24/solid"
import { setLoadingState, setMedia } from "@/lib/slice/statesSlice"
import { useMedia } from "../hooks/useMedia"
import { useFolder } from "../hooks/useFolder"
import { motion, AnimatePresence } from 'framer-motion';
import { AllFiles } from "@/types/mediaTypes"
import Card from "../components/shared/Card"

export default function Dashboard() {

    const token = useAppSelector((state) => state.auth.authToken);
    const media = useAppSelector(state => state.states.media);
    const folders = useAppSelector(state => state.states.folders)
    const { getImages, getAllFiles } = useMedia()
    const { createFolder, getFolder } = useFolder()

    const [images, setImages] = useState<string[]>([])
    // folders
    const [name, setName] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [is_locked, setIsLocked] = useState<boolean>(false)
    const [toastMessage, setToastMessage] = useState<string>('')
    const [errorMessage, setErrorMessage] = useState<string>('')
    const [error, setError] = useState<string>('')
    const [check, setCheck] = useState<boolean>(false)
    const [check1, setCheck1] = useState<boolean>(false)
    const [show, setShow] = useState<boolean>(false)
    const [count, setCount] = useState<number>(3)
    const [data, setData] = useState<AllFiles[]>([])

    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!token) {
            setCheck(!check)
            const createInterval = setInterval(() => {
                setCount(prevCount => prevCount - 1)
            }, 1000)
            return () => clearInterval(createInterval)
        }
        dispatch(setMedia([]))
    }, [])

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                setError('')
            }, 3000)

            return () => clearTimeout(timer)
        }
    }, [error])

    useEffect(() => {
        getAllFiles("manan2@gmail.com", setError, setData)
    }, [])

    if (count === 0) {
        router.push('/signup')
    }


    function addImage(name: string) {
        if (images.includes(name)) {
            setImages(prevImages => prevImages.filter(x => x !== name))
        } else {
            setImages([...images, name])
        }
    }

    function handleLogout() {
        dispatch(setAuthState(''))
        router.push('/signup')
    }

    return (
        <>
            
        </>
    )
}