import * as yup from 'yup';


export const loginSchema = yup.object({
    username: yup.string().required('Введите логин'),
    password: yup.string().required('Введите пароль')
});

export type LoginSchemaType = yup.InferType<typeof loginSchema>;
