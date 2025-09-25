'use client';

import { Input } from "@/shared/ui/Input/Input";
import { useResetPasswordForm } from "../model/useResetPassword";

export const ResetPassword: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        onSubmit,
        isLoading
    } = useResetPasswordForm();

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
        >
            <Input
                id="password"
                name="password"
                type="password"
                label="Пароль"
                required
                placeholder="Введите пароль"
                register={register}
                errorMessage={errors.password?.message}
            />
            <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                label="Подтвердите пароль"
                required
                placeholder="Подтвердите пароль"
                register={register}
                errorMessage={errors.confirmPassword?.message}
            />

            <button
                type="submit"
                disabled={isLoading || isSubmitting}
                aria-busy={isLoading || isSubmitting}
            >
                {isLoading ? "Идёт смена пароля" : "Изменить пароль"}
            </button>
        </form>
    );
};