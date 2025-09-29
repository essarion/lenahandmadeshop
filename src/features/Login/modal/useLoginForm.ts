"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useTakeUserLoginMutation } from "../modal/login.api";
import { loginSchema, LoginSchemaType } from "../modal/validation";
import { showErrorToast, showSuccessToast } from "@/shared/lib/toast";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { SerializedError } from "@reduxjs/toolkit";
import { useAppDispatch } from "@/shared/lib/useAppDispatch";
import { baseApi } from "@/shared/api/baseQuery";
import { tokenStorage } from "@/shared/lib/tokenStorage";

export const useLoginForm = () => {
    const [loginUser, { isLoading }] = useTakeUserLoginMutation();
    const [serverError, setServerError] = useState<string | null>(null);
    const router = useRouter();
    const dispatch = useAppDispatch();

    const form = useForm<LoginSchemaType>({
        resolver: yupResolver(loginSchema),
        mode: "onTouched",
    });

    const onSubmit: SubmitHandler<LoginSchemaType> = async (data) => {
        try {
            const result = await loginUser(data).unwrap();

            tokenStorage.setAccessToken(result.access);
            tokenStorage.setRefreshToken(result.refresh);

            dispatch(baseApi.util.invalidateTags(['User']));

            showSuccessToast("Успешный вход!");
            setServerError(null);

            router.push("/");
        } catch (error: unknown) {
            const err = error as FetchBaseQueryError | SerializedError;
            const message =
                'data' in err && typeof err.data === 'object' && err.data !== null && 'error' in err.data
                    ? (err.data as { error: string }).error
                    : "Ошибка входа";

            setServerError(message);
            showErrorToast(message);
        }
    };

    return {
        ...form,
        onSubmit,
        isLoading,
        serverError,
    };
};