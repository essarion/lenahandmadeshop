"use client";

import { RegistrationForm } from "../../features/Registration/component/RegistrationForm";
import styles from "@/app/register/register.module.scss";


export const RegisterPageContent: React.FC = () => {

    return (
        <main
            className={styles.registration}
        >
            <h1
                className={styles.registrationHeading}
            >
                Регистрация
            </h1>
            <RegistrationForm />
        </main>
    );
};