'use client';

import React from "react";
import { Input } from "@/shared/ui/Input/Input";
import styles from "@/features/CreateNewPassword/component/RequestPasswordResetForm.module.scss";
import { useRequestPasswordResetForm } from "../model/useRequestPasswordResetForm";

export const RequestPasswordResetForm: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        onSubmit,
        isLoading
    } = useRequestPasswordResetForm();

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className={styles.form}
        >
            <Input
                id="email"
                name="email"
                type="email"
                placeholder="Введите Ваш email"
                label="Email"
                register={register}
                errorMessage={errors.email?.message}
            />

            <button
                type="submit"
                disabled={isLoading || isSubmitting}
                aria-busy={isLoading || isSubmitting}
                className={styles.button}
            >
                {isLoading ? "Отправляем форму восстановления" : "Восстановить"}
            </button>
        </form>
    );
};