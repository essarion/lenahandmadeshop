import React from "react";
import useCategoriesPage from "../../hooks/useCategoriesPages";
import { useParams } from "react-router-dom";
import classNames from "classnames";
import { useContext } from "react";
import { ModalContext } from "../components/Modal/ModalProvider";
import ProductModal from "../components/ProductModal";
import Navbar from "../components/Navbar";


function PlasterProducts() {
    const { slug } = useParams();
    const { dataCategory, loading, error } = useCategoriesPage(slug);
    const { modalOpen } = useContext(ModalContext);


    if (loading) return <p>Загрузка...</p>;
    if (error || !dataCategory) return <p>Ошибка загрузки: {error.message || `Нет данных`} </p>
    return (
        <div className={classNames('plaster-products')}>
            <Navbar />
            <section className={classNames('plaster-products__heading')}>
                <h1>Декор</h1>
            </section>

            <section className={classNames('plaster-products__catalog')}>
                {dataCategory.services?.map((service) => {
                    return (
                        <div key={service.id}
                            className={classNames('plaster-products__catalog__card')}
                            onClick={() => modalOpen(<ProductModal slug={service.slug} />)}
                        >
                            <img src={`http://localhost:8000${service.image}`} alt={service.name} />
                            <div className={classNames('plaster-products__catalog__card__text-content')}>
                                <p>{service.name}</p>
                                <p>`Цера: {service.prive}`</p>
                            </div>
                        </div>)
                })}
            </section>
            <section className={classNames('plaster-products__advantages')}>
                <h2>Преимущества</h2>
                <div className={classNames('plaster-products__advantages__elements-field')}>
                    {dataCategory.advantages?.map((advantage, index) => {
                        return (<div key={index}
                            className={classNames('plaster-products__advantages__elements-field__element')}>
                            <img src={`http://localhost:8000${advantage.icon}`} alt={advantage.title} />
                            <h3>{advantage.title}</h3>
                            <p>{advantage.description}</p>
                        </div>)
                    })}
                </div>

            </section>

            <section className={classNames('plaster-products__delivery')}>
                <h2>{dataCategory.delivery?.title}</h2>
                <p>{dataCategory.delivery?.text}</p>
            </section>

            <section className={classNames('plaster-products__contacts')}>
                <h2 className={classNames('plaster-products__contacts__haeding')}>{dataCategory.contacts?.title}</h2>
                <div className={classNames('plaster-products__contacts__text-info')}>
                    <p>{dataCategory.contacts?.phone}</p>
                    <p>{dataCategory.contacts?.email}</p>
                    <p>{dataCategory.contacts?.address}</p>
                </div>
            </section>

        </div>
    )
}

export default PlasterProducts