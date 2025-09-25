"use client";

import React from "react";
import { CartWidget } from "@/widgets/cart";
import { OrderForm } from "@/features/OrderForm";
import { useGetCartQuery } from "@/shared/api/Cart/api/cart.api";
import type { CartType } from "@/shared/api/Cart/types/cartApi.types";
import styles from "./cart.module.scss";

export const CartPageContent: React.FC = () => {
    const { data: cartData, isFetching } = useGetCartQuery(undefined, {
        refetchOnMountOrArgChange: false,
        refetchOnFocus: false,
        refetchOnReconnect: false,
    });

    const [cart, setCart] = React.useState<CartType>({
        id: 0,
        items: [],
        total_price: "0",
    });

    React.useEffect(() => {
        if (cartData) setCart(cartData);
    }, [cartData]);


    return (
        <main className={styles.cartPage}>
            <h1 className={styles.heading}>Корзина</h1>
            <CartWidget {...cart} />
            {isFetching && <p>Обновляем корзину...</p>}
            <h2 className={styles.orderHeading}>Оформление заказа</h2>
            <OrderForm />
        </main>
    );
};
