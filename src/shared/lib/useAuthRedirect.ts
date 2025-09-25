'use client';

import { useRouter } from "next/navigation";
import { tokenStorage } from "@/shared/lib/tokenStorage";

export const useAuthRedirect = (handleModalClose: () => void) => {
    const router = useRouter();

    function withAuth<Args extends unknown[], Return>(
        callback: (...args: Args) => Return | Promise<Return>
    ): (...args: Args) => Promise<Return | void> {
        return async (...args: Args) => {
            const token = tokenStorage.getAccessToken();

            if (!token) {
                handleModalClose();
                router.push("/login");
                return;
            }

            return await callback(...args);
        };
    }

    return { withAuth };
};