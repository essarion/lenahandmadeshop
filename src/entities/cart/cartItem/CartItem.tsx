import React from "react";
import { CartItemType } from "@/shared/api/Cart/types/cartApi.types";
import { PictureSetElement } from "@/shared/ui/PictureSetElement/PictureSetElement";
import styles from "./cartItem.module.scss";

interface CartItemProps {
    item: CartItemType;
    removeItem: (itemId: number) => void;
    incrementItem: (itemId: number, quantity: number) => void;
    decrementItem: (itemId: number, quantity: number) => void;
}

const CartItemElement: React.FC<CartItemProps> = ({
    item,
    decrementItem,
    incrementItem,
    removeItem,
}) => {
    const handleIncrement = React.useCallback(() => {
        incrementItem(item.id, item.quantity + 1);
    }, [incrementItem, item.id, item.quantity]);

    const handleDecrement = React.useCallback(() => {
        decrementItem(item.id, item.quantity - 1);
    }, [decrementItem, item.id, item.quantity]);

    const handleRemove = React.useCallback(() => {
        removeItem(item.id);
    }, [removeItem, item.id]);

    return (
        <section className={styles.cartItem} id={`${item.id}`}>
            <div className={styles.imageBlock}>
                <PictureSetElement
                    alt={item.service.name}
                    imageSrc={item.service.image ?? undefined}
                    avif={item.service.avif_image ?? undefined}
                    webp={item.service.webp_image ?? undefined}
                    decoding="async"
                    loading="lazy"
                    width={250}
                    height={175}
                />
            </div>

            <div className={styles.textBlock}>
                <h3>{item.service.name}</h3>
                <p>Цена: {item.service.price}</p>
                <p>Количество: {item.quantity}</p>
            </div>

            <div className={styles.buttonsBlock}>
                <button
                    onClick={handleIncrement}
                    aria-label={`Увеличить количество товара ${item.service.name}`}
                    className={styles.button}
                >
                    Увеличить
                </button>

                <button
                    onClick={handleDecrement}
                    aria-label={`Уменьшить количество товара ${item.service.name}`}
                    className={styles.button}
                >
                    Уменьшить
                </button>

                <button
                    onClick={handleRemove}
                    className={styles.bigButton}
                    aria-label={`Удалить товар ${item.service.name} из корзины`}
                >
                    убрать товар
                </button>
            </div>
        </section>
    );
};

export const CartItem = React.memo(CartItemElement);
