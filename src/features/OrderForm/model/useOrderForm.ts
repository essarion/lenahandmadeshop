import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSubmitCartMutation } from "@/shared/api/Cart/api/cart.api";
import { showSuccessToast, showErrorToast } from "@/shared/lib/toast";
import { cartSubmitSchema, cartSubmitSchemaType } from "./validation";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { SerializedError } from "@reduxjs/toolkit";


export const useOrderForm = () => {
    const [submitCart, { isLoading }] = useSubmitCartMutation();

    const methods = useForm<cartSubmitSchemaType>({
        resolver: yupResolver(cartSubmitSchema),
        mode: "onChange"
    });

    const onSubmit: SubmitHandler<cartSubmitSchemaType> = async (data) => {
        try {
            await submitCart(data).unwrap();
            showSuccessToast("Заказ успешно отправлен!");
        } catch (error: unknown) {
            const err = error as FetchBaseQueryError | SerializedError;

            const message =
                'data' in err && typeof err.data === 'object' && err.data !== null && 'error' in err.data
                    ? (err.data as { error: string }).error
                    : 'Ошибка, попробуйте позже или свяжитесь с нами';

            showErrorToast(message);
        }
    };

    return {
        ...methods,
        onSubmit,
        isLoading
    };
};