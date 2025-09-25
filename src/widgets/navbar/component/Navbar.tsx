'use client';

import { LinkNavbar } from "@/shared/ui/LinkNavbar/LinkNavbar";
import { LogoutButton } from "@/features/Logout/ui/LogoutButton";
import { useNavbar } from "../model/useNavbar";
import Image from 'next/image';
import logo from "@/shared/assets/Black_and_White_Minimalist_Candle_Product_Label_20231018_160103.svg";
import styles from '@/widgets/navbar/navbar.module.scss';

export const Navbar = ({ }) => {

    const { user, isLoading, isAuthenticated } = useNavbar();

    return (
        <header
            className={styles.navbar}
            role="banner"
            aria-label="Главное меню сайта"
        >
            <div
                className={styles.contentDirection}
            >
                <LinkNavbar
                    href="/"
                    aria-label="Перейти на главную страницу"
                >
                    <Image
                        src={logo}
                        width={40}
                        height={40}
                        alt="logo"
                        className={styles.logo}
                        priority={true}
                    />
                </LinkNavbar>


                <LinkNavbar
                    href="/"
                    className={styles.contentDirectionLinks}
                >
                    Главная
                </LinkNavbar>

                <LinkNavbar
                    href="/category/candles"
                    className={styles.contentDirectionLinks}
                >
                    Свечи
                </LinkNavbar>

                <LinkNavbar
                    href="/category/plaster-products"
                    className={styles.contentDirectionLinks}
                >
                    Декор
                </LinkNavbar>
            </div>

            <div
                className={styles.lcDirection}
                aria-live="polite"
                aria-atomic="true"
            >
                {isLoading ? (
                    <>Загрузка...</>
                ) :
                    isAuthenticated ? (
                        <>
                            <span
                                className={styles.lcDirectionUser}
                                arya-label={`Здравствуйте, ${user?.username}`}
                            >
                                Здравствуйте, {user?.username}
                            </span>
                            <LinkNavbar
                                href="/cart"
                                className={styles.lcDirectionLinks}
                                ariaLabel="Перейти в корзину"
                            >
                                Корзина
                            </LinkNavbar>

                            <LogoutButton
                                className={styles.lcDirectionLinks}
                                arya-label="Выйти из аккаунта"
                            />
                        </>
                    )
                        : (
                            <>
                                <LinkNavbar
                                    href="/register"
                                    className={styles.lcDirectionLinks}
                                    ariaLabel="Перейти к регистрации"
                                >
                                    Регистрация
                                </LinkNavbar>
                                <LinkNavbar
                                    href="/login"
                                    className={styles.lcDirectionLinks}
                                    ariaLabel="Перейти к форме входа"
                                >
                                    Вход
                                </LinkNavbar>
                            </>
                        )
                }
            </div>
        </header>
    )
};