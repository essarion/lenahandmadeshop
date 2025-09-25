import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useRegisterUserMutation } from "./register.api";
import { registrationUserSchema, RegistrationUserSchemaType } from "./validation";
import { showSuccessToast, showErrorToast } from "@/shared/lib/toast";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { SerializedError } from "@reduxjs/toolkit";

export const useRegistrationForm = () => {
    const router = useRouter();
    const [registerUser, { isLoading }] = useRegisterUserMutation();

    const methods = useForm<RegistrationUserSchemaType>({
        resolver: yupResolver(registrationUserSchema),
        mode: "onTouched"
    });

    const onSubmit: SubmitHandler<RegistrationUserSchemaType> = async (data) => {
        try {
            await registerUser(data).unwrap();
            showSuccessToast("Вы успешно зарегистрированы");
            setTimeout(() => router.push("/"), 1500);
        } catch (error: unknown) {
            const err = error as FetchBaseQueryError | SerializedError;

            const message =
                'data' in err && typeof err.data === 'object' && err.data !== null && 'error' in err.data
                    ? (err.data as { error: string }).error
                    : "Ошибка, попробуйте позже";

            showErrorToast(message);
        }
    };

    return {
        ...methods,
        onSubmit,
        isLoading
    };
};