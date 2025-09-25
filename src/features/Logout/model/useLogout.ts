"use client";

import { tokenStorage } from "@/shared/lib/tokenStorage";
import { useRouter } from "next/navigation";


export const useLogout = (): () => void => {

    const router = useRouter();

    const logout = () => {
        tokenStorage.clearTokens();
        router.push('/')
    };

    return logout
};