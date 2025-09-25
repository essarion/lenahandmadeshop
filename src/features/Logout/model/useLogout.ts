import { tokenStorage } from "@/shared/lib/tokenStorage";
import { useRouter } from "next/router";


export const useLogout = (): () => void => {

    const router = useRouter();

    const logout = () => {
        tokenStorage.clearTokens();
        router.push('/')
    };

    return logout
};