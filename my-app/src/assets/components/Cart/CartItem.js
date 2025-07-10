import classNames from "classnames";
import react from "react";


const CartItem = ({ item, increment, decrement, deleteItem }) => {

    console.log(item)
    return (
        <section
            id={item.id}
            className={classNames('cart-item')}
        >
            <div className={classNames('cart-item__image-block')}>
                <img src={`http://localhost:8000${item.service.image}`} alt={item.name} />

            </div>
            <div className={classNames('cart-item__text-block')}>
                <h3>{item.service.name}</h3>
                <p>Цена: {item.service.price}р.</p>
                <p>Количество: {item.quantity}</p>
            </div>

            <div className={classNames('cart-item__buttons-block')}>
                <button
                    onClick={() => increment(item.id, item.quantity)}
                    className={classNames('cart-item__buttons-block__button')}
                >Увеличить</button>
                <button
                    onClick={() => decrement(item.id, item.quantity)}
                    className={classNames('cart-item__buttons-block__button')}
                >Уменьшить</button>
                <button
                    onClick={() => deleteItem(item.id)}
                    className={classNames('cart-item__buttons-block__big-button')}
                >Убрать товар</button>
            </div>
        </section>
    )
};

export default CartItem;