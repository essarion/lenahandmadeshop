import React from "react";
import {
    useIncrementCartItemMutation,
    useClearCartMutation,
    useRemoveCartItemMutation,
    useDecrementCartItemMutation,
} from "@/shared/api/Cart/api/cart.api";
import { showErrorToast, showSuccessToast } from "@/shared/lib/toast";

export const useCartActions = () => {
    const [clearCart, { isLoading: isClearing }] = useClearCartMutation();

    const handleClearCart = React.useCallback(async () => {
        try {
            await clearCart().unwrap();
            showSuccessToast("Корзина успешно очищена");
        } catch {
            showErrorToast("Ошибка при очистке корзины");
        }
    }, [clearCart]);

    const [decrementCartItem] = useDecrementCartItemMutation();
    const handleDecrement = React.useCallback(
        (itemId: number, quantity: number) => {
            if (quantity <= 1) return;
            decrementCartItem({ item_id: itemId, quantity: quantity - 1 }).unwrap().catch(() => {
                showErrorToast("Ошибка при уменьшении количества товара");
            });
        },
        [decrementCartItem]
    );

    const [incrementCartItem] = useIncrementCartItemMutation();
    const handleIncrement = React.useCallback(
        (itemId: number, quantity: number) => {
            incrementCartItem({ item_id: itemId, quantity: quantity + 1 }).unwrap().catch(() => {
                showErrorToast("Ошибка при увеличении количества товара");
            });
        },
        [incrementCartItem]
    );

    const [removeCartItem] = useRemoveCartItemMutation();
    const handleRemove = React.useCallback(
        (itemId: number) => {
            removeCartItem({ item_id: itemId }).unwrap()
                .then(() => showSuccessToast("Товар удалён из корзины"))
                .catch(() => showErrorToast("Ошибка при удалении товара"));
        },
        [removeCartItem]
    );

    return {
        isClearing,
        handleClearCart,
        handleDecrement,
        handleIncrement,
        handleRemove,
    };
};