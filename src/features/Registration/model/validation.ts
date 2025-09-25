import * as yup from 'yup';

export const registrationUserSchema = yup.object({
    username: yup.string().required(`Введите имя пользователя`).min(3, `Длинна имени не может быть менее 3 символов`).max(20, `Длинна имени не более 20 символов`),
    email: yup.string().required(`Введите Ваш e-mail`).matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, `Недопустимый формат e-mail`).max(40, `Длинна почты превышает допустимую`),
    password: yup.string().required(`Заполните пароль`).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/, `Пароль должен содержать минимум 8 символов, включая одну строчные и одну заглавную буквы, и цифры`),
    confirmPassword: yup.string().required(`Подтвердите пароль`).oneOf([yup.ref('password')], `Пароли не совпадают`)
})

export type RegistrationUserSchemaType = yup.InferType<typeof registrationUserSchema>;
