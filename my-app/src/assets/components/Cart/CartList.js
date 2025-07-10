import react from "react";
import CartItem from "./CartItem";
import classNames from "classnames";

const CartList = ({ items, increment, decrement, deleteItem }) => {
    return (
        <section className={classNames('cart-list')}>
            {items.length === 0 ? (
                <p
                    className={classNames('cart-list__text-block')}
                >Корзина пока пуста</p>
            ) : (
                items.map((item) => (
                    <CartItem key={item.id} item={item} increment={increment} decrement={decrement} deleteItem={deleteItem} />
                ))
            )}

        </section>
    )
};

export default CartList;