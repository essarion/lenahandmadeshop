'use client';

import React from "react";
import type { CartType } from "@/shared/api/Cart/types/cartApi.types";
import styles from "./cartWidget.module.scss";
import { useCartActions } from "@/widgets/cart/model/useCartActions";
import { CartList } from "@/entities/cart";

export const CartWidgetElement: React.FC<CartType> = ({ items, total_price }) => {
    const {
        isClearing,
        handleClearCart,
        handleDecrement,
        handleIncrement,
        handleRemove,
    } = useCartActions();

    return (
        <section className={styles.cartWidget}>
            <CartList
                items={items}
                decrementItem={handleDecrement}
                incrementItem={handleIncrement}
                removeItem={handleRemove}
            />
            <div className={styles.totalPriceSection}>
                <h2 aria-label="Итоговая цена" aria-live="polite">
                    Итоговая цена: {total_price}
                </h2>
            </div>
            <button
                type="button"
                onClick={handleClearCart}
                disabled={isClearing}
                className={styles.cartButton}
                aria-busy={isClearing}
                aria-label="Кнопка очистки корзины"
            >
                {isClearing ? "Очищаем корзину..." : "Очистить корзину"}
            </button>
        </section>
    );
};

export const CartWidget = React.memo(CartWidgetElement);