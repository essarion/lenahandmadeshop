import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useConfirmNewPasswordMutation } from './newPasswordApi.api';
import { resetPasswordSchema, ResetPasswordSchemaType } from './validation';
import { useParams, useRouter } from 'next/navigation';
import { showSuccessToast, showErrorToast } from '@/shared/lib/toast';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import type { SerializedError } from '@reduxjs/toolkit';

export const useResetPasswordForm = () => {
    const [confirmNewPassword, { isLoading }] = useConfirmNewPasswordMutation();
    const params = useParams();
    const uidb64 = params?.uidb64 as string;
    const token = params?.token as string;
    const router = useRouter();

    const methods = useForm<ResetPasswordSchemaType>({
        resolver: yupResolver(resetPasswordSchema),
        mode: "onTouched",
    });

    const onSubmit: SubmitHandler<ResetPasswordSchemaType> = async (data) => {
        if (!uidb64 || !token) {
            showErrorToast("Невозможно восстановить пароль. Свяжитесь с нами по почте");
            return;
        }

        try {
            await confirmNewPassword({
                uidb64,
                token,
                new_password: data.password,
            }).unwrap();

            showSuccessToast("Пароль успешно изменён!");
            router.push('/login');
        } catch (error: unknown) {
            const err = error as FetchBaseQueryError | SerializedError;
            const message =
                'data' in err && typeof err.data === 'object' && err.data !== null && 'error' in err.data
                    ? (err.data as { error: string }).error
                    : 'Ошибка, повторите позже';
            showErrorToast(message);
        }
    };

    return {
        ...methods,
        onSubmit,
        isLoading
    };
};