import * as yup from 'yup';

export const requestPasswordResetSchema = yup.object({
    email: yup.string().email('Введите корректный email').required('Email обязателен'),
});

export const resetPasswordSchema = yup.object({
    password: yup
        .string()
        .required('Заполните пароль')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/,
            'Пароль должен содержать минимум 8 символов, включая одну строчную и одну заглавную буквы, и цифры'
        ),
    confirmPassword: yup
        .string()
        .required('Подтвердите пароль')
        .oneOf([yup.ref('password')], 'Пароли не совпадают'),
});

export type RequestPasswordResetSchemaType = yup.InferType<typeof requestPasswordResetSchema>;
export type ResetPasswordSchemaType = yup.InferType<typeof resetPasswordSchema>;
