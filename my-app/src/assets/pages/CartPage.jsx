import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import getCartThunk from "../store/api/thunks/getCartThunk";
import CartList from "../components/Cart/CartList";
import CartButtons from "../components/Cart/CartButtons";
import clearCartThunk from "../store/api/thunks/clearCartThunk";
import incrementItemThunk from "../store/api/thunks/incrementItemThunk";
import decrementItemThunk from "../store/api/thunks/decrementItemThunk";
import OrderForm from "./OrderForm";
import classNames from "classnames";
import removeItemThunk from "../store/api/thunks/removeItemThunk";
import Footer from "../components/Footer";
import useHomePage from "../../hooks/useHomePage"


const CartPage = () => {

    const { data } = useHomePage();

    const dispatch = useDispatch();

    const { items, totalPrice, status, error } = useSelector((state) => state.itemsCart);

    useEffect(() => {
        dispatch(getCartThunk())
    },
        [dispatch]
    );

    const clearCart = () => dispatch(clearCartThunk());
    // const sendCart = dispatch();
    const increment = (item_id, quantity) => dispatch(incrementItemThunk({ item_id, quantity }));
    const decrement = (item_id, quantity) => dispatch(decrementItemThunk({ item_id, quantity }));
    const deleteItem = (item_id,) => dispatch(removeItemThunk({ item_id }))

    console.log(items)

    return (
        <section className={classNames('cart-page')}>
            <Navbar />
            {status === 'Загружаем данные' && <p
                className={classNames('cart-page__heading')}>Загружаем данные</p>}
            {error && <p>{error}</p>}
            <section
                className={classNames('cart-page__heading')}
            >
                <h1>Корзина</h1>
            </section>

            <CartList items={items} increment={increment} decrement={decrement} deleteItem={deleteItem} />

            <section
                className={classNames('cart-page__total-price-section')}
            >
                <h2>Итоговая цена: ${totalPrice} р.</h2>
            </section>

            <CartButtons onClear={clearCart} />
            <h2
                className={classNames('cart-page__order-form-headin')}
            >Форма оформления заказа</h2>
            <OrderForm />

            <Footer data={data} />
        </section>
    )
}

export default CartPage;