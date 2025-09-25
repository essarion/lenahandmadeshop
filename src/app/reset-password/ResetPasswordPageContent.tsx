"use client";

import { RequestPasswordResetForm } from "@/features/CreateNewPassword";
import styles from "@/app/reset-password/requestResetPassword.module.scss";


export const ResetPasswordPageContent: React.FC = () => {
    return (
        <main
            className={styles.create_new_password}
        >
            <h1
                className={styles.heading}
            >
                Восстановление пароля
            </h1>
            <RequestPasswordResetForm />
        </main>
    );
}
