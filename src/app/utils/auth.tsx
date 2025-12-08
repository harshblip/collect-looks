import { resetEUID } from "@/lib/slice/userSlice";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

export function useLogout() {
    const dispatch = useDispatch()
    const router = useRouter()

    const logout = () => {
        dispatch(resetEUID())
        router.replace('/')
    }

    return logout
}