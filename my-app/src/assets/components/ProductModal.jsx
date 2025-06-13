import classNames from "classnames";
import useFetchForCard from "../../hooks/useFetchForCard";
import React from "react";


const ProductModal = ({ slug }) => {

    const { dataCard, loadingCard, errorCard } = useFetchForCard(slug);

    console.log("dataCard", dataCard);


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
            </div>
        </div>

    )
}

export default ProductModal