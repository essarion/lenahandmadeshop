import * as yup from 'yup';


export const cartSubmitSchema = yup.object({
    phone: yup.string().required("Введите номер телефона").min(6, "Минимум 6 цифр").max(20, "Максимум 20 цифр"),
    email: yup.string().email("Неверный формат e-mail").max(40, "Максимум 40 символов").required("Введите вашу контактную почту")
});

export type cartSubmitSchemaType = yup.InferType<typeof cartSubmitSchema>;
