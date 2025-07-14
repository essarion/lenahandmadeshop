import classNames from "classnames";
import useFetchForCard from "../../hooks/useFetchForCard";
import React from "react";
import { useDispatch } from "react-redux";
import addItemThunk from "../store/api/thunks/addItemThunk"
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";


const ProductModal = ({ slug }) => {

    const { dataCard, loadingCard, errorCard } = useFetchForCard(slug);
    const dispatch = useDispatch();
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const isAuthenticated = !!user;


    const addItemInCart = (service_id, quantity) => {
        if (!isAuthenticated) {
            navigate('/login', { state: { from: location.pathname } });
            
        } else {
            dispatch(addItemThunk({ service_id, quantity }));
        }
    };



    if (loadingCard) return <p className={classNames('modal__modal-space__loading-form')}>Загрузка товара...</p>;
    if (errorCard) return <p>Не получилось загрузить товар: {errorCard.message}</p>;
    return (
        <div className={classNames('modal__modal-space__content-product')}>
            <div className={classNames('modal__modal-space__content-product__img-content')}>
                {dataCard.image && (
                    <img
                        src={`http://localhost:8000${dataCard.image}`}
                        alt={dataCard.name}
                    />
                )}
            </div>
            <div className={classNames('modal__modal-space__content-product__text-content')}>
                <h2>{dataCard.name}</h2>
                <p>Информация о товаре: {dataCard.description}</p>
                <p>Стоимость: {dataCard.price}р.</p>
                <button onClick={() => (addItemInCart(dataCard.id, 1))}>Добавить в корзину</button>
            </div>
        </div>

    )
}

export default ProductModal