import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDoNewPasswordMutation } from './newPasswordApi.api';
import { requestPasswordResetSchema, RequestPasswordResetSchemaType } from './validation';
import { showSuccessToast, showErrorToast } from '@/shared/lib/toast';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import type { SerializedError } from '@reduxjs/toolkit';

export const useRequestPasswordResetForm = () => {
    const [doNewPassword, { isLoading }] = useDoNewPasswordMutation();

    const methods = useForm<RequestPasswordResetSchemaType>({
        resolver: yupResolver(requestPasswordResetSchema),
        mode: 'onTouched',
    });

    const { reset } = methods;

    const onSubmit: SubmitHandler<RequestPasswordResetSchemaType> = async (data) => {
        try {
            await doNewPassword(data).unwrap();
            showSuccessToast('Письмо направлено на Ваш email');
            reset();
        } catch (error: unknown) {
            const err = error as FetchBaseQueryError | SerializedError;

            const message =
                'data' in err && typeof err.data === 'object' && err.data !== null && 'error' in err.data
                    ? (err.data as { error: string }).error
                    : 'Ошибка восстановления пароля';

            showErrorToast(message);
        }
    };

    return {
        ...methods,
        onSubmit,
        isLoading,
    };
};