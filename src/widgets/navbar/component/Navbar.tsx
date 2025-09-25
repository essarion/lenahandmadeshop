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
        <section
            className={styles.navbar}
        >
            <div
                className={styles.contentDirection}
            >
                <Image
                    src={logo}
                    width={40}
                    height={40}
                    alt="logo"
                    className={styles.logo}
                    priority={true}
                />

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
            >
                {isLoading ? (
                    <>Загрузка...</>
                ) :
                    isAuthenticated ? (
                        <>
                            <span
                                className={styles.lcDirectionUser}
                            >
                                Здравствуйте, {user?.username}
                            </span>
                            <LinkNavbar
                                href="/cart"
                                className={styles.lcDirectionLinks}
                            >
                                Корзина
                            </LinkNavbar>

                            <LogoutButton
                                className={styles.lcDirectionLinks}
                            />
                        </>
                    )
                        : (
                            <>
                                <LinkNavbar
                                    href="/register"
                                    className={styles.lcDirectionLinks}
                                >
                                    Регистрация
                                </LinkNavbar>
                                <LinkNavbar
                                    href="/login"
                                    className={styles.lcDirectionLinks}
                                >
                                    Вход
                                </LinkNavbar>
                            </>
                        )
                }
            </div>
        </section>
    )
};