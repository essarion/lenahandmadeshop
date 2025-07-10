import classNames from "classnames";
import React, { use, useCallback } from "react";


const CartButtons = ({ onClear, onSubmitCart }) => {



    return (
        <section>
            <button onClick={onClear}
                className={classNames('cart-buttons')}
            >Очистить корзину</button>
        </section>
    )
};

export default CartButtons;