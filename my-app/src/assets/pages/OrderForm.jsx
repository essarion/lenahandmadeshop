import React from "react";
import { useDispatch } from "react-redux";
import cartSubmitThunk from "../store/api/thunks/cartSubmitThunk";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import classNames from "classnames";

const cartSubmitSchema = yup.object({
    phone: yup.string().required("Введите номер телефона").min(6, "Минимум 6 цифр").max(20, "Максимум 20 цифр"),
    email: yup.string().email("Неверный формат e-mail").max(40, "Максимум 40 символов")
});

const OrderForm = () => {
    const dispatch = useDispatch();

    const { register, handleSubmit, formState: { errors, isValid } } = useForm({ resolver: yupResolver(cartSubmitSchema), mode: "onBlur" });

    const onSubmit = (data) => {
        dispatch(cartSubmitThunk(data));
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className={classNames('order-form')}
        >
            <div
                className={classNames('order-form__form-section')}
            >
                <label htmlFor="phone">Телефон</label>
                <input
                    id="phone"
                    type="tel"
                    {...register("phone")}
                    placeholder="Ваш телефон" />
                {errors.phone && <p>{errors.phone.message}</p>}

                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    type="email"
                    {...register("email")}
                    placeholder="Ваш email" />
                {errors.email && <p>{errors.email.message}</p>}
            </div>



            <button
                type="submit"
                disabled={!isValid}
                className={classNames('order-form__button')}
            >
                Отправить заказ
            </button>
        </form>
    );
};

export default OrderForm;
