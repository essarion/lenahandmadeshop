import React from "react";
import { CartItemType } from "@/shared/api/Cart/types/cartApi.types";
import { CartItem } from "@/entities/cart/cartItem/CartItem";
import styles from "./cartList.module.scss";

interface CartListProps {
    items: CartItemType[];
    removeItem: (itemId: number) => void;
    incrementItem: (itemId: number, quantity: number) => void;
    decrementItem: (itemId: number, quantity: number) => void;
}

const CartListElement: React.FC<CartListProps> = ({
    items,
    removeItem,
    incrementItem,
    decrementItem,
}) => {


    return (
        <section className={styles.cartList}>
            {items.map((item) => (
                <CartItem
                    key={item.id}
                    item={item}
                    removeItem={removeItem}
                    incrementItem={incrementItem}
                    decrementItem={decrementItem}
                />
            ))}
        </section>
    );
};

export const CartList = React.memo(CartListElement);
