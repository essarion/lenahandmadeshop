'use client'

import { ResetPassword } from "@/features/CreateNewPassword";

export const ConfirmResetPasswordContent = () => {
    return (
        <main>
            <h1>Введите новый пароль</h1>
            <ResetPassword />
        </main>
    );
};