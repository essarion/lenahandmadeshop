"use client";

import { LoginForm } from "@/features/Login/component/LoginForm";
import { LinkNavbar } from "@/shared/ui/LinkNavbar/LinkNavbar";
import styles from "@/app/login/login.module.scss";


export const LoginPageContent: React.FC = () => {

    return (
        <main
            className={styles.loginForm}
        >
            <h1
                className={styles.heading}
            >
                Войти
            </h1>
            <LoginForm />


            <LinkNavbar
                href="/register"
                className={styles.wrapperLink}
            >
                Нет аккаунта? Зарегистрироваться
            </LinkNavbar>



            <LinkNavbar
                href="/password-reset"
                className={styles.wrapperLink}
            >
                Восстановить пароль
            </LinkNavbar>

        </main>
    )
};