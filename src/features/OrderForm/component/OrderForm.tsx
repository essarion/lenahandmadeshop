'use client';

import { Input } from "@/shared/ui/Input/Input";
import { useOrderForm } from "../model/useOrderForm";
import styles from "@/features/OrderForm/component/orderForm.module.scss";

export const OrderForm: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        onSubmit,
        isLoading
    } = useOrderForm();

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className={styles.orderForm}
        >
            <div className={styles.formSection}>
                <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    label="Телефон"
                    required
                    register={register}
                    placeholder="Ваш телефон"
                    errorMessage={errors.phone?.message}
                    aria-label="Поле для телефона"
                />

                <Input
                    id="email"
                    name="email"
                    type="email"
                    label="Введите email"
                    register={register}
                    placeholder="Введите email"
                    errorMessage={errors.email?.message}
                    aria-label="Поле для email"
                    required
                />
            </div>

            <button
                type="submit"
                disabled={isLoading || !isValid}
                aria-busy={isLoading}
                className={styles.button}
            >
                {isLoading ? "Отправляем..." : "Отправить заказ"}
            </button>
        </form>
    );
};