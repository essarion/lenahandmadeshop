"use client";

import { CartWidget } from "@/widgets/cart";
import { OrderForm } from "@/features/OrderForm";
import { useGetCartQuery } from "@/shared/api/Cart/api/cart.api";
import styles from "./cart.module.scss";


export const CartPageContent: React.FC = () => {

    const { data: cart } = useGetCartQuery();


    if (!cart || cart.items.length === 0) {
        return <p className={styles.empty}>Корзина пуста</p>;
    }

    return (
        <main
            className={styles.cartPage}
        >
            <h1
                className={styles.heading}
            >
                Корзина
            </h1>
            <CartWidget {...cart} />


            <h2
                className={styles.orderHeading}
            >
                Оформление заказа
            </h2>

            <OrderForm />

        </main>
    )
};