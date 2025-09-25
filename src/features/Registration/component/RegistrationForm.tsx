'use client';

import React from "react";
import { Input } from "@/shared/ui/Input/Input";
import { LinkNavbar } from "@/shared/ui/LinkNavbar/LinkNavbar";
import styles from "./registrationForm.module.scss";
import { useRegistrationForm } from "../model/useRegistrationForm";

export const RegistrationForm: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        onSubmit,
        isLoading
    } = useRegistrationForm();

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className={styles.registrationForm}
        >
            <Input
                id="username"
                name="username"
                type="text"
                label="Имя пользователя"
                required
                register={register}
                placeholder="Введите имя"
                errorMessage={errors.username?.message}
                aria-label='Поле для имени пользователя'
                className={styles.inputWrapper}
                labelClassName={styles.inputLabel}
                inputClassName={styles.inputElement}
                errorClassName={styles.inputError}
            />

            <Input
                id="email"
                name="email"
                type="email"
                label="Введите email"
                required
                register={register}
                placeholder="Введите email"
                errorMessage={errors.email?.message}
                aria-label="Поле для email"
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
                required
                register={register}
                placeholder="Введите пароль"
                errorMessage={errors.password?.message}
                aria-label="Поле для пароля"
                className={styles.inputWrapper}
                labelClassName={styles.inputLabel}
                inputClassName={styles.inputElement}
                errorClassName={styles.inputError}
            />

            <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                label="Подтвердите пароль"
                required
                register={register}
                placeholder="Подтвердите пароль"
                errorMessage={errors.confirmPassword?.message}
                aria-label="Поле для подтверждения пароля"
                className={styles.inputWrapper}
                labelClassName={styles.inputLabel}
                inputClassName={styles.inputElement}
                errorClassName={styles.inputError}
            />

            <LinkNavbar href="/login">
                Уже есть аккаунт? Войти
            </LinkNavbar>

            <button
                type="submit"
                disabled={!isValid || isLoading}
                aria-busy={isLoading}
                className={styles.button}
            >
                {isLoading ? "Выполняем регистрацию" : "Регистрация"}
            </button>
        </form>
    );
};
