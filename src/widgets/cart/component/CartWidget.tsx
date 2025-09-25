'use client'

import React from "react";
import type { CartType } from "@/shared/api/Cart/types/cartApi.types";
import styles from "./cartWidget.module.scss";
import { useCartActions } from "@/widgets/cart/model/useCartActions";
import { LazySection } from "@/shared/ui/LazySection/LazySection";


export const CartWidgetElement: React.FC<CartType> = ({ items, total_price }) => {
    const {
        isClearing,
        handleClearCart,
        handleDecrement,
        handleIncrement,
        handleRemove,
    } = useCartActions();

    if (items.length === 0) {
        return <p className={styles.emptyCart}>Корзина пуста</p>;
    }

    return (
        <section
            className={styles.cartWidget}
        >
            <LazySection load={() => import("@/entities/cart").then(mod => ({ default: mod.CartList }))} props={{
                items,
                decrementItem: handleDecrement,
                incrementItem: handleIncrement,
                removeItem: handleRemove,
            }} />

            <div
                className={styles.totalPriceSection}
            >
                <h2
                    aria-label="Итоговая цена"
                    aria-live="polite">
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