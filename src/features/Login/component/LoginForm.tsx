'use client';

import React from "react";
import { Input } from "@/shared/ui/Input/Input";
import { useLoginForm } from "../modal/useLoginForm";
import styles from "./loginForm.module.scss";



export const LoginForm: React.FC = ({ }) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        onSubmit,
        isLoading,
        serverError
    } = useLoginForm();

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className={styles.form}
        >
            {serverError && <p className="error-message">{serverError}</p>}

            <Input
                id="username"
                name="username"
                type="text"
                label="Введите логин"
                autoComplete="username"
                required
                register={register}
                placeholder="Введите логин"
                errorMessage={errors.username?.message}
                className={styles.inputWrapper}
                labelClassName={styles.inputLabel}
                inputClassName={styles.inputElement}
                errorClassName={styles.inputError}
            />

            <Input
                id="password"
                name="password"
                type="password"
                label="Введите пароль"
                autoComplete="current-password"
                required
                register={register}
                placeholder="Введите пароль"
                errorMessage={errors.password?.message}
                className={styles.inputWrapper}
                labelClassName={styles.inputLabel}
                inputClassName={styles.inputElement}
                errorClassName={styles.inputError}
            />

            <button
                type="submit"
                disabled={!isValid || isLoading}
                aria-busy={isLoading}
                className={styles.button}
            >
                {isLoading ? 'Входим...' : 'Войти'}
            </button>
        </form>
    );
};